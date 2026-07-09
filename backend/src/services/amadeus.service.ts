import { airlines } from "../constants/airplane";
import { amadeus } from "../lib/amadeus";
import type { SearchFlightsDTO } from "../schemas/flight.schema";

export async function searchFlightsService({
  origin,
  destination,
  departureDate,
  adults,
  max = 10,
}: SearchFlightsDTO) {
  const response = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: origin,
    destinationLocationCode: destination,
    departureDate: departureDate,
    adults: adults?.toString() || "1",
    max: max.toString(),
  });

  return response.data.map((flight: any) => {
    const itinerary = flight.itineraries[0];

    const firstSegment = itinerary.segments[0];
    const lastSegment = itinerary.segments[itinerary.segments.length - 1];

    return {
      id: flight.id,
      carrierName:
        airlines[flight.validatingAirlineCodes[0]] ??
        flight.validatingAirlineCodes[0],
      airlineCode: flight.validatingAirlineCodes[0],
      tripType: flight.oneWay ? "Ida" : "Ida e volta",
      duration: itinerary.duration,

      departureTime: firstSegment.departure.at,
      departureAirport: firstSegment.departure.iataCode,

      arrivalTime: lastSegment.arrival.at,
      arrivalAirport: lastSegment.arrival.iataCode,

      price: Number(flight.price.total),
      currency: flight.price.currency,
    };
  });
}
