import express from "express";
import { query } from "./db";

const app = express();
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

app.get("/api/matching-items/:companyId/:userId", async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
