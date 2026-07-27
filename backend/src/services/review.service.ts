import { prisma } from "../lib/prisma";
import type {
  CreateReviewDTO,
  DeleteReviewDTO,
  UpdateReviewDTO,
} from "../types/review.type";

export const createReviewService = ({
  text,
  rating,
  userId,
}: CreateReviewDTO) => {
  return prisma.review.create({
    data: {
      text,
      rating,
      userId,
    },
  });
};

export const getReviewsService = () => {
  return prisma.review.findMany({
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getMyReviewsService = (id: string) => {
  return prisma.review.findMany({
    where: { userId: id },
  });
};

export const updateReviewService = async ({
  id,
  text,
  userId,
  rating,
}: UpdateReviewDTO) => {
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new Error("Avaliação não encontrada");
  }

  if (review.userId !== userId) {
    throw new Error("Você não pode editar essa avaliação");
  }

  return prisma.review.update({
    where: { id },
    data: {
      text,
      rating,
    },
  });
};

export const deleteReviewService = async ({ id, userId }: DeleteReviewDTO) => {
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new Error("Avaliação não encontrada");
  }

  if (review.userId !== userId) {
    throw new Error("Você não pode apagar esta avaliação");
  }

  return prisma.review.delete({
    where: { id },
  });
};
