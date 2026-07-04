import { api } from "@/services/api";

export interface Location {
  label: string;
  value: string;
}

export const searchLocations = async (keyword: string): Promise<Location[]> => {
  const response = await api.get("/locations/search", {
    params: {
      keyword,
    },
  });

  return response.data;
};
