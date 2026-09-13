import { Router } from "express";
import {
  createReview,
  deleteReview,
  getMyReviews,
  getReviews,
  updateReview,
} from "../controllers/review.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import {
  createReviewSchema,
  updateReviewSchema,
} from "../schemas/review.schema.js";

const router = Router();

router.get("/", getReviews);
router.get("/me", authMiddleware, getMyReviews);

router.post(
  "/",
  authMiddleware,
  validateSchema(createReviewSchema),
  createReview,
);

router.put(
  "/:id",
  authMiddleware,
  validateSchema(updateReviewSchema),
  updateReview,
);

router.delete("/:id", authMiddleware, deleteReview);

export default router;
