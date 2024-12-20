import * as fs from "fs";

// TYPES

export class Product {
    name: string = "";
    price: number = 0;
}

export class Store {
    location: string = "";
    products: Array<Product> = [];
    productsByName: Map<string, Product> = new Map();
}

export class Company {
    name: string = "";
    stores: Array<Store> = [];
}

/**
 * Class to hold all shopping data read.
 */
export class ShoppingData {
    companies: Array<Company> = [];
    static readSample(): ShoppingData {
        return JSON.parse(fs.readFileSync("../sample_data/data.json", "utf8"));
    }
    
}
