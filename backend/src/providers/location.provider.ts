import { duffel } from "../lib/duffel.js";

export const searchLocationsProvider = async (query: string) => {
  return duffel.suggestions.list({
    query,
  });
};
