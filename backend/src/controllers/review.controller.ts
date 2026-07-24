import type { Request, Response } from "express";
import {
  createReviewService,
  deleteReviewService,
  getReviewByIdService,
  getReviewsService,
  updateReviewService,
} from "../services/review.service";

export const createReview = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    const review = await createReviewService({
      ...req.body,
      userId: user!.id,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await getReviewsService();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const review = await getReviewByIdService(id);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { user } = req;
    const { text, rating } = req.body;

    const review = await updateReviewService({
      id,
      userId: user!.id,
      text,
      rating,
    });
    res.status(200).json(review);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { user } = req;
    await deleteReviewService({
      id,
      userId: user!.id,
    });
    res.status(200).json({ message: "Avaliação apagada com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    res.status(500).json({ message: "Erro no servidor" });
  }
};
