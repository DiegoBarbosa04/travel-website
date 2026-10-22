import { searchFlightsProvider } from "../providers/flight.provider.js";
import type { SearchFlightsDTO } from "../schemas/flight.schema.js";
import { convertCurrency } from "./currency.service.js";

export interface FlightResponse {
  id: string;
  airline: string;
  carrierCode: string;
  logo: string;
  flightNumber: string;
  cabin: string | null;
  aircraft: string | null;
  departureTime: string;
  departureCity: string;
  departureAirport: string;
  departureTerminal: string | null;
  arrivalTime: string;
  arrivalCity: string;
  arrivalAirport: string;
  arrivalTerminal: string | null;
  origin: string;
  destination: string;
  duration: string | null;
  stops: string[];
  baggage: {
    carryOn: number;
    checked: number;
  };
  price: number;
  basePrice: number | null;
  taxes: number | null;
  currency: string;
}

interface ConvertedValues {
  data: {
    date: string;
    base: string;
    quote: string;
    rate: number;
  };
}

export const searchFlightsService = async (
  data: SearchFlightsDTO,
): Promise<FlightResponse[]> => {
  const response = await searchFlightsProvider(data);
  const convertedValues = (await convertCurrency()) as ConvertedValues;
  const { rate } = convertedValues!.data;

  const toBrl = (amount: string | null) =>
    amount === null ? null : parseFloat(amount) * rate;

  return response.data.offers.slice(0, 30).flatMap((offer) => {
    const slice = offer.slices[0];

    if (!slice) {
      return [];
    }

    // Voos com conexão têm vários segmentos: a partida vem do primeiro e a chegada do último.
    const firstSegment = slice.segments[0];
    const lastSegment = slice.segments.at(-1);

    if (!firstSegment || !lastSegment) {
      return [];
    }

    const airline = firstSegment.marketing_carrier.name;
    const carrierCode = firstSegment.marketing_carrier.iata_code;
    const logo = firstSegment.marketing_carrier.logo_symbol_url;
    const departureCity = firstSegment.origin.city_name;
    const arrivalCity = lastSegment.destination.city_name;
    const origin = firstSegment.origin.iata_code;
    const destination = lastSegment.destination.iata_code;

    if (
      !airline ||
      !carrierCode ||
      !logo ||
      !departureCity ||
      !arrivalCity ||
      !origin ||
      !destination
    ) {
      return [];
    }

    const baggages = firstSegment.passengers[0]?.baggages ?? [];
    const countBaggage = (type: string) =>
      baggages
        .filter((baggage) => baggage.type === type)
        .reduce((total, baggage) => total + baggage.quantity, 0);

    return [
      {
        id: offer.id,
        airline,
        carrierCode,
        logo,
        flightNumber: `${carrierCode} ${firstSegment.marketing_carrier_flight_number}`,
        cabin: firstSegment.passengers[0]?.cabin_class_marketing_name ?? null,
        aircraft: firstSegment.aircraft?.name ?? null,
        departureTime: firstSegment.departing_at,
        departureCity,
        departureAirport: firstSegment.origin.name,
        departureTerminal: firstSegment.origin_terminal,
        arrivalTime: lastSegment.arriving_at,
        arrivalCity,
        arrivalAirport: lastSegment.destination.name,
        arrivalTerminal: lastSegment.destination_terminal,
        origin,
        destination,
        duration: slice.duration ?? firstSegment.duration,
        stops: slice.segments
          .slice(0, -1)
          .flatMap((segment) => segment.destination.iata_code ?? []),
        baggage: {
          carryOn: countBaggage("carry_on"),
          checked: countBaggage("checked"),
        },
        price: parseFloat(offer.total_amount) * rate,
        basePrice: toBrl(offer.base_amount),
        taxes: toBrl(offer.tax_amount),
        currency: offer.total_currency,
      },
    ];
  });
};
