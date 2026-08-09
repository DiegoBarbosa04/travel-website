import { api } from "./api";

export interface Location {
  id: string;
  name: string;
  type: "airport" | "city";
  iataCode: string;
  cityName: string | null;
  countryCode: string;
}

export const searchLocations = async (keyword: string) => {
  const response = await api.get("/locations/search", {
    params: {
      keyword,
    },
  });

  return response.data as Location[];
};
