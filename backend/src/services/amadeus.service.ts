import { amadeus } from "../lib/amadeus";
import type { SearchFlightsDTO } from "../schemas/flight.schema";

export async function searchFlightsService({
  origin,
  destination,
  departureDate,
  adults = 1,
  max = 10,
}: SearchFlightsDTO) {
  const response = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: origin,
    destinationLocationCode: destination,
    departureDate: departureDate,
    adults: adults.toString(),
    max: max.toString(),
  });

  return response.data.map((flight: any) => ({
    id: flight.id,
    price: flight.price.total,
    departure: flight.itineraries[0].segments[0].departure.at,
    arrival: flight.itineraries[0].segments.at(-1)?.arrival.at,
    airline: flight.validatingAirlineCodes[0],
  }));
}
