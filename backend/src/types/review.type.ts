export interface UpdateReviewDTO {
  id: string;
  userId: string;
  text: string;
  rating: number;
}

export interface CreateReviewDTO {
  text: string;
  rating: number;
  userId: string;
}

export interface DeleteReviewDTO {
  id: string;
  userId: string;
}
