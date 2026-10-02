import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addToHistory, getHistory } from "../controllers/history.controller.js";

const router = Router();
router.post("/history", authMiddleware, addToHistory);
router.get("/history", authMiddleware, getHistory);

export default router;
