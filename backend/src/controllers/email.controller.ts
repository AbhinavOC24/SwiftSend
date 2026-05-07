import type { Request, Response } from "express";
import { sendMessageToQueue } from "../services/queue.service";
import type { SendEmailRequest } from "../types";

export const sendEmailHandler = async (req: Request, res: Response) => {
    try {
        const { payload } = req.body as SendEmailRequest;

        if (!payload || !payload.sendTo) {
            return res.status(400).json({ error: "Invalid payload: sendTo is required" });
        }

        await sendMessageToQueue(JSON.stringify(payload));

        res.status(200).json({ message: "Email request successfully queued" });
    } catch (error) {
        console.error("Error in sendEmailHandler:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
