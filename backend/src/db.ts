import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD!,
    database: "shopsmart",
    connectionLimit: 5,
});

export const query = async (query: string, params?: any[]) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
};
