import pool from "../config/db";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initDb = async () => {
    try {
        console.log("\u231B Initializing database...");
        
        const schemaPath = path.join(__dirname, "../sql/schema.sql");
        const schema = fs.readFileSync(schemaPath, "utf8");

        await pool.query(schema);
        
        console.log("\u2705 Database initialized successfully.");
    } catch (error) {
        console.error("\u274C Error initializing database:", error);
    } finally {
        await pool.end();
    }
};

initDb();
