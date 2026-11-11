import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addToHistory, getHistory } from "../controllers/history.controller.js";
import { historySchema } from "../schemas/history.schema.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { historyWriteLimiter } from "../middlewares/rate-limit.middleware.js";

const router = Router();
router.post(
  "/",
  authMiddleware,
  historyWriteLimiter,
  validateSchema(historySchema),
  addToHistory,
);
router.get("/", authMiddleware, getHistory);

export default router;
