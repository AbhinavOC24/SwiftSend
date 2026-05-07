import { Router } from "express";
import emailRoutes from "./email.routes";
import subscriptionRoutes from "./subscription.routes";

const router = Router();

router.use("/email", emailRoutes);
router.use("/subscribe", subscriptionRoutes);

router.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "SwiftSend API is operational" });
});

export default router;
