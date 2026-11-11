import { z } from "zod";

export const searchFlightsSchema = z.object({
  origin: z.string().length(3),
  destination: z.string().length(3),
  departureDate: z.string(),
  adults: z.coerce.number().int().min(1).max(9).default(1),
});

export type SearchFlightsDTO = z.infer<typeof searchFlightsSchema>;
