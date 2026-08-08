import { searchFlightsProvider } from "../providers/flight.provider";
import type { SearchFlightsDTO } from "../schemas/flight.schema";

export interface FlightResponse {
  id: string;
  airline: string;
  carrierCode: string;
  logo: string;
  departureTime: string;
  departureCity: string;
  arrivalTime: string;
  arrivalCity: string;
  duration: string | null;
  price: string;
  currency: string;
}

export const searchFlightsService = async (
  data: SearchFlightsDTO,
): Promise<FlightResponse[]> => {
  const response = await searchFlightsProvider(data);

  return response.data.offers.flatMap((offer) => {
    const slice = offer.slices[0];

    if (!slice) {
      return [];
    }

    const segment = slice.segments[0];

    if (!segment) {
      return [];
    }

    const airline = segment.marketing_carrier.name;
    const carrierCode = segment.marketing_carrier.iata_code;
    const logo = segment.marketing_carrier.logo_symbol_url;
    const departureCity = segment.origin.city_name;
    const arrivalCity = segment.destination.city_name;

    if (!airline || !carrierCode || !logo || !departureCity || !arrivalCity) {
      return [];
    }

    return [
      {
        id: offer.id,
        airline,
        carrierCode,
        logo,
        departureTime: segment.departing_at,
        departureCity,
        arrivalTime: segment.arriving_at,
        arrivalCity,
        duration: segment.duration,
        price: offer.total_amount,
        currency: offer.total_currency,
      },
    ];
  });
};
