import express from "express";
import { query } from "./db";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:8081" }));

const PORT = 3000;

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello world");
});

app.get("/api/get-companies", async (req, res) => {
    res.send(await query("SELECT * FROM companies"));
});

app.get("/api/company-items/:companyId", async (req, res) => {
    const companyId = req.params.companyId;
    const items = await query(`
        SELECT product_id, company_items.name, price
        FROM company_items
        LEFT JOIN products
            ON products.id = company_items.product_id
        WHERE company_id = ${companyId};
    `);
    res.send(items);
});

app.get("/api/matching-items/:userId/:companyId", async (req, res) => {
    const companyId = req.params.companyId;
    const userId = req.params.userId;
    const items = await query(`
        SELECT name, company_items.price
        FROM company_items
        INNER JOIN shopping_items
            ON user_id = ${userId}
            AND shopping_items.product_id = company_items.product_id
            AND company_id = ${companyId};
    `);
    res.send(items);
});

app.post("/api/add-item/:userId/:productId", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const sellerCompanies = await query(`
        SELECT * FROM company_items WHERE product_id = ${productId};
    `);
    if (sellerCompanies.length == 0)
        res.json({ message: "The product is not sold by any companies." });
    else
        res.send(
            await query(
                `INSERT INTO shopping_items (user_id, product_id) VALUES (${userId}, ${productId})`,
            ),
        );
});

app.delete("/api/remove-item/:userId/:productId", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const result = await query(
        `DELETE FROM shopping_items WHERE user_id = ${userId} AND product_id = ${productId}`,
    );

    res.json(
        result.affectedRows > 0
            ? { message: "Item removed" }
            : { message: "Item not found" },
    );
});

// return the cheapest item for each shopping list item
app.get("/api/shopping-items/:userId", async (req, res) => {
    const userId = req.params.userId;
    const items = await query(`
        SELECT
            shopping_items.product_id,
            name as item,
            MIN(price) as price
        FROM shopping_items
        INNER JOIN company_items
            ON shopping_items.product_id = company_items.product_id
        WHERE user_id = ${userId}
        GROUP BY company_items.product_id;
    `);
    res.send(items);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
