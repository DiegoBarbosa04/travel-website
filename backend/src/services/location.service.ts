// import { amadeus } from "../lib/duffel";
// import type { AmadeusLocation } from "../types/location.type";

// export async function searchLocationsService(keyword: string) {
//   const response = await amadeus.referenceData.locations.get({
//     keyword,
//     subType: "CITY,AIRPORT",
//   });

//   return (response.data as AmadeusLocation[]).map((location) => ({
//     label: `${location.address.cityName} (${location.iataCode})`,
//     value: location.iataCode,
//   }));
// }
