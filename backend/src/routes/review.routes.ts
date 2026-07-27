import { Router } from "express";
import {
  createReview,
  deleteReview,
  getMyReviews,
  getReviews,
  updateReview,
} from "../controllers/review.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateSchema } from "../middlewares/validate.middleware";
import {
  createReviewSchema,
  updateReviewSchema,
} from "../schemas/review.schema";

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
