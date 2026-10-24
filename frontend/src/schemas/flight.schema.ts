import { z } from "zod";

export const searchFlightSchema = z.object({
  origin: z.string().min(1),
  destination: z.string().min(1),
  departureDate: z.date(),
  adults: z.number().int().min(1).max(9),
});

export const flightCardSchema = z.object({
  id: z.string().min(1),
  price: z.number().min(0),
  basePrice: z.number().nullable(),
  taxes: z.number().nullable(),
  airline: z.string().min(1),
  carrierCode: z.string().min(1),
  flightNumber: z.string().min(1),
  cabin: z.string().nullable(),
  aircraft: z.string().nullable(),
  currency: z.string().min(1),
  departureCity: z.string().min(1),
  departureAirport: z.string().min(1),
  departureTerminal: z.string().nullable(),
  arrivalCity: z.string().min(1),
  arrivalAirport: z.string().min(1),
  arrivalTerminal: z.string().nullable(),
  departureTime: z.string().min(1),
  logo: z.string().min(1),
  arrivalTime: z.string().min(1),
  origin: z.string().min(1),
  destination: z.string().min(1),
  duration: z.string().nullable(),
  stops: z.array(z.string()),
  baggage: z.object({
    carryOn: z.number(),
    checked: z.number(),
  }),
});

export type SearchFlightForm = z.infer<typeof searchFlightSchema>;
export type FlightCardForm = z.infer<typeof flightCardSchema>;
