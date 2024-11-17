import { Client } from "@elastic/elasticsearch";
import { setTimeout } from "timers/promises";
import * as dotenv from "dotenv";

dotenv.config();

// Define types for our product
interface Product {
    id?: string;
    title: string;
    description: string;
    price: number;
    category: string;
    created_at: string;
    tags: string[];
}

// Initialize the client
const client = new Client({
    node: "http://localhost:9200",
    auth: {
        username: "elastic",
        password: process.env.ELASTIC_SEARCH_PASSWORD!,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

// Elasticsearch operations class
class ElasticsearchService {
    private readonly indexName = "products";

    // Create index with mapping
    async createIndex() {
        try {
            const exists = await client.indices.exists({
                index: this.indexName,
            });

            if (exists) {
                console.log("Index already exists");
                return;
            }

            const response = await client.indices.create({
                index: this.indexName,
                mappings: {
                    properties: {
                        title: { type: "text" },
                        description: { type: "text" },
                        price: { type: "float" },
                        category: { type: "keyword" },
                        created_at: { type: "date" },
                        tags: { type: "keyword" },
                    },
                },
                settings: {
                    number_of_shards: 1,
                    number_of_replicas: 0,
                },
            });

            console.log("Index created:", response);
        } catch (error) {
            console.error("Error creating index:", error);
            throw error;
        }
    }

    // Index a single document
    async indexProduct(product: Product) {
        try {
            const response = await client.index({
                index: this.indexName,
                document: product,
                refresh: true, // Make the document immediately searchable
            });

            console.log("Document indexed:", response);
            return response;
        } catch (error) {
            console.error("Error indexing document:", error);
            throw error;
        }
    }

    // Bulk index multiple documents
    async bulkIndexProducts(products: Product[]) {
        const operations = products.flatMap(product => [
            { index: { _index: this.indexName } },
            product,
        ]);

        try {
            const response = await client.bulk({
                refresh: true,
                operations,
            });

            console.log("Bulk indexing completed:", response);
            return response;
        } catch (error) {
            console.error("Error bulk indexing:", error);
            throw error;
        }
    }

    // Search products with various query parameters
    async searchProducts({
        searchText,
        minPrice,
        maxPrice,
        category,
        tags,
    }: {
        searchText?: string;
        minPrice?: number;
        maxPrice?: number;
        category?: string;
        tags?: string[];
    }) {
        try {
            const must: any[] = [];
            const filter: any[] = [];

            if (searchText) {
                must.push({
                    multi_match: {
                        query: searchText,
                        fields: ["title", "description"],
                    },
                });
            }

            if (minPrice !== undefined || maxPrice !== undefined) {
                filter.push({
                    range: {
                        price: {
                            ...(minPrice !== undefined && { gte: minPrice }),
                            ...(maxPrice !== undefined && { lte: maxPrice }),
                        },
                    },
                });
            }

            if (category) {
                filter.push({ term: { category } });
            }

            if (tags && tags.length > 0) {
                filter.push({ terms: { tags } });
            }

            const response = await client.search({
                index: this.indexName,
                query: {
                    bool: {
                        must,
                        filter,
                    },
                },
                sort: [{ price: { order: "asc" } }],
            });

            return response.hits.hits;
        } catch (error) {
            console.error("Error searching products:", error);
            throw error;
        }
    }

    // Update a product
    async updateProduct(productId: string, updates: Partial<Product>) {
        try {
            const response = await client.update({
                index: this.indexName,
                id: productId,
                doc: updates,
                refresh: true,
            });

            console.log("Document updated:", response);
            return response;
        } catch (error) {
            console.error("Error updating document:", error);
            throw error;
        }
    }

    // Delete a product
    async deleteProduct(productId: string) {
        try {
            const response = await client.delete({
                index: this.indexName,
                id: productId,
                refresh: true,
            });

            console.log("Document deleted:", response);
            return response;
        } catch (error) {
            console.error("Error deleting document:", error);
            throw error;
        }
    }
}

// Example usage
async function main() {
    const esService = new ElasticsearchService();

    // Create index
    await esService.createIndex();

    // Index a single product
    const product: Product = {
        title: "Smartphone X",
        description: "Latest smartphone with amazing features",
        price: 999.99,
        category: "Electronics",
        created_at: new Date().toISOString(),
        tags: ["smartphone", "electronics", "5G"],
    };
    const indexedProduct = await esService.indexProduct(product);

    // Allow Elasticsearch to process the document
    await setTimeout(1000);

    // Bulk index multiple products
    const bulkProducts: Product[] = [
        {
            title: "Laptop Pro",
            description: "High-performance laptop",
            price: 1499.99,
            category: "Electronics",
            created_at: new Date().toISOString(),
            tags: ["laptop", "electronics", "professional"],
        },
        {
            title: "Wireless Earbuds",
            description: "Premium wireless earbuds",
            price: 199.99,
            category: "Electronics",
            created_at: new Date().toISOString(),
            tags: ["audio", "electronics", "wireless"],
        },
    ];
    await esService.bulkIndexProducts(bulkProducts);

    // Search examples
    const searchResults = await esService.searchProducts({
        searchText: "wireless",
        minPrice: 100,
        maxPrice: 300,
        category: "Electronics",
        tags: ["audio"],
    });
    console.log("Search results:", searchResults);

    // Update a product
    if (indexedProduct._id) {
        await esService.updateProduct(indexedProduct._id, {
            price: 899.99,
        });
    }

    // Delete a product
    if (indexedProduct._id) {
        await esService.deleteProduct(indexedProduct._id);
    }
}

main().catch(console.error);
