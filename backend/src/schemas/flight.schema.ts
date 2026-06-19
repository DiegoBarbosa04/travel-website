import { z } from "zod";

export const searchFlightsSchema = z.object({
  origin: z.string().length(3),
  destination: z.string().length(3),
  departureDate: z.string(),
  adults: z.number().optional(),
});

export type SearchFlightsDTO = z.infer<typeof searchFlightsSchema>;
