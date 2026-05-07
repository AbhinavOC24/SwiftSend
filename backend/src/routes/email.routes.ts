import { Router } from "express";
import { sendEmailHandler } from "../controllers/email.controller";

const router = Router();

router.post("/send", sendEmailHandler);

export default router;
