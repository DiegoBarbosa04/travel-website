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
import { reviewWriteLimiter } from "../middlewares/rate-limit.middleware.js";

const router = Router();

router.get("/", getReviews);
router.get("/me", authMiddleware, getMyReviews);

router.post(
  "/",
  authMiddleware,
  reviewWriteLimiter,
  validateSchema(createReviewSchema),
  createReview,
);

router.put(
  "/:id",
  authMiddleware,
  reviewWriteLimiter,
  validateSchema(updateReviewSchema),
  updateReview,
);

router.delete("/:id", authMiddleware, reviewWriteLimiter, deleteReview);

export default router;
