import type { FlightCardForm } from "@/schemas/flight.schema";
import { isTimeInRange } from "./timeRange";

interface FlightFilters {
  priceRange: [number, number];
  airlines: string[];
  time: {
    madrugada: boolean;
    manha: boolean;
    tarde: boolean;
    noite: boolean;
  };
}

const timeRanges = {
  madrugada: ["23:59", "06:00"],
  manha: ["06:00", "12:00"],
  tarde: ["12:00", "18:00"],
  noite: ["18:00", "23:59"],
};

export function filterFlights(
  results: FlightCardForm[],
  filters: FlightFilters,
) {
  const filteredResults = results.filter((flight) => {
    const matchesAirline =
      filters.airlines.length === 0 ||
      filters.airlines.includes(flight.airline);

    const departureTime = flight.departureTime.slice(11, 16);

    const matchesPrice =
      flight.price >= filters.priceRange[0] &&
      flight.price <= filters.priceRange[1];

    const matchesDepartureTime =
      (!filters.time.madrugada &&
        !filters.time.manha &&
        !filters.time.tarde &&
        !filters.time.noite) ||
      (filters.time.madrugada &&
        isTimeInRange(
          departureTime,
          timeRanges.madrugada[0],
          timeRanges.madrugada[1],
        )) ||
      (filters.time.manha &&
        isTimeInRange(
          departureTime,
          timeRanges.manha[0],
          timeRanges.manha[1],
        )) ||
      (filters.time.tarde &&
        isTimeInRange(
          departureTime,
          timeRanges.tarde[0],
          timeRanges.tarde[1],
        )) ||
      (filters.time.noite &&
        isTimeInRange(departureTime, timeRanges.noite[0], timeRanges.noite[1]));

    return matchesAirline && matchesPrice && matchesDepartureTime;
  });
  return filteredResults;
}
