import type { FlightCardForm } from "@/schemas/flight.schema";
import { isTimeInRange } from "./timeRange";
import { durationInMinutes } from "./formatTime";

export const MAX_PRICE = 5000;

export const timeRanges = {
  madrugada: { label: "Madrugada", hint: "00h – 06h", range: ["00:00", "05:59"] },
  manha: { label: "Manhã", hint: "06h – 12h", range: ["06:00", "11:59"] },
  tarde: { label: "Tarde", hint: "12h – 18h", range: ["12:00", "17:59"] },
  noite: { label: "Noite", hint: "18h – 24h", range: ["18:00", "23:59"] },
} as const;

export type TimeRangeKey = keyof typeof timeRanges;

export interface FlightFilters {
  maxPrice: number;
  airlines: string[];
  times: TimeRangeKey[];
}

export const defaultFilters: FlightFilters = {
  maxPrice: MAX_PRICE,
  airlines: [],
  times: [],
};

export type SortOption = "menor-preco" | "maior-preco" | "duracao";

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "duracao", label: "Menor duração" },
];

export function countActiveFilters(filters: FlightFilters) {
  return (
    (filters.maxPrice < MAX_PRICE ? 1 : 0) +
    filters.airlines.length +
    filters.times.length
  );
}

export function filterFlights(
  results: FlightCardForm[],
  filters: FlightFilters,
) {
  return results.filter((flight) => {
    const matchesAirline =
      filters.airlines.length === 0 ||
      filters.airlines.includes(flight.airline);

    // O preço máximo no limite do slider significa "sem limite".
    const matchesPrice =
      filters.maxPrice >= MAX_PRICE || flight.price <= filters.maxPrice;

    const departureTime = flight.departureTime.slice(11, 16);
    const matchesDepartureTime =
      filters.times.length === 0 ||
      filters.times.some((key) => {
        const [start, end] = timeRanges[key].range;
        return isTimeInRange(departureTime, start, end);
      });

    return matchesAirline && matchesPrice && matchesDepartureTime;
  });
}

export function sortFlights(results: FlightCardForm[], sortBy: SortOption) {
  return [...results].sort((a, b) => {
    if (sortBy === "maior-preco") return b.price - a.price;
    if (sortBy === "duracao") {
      return durationInMinutes(a.duration) - durationInMinutes(b.duration);
    }
    return a.price - b.price;
  });
}
