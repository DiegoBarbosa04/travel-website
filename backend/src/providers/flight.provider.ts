import { duffel } from "../lib/duffel";

interface SearchFlightsProviderParams {
  origin: string;
  destination: string;
  departureDate: string;
  adults: number;
}

export const searchFlightsProvider = async ({
  origin,
  destination,
  departureDate,
  adults,
}: SearchFlightsProviderParams) => {
  return duffel.offerRequests.create({
    slices: [
      {
        origin,
        destination,
        departure_date: departureDate,
        arrival_time: null,
        departure_time: null,
      },
    ],

    passengers: Array.from({ length: adults }, () => ({
      type: "adult",
    })),

    cabin_class: "economy",
  });
};
