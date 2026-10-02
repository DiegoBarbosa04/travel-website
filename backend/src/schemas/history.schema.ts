import { z } from "zod";

export const historySchema = z.object({
  origin: z.string().length(3),
  destination: z.string().length(3),
  departureDate: z.string(),
  adults: z.coerce.number().default(1),
});

export type historyDTO = z.infer<typeof historySchema>;
