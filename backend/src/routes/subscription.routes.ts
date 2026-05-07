import { Router } from "express";
import { subscribeHandler, unsubscribeHandler } from "../controllers/subscription.controller";

const router = Router();

router.post("/", subscribeHandler);
router.post("/unsubscribe", unsubscribeHandler)

export default router;
