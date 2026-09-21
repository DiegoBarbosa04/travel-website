import type { ReviewForm } from "@/schemas/review.schema";
import { api } from "./api";

export type Review = {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
};

export type PublicReview = Review & {
  user: {
    firstName: string;
    lastName: string;
  };
};

export const createReview = async (data: ReviewForm) => {
  const response = await api.post("/reviews/", data);
  return response.data as Review;
};

export const getMyreviews = async () => {
  const response = await api.get("/reviews/me");
  return response.data as Review[];
};

export const getReviews = async () => {
  const response = await api.get("/reviews");
  return response.data as PublicReview[];
};
