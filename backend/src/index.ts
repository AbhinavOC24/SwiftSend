import express from "express";
import { PORT } from "./config/env";
import router from "./routes";

const app = express();

app.use(express.json());

// Main API Routes
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`\uD83D\uDE80 SwiftSend API Server running on http://localhost:${PORT}`);
});