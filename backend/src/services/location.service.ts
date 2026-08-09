import { searchLocationsProvider } from "../providers/location.provider";
import type { SearchLocationDTO } from "../schemas/location.schema";

export const searchLocationsService = async (data: SearchLocationDTO) => {
  const response = await searchLocationsProvider(data.keyword);

  return response.data.map((location) => ({
    id: location.id,
    name: location.name,
    type: location.type,
    iataCode: location.iata_code,
    cityName: location.city_name,
    countryCode: location.iata_country_code,
  }));
};
