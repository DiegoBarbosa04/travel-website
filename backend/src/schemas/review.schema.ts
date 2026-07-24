import { z } from "zod";

export const createReviewSchema = z.object({
  text: z.string().min(5),
  rating: z.number().min(1).max(5),
});

export const updateReviewSchema = z.object({
  text: z.string().min(5),
  rating: z.number().min(1).max(5),
});

export type CreateReviewBody = z.infer<typeof createReviewSchema>;
export type UpdateReviewBody = z.infer<typeof updateReviewSchema>;
