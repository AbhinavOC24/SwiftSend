import express, { type Request, type Response } from "express";
import { PORT } from "./env";
import pool from "./db"
import sendMessage from "./producer";

const app = express();
app.use(express.json());

type content = {
    body: string,
    req_id: number,
    created_at: string,
}

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`)
})


app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is alive" })
})

app.post("/send-email", async (req: Request, res: Response) => {
    try {
        const { idempotencyKey, content, payload } = req.body;

        await sendMessage(JSON.stringify(payload));

        res.status(200).json({ message: "Email request queued" });
    } catch (error) {
        console.error("Error in /send-email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})