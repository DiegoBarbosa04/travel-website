import { z } from "zod";

export const searchFlightSchema = z.object({
  origin: z.string().min(1),
  destination: z.string().min(1),
  departureDate: z.date(),
  adults: z.number().min(1),
});

export const flightCardSchema = z.object({
  id: z.string().min(1),
  price: z.number().min(0),
  airline: z.string().min(1),
  carrierCode: z.string().min(1),
  currency: z.string().min(1),
  departureCity: z.string().min(1),
  arrivalCity: z.string().min(1),
  departureTime: z.string().min(1),
  logo: z.string().min(1),
  arrivalTime: z.string().min(1),
  origin: z.string().min(1),
  destination: z.string().min(1),
  duration: z.string().min(1),
});

export type SearchFlightForm = z.infer<typeof searchFlightSchema>;
export type FlightCardForm = z.infer<typeof flightCardSchema>;
