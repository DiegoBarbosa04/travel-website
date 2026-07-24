import z from "zod";

export const reviewSchema = z.object({
  text: z
    .string()
    .min(10, "A avaliação deve ter pelo menos 10 caracteres.")
    .max(500, "Máximo de 500 caracteres."),
  rating: z.number().min(1).max(5),
});

export type ReviewForm = z.infer<typeof reviewSchema>;
