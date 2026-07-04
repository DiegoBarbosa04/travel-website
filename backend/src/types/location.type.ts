export interface AmadeusLocation {
  iataCode: string;
  address: {
    cityName: string;
    countryName: string;
  };
}

export interface AmadeusLocationsResponse {
  data: AmadeusLocation[];
}
