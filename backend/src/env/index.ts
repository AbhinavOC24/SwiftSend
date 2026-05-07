import dotenv from "dotenv"
dotenv.config();

export const PORT = process.env.BACKEND_PORT || 8000
export const QUEUE_URL = process.env.QUEUE_URL;
export const GOOGLE_APP_PASSWORD = process.env.GOOGLE_APP_PASSWORD;
export const EMAIL = process.env.EMAIL;