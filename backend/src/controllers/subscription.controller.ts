import type { Request, Response } from "express";
import pool from "../config/db";
import { request } from "https";

export const subscribeHandler = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        // Logic for subscription (DB query)
        const result = await pool.query('insert into subscribers (email) values ($1) returning *', [email]);

        res.status(201).json({ message: "Subscription successful" });
    } catch (error) {
        console.error("Error in subscribeHandler:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const unsubscribeHandler = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        pool.query('DELETE from subscribers where email =($1)', [email]);

        res.status(201).json({ message: "Succefully unsubscribed" });

    } catch (error) {
        console.error("Error in unsubscribeHandler:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}