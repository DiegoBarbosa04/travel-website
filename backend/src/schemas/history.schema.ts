import { z } from "zod";

export const historySchema = z.object({
  origin: z.string().length(3),
  destination: z.string().length(3),
  originName: z.string().max(120).optional(),
  destinationName: z.string().max(120).optional(),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  adults: z.coerce.number().int().min(1).max(9).default(1),
});

export type historyDTO = z.infer<typeof historySchema>;
