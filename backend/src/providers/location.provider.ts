import { duffel } from "../lib/duffel";

export const searchLocationsProvider = async (query: string) => {
  return duffel.suggestions.list({
    query,
  });
};
