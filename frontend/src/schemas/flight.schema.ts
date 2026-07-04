import { z } from "zod";

export const searchFlightSchema = z.object({
  origin: z.string().min(1),
  destination: z.string().min(1),
  departureDate: z.date(),
  adults: z.number().min(1),
});

export type SearchFlightForm = z.infer<typeof searchFlightSchema>;
