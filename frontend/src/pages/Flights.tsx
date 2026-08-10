import CardFlight from "@/components/CardFlight";
import Header from "@/components/Header";
import type { FlightCardForm } from "@/schemas/flight.schema";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

function Flights() {
  const searchParams = new URLSearchParams(window.location.search);
  const [results, setResults] = useState<FlightCardForm[]>([]);
  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await api.get("/flights/search", {
          params: {
            origin: searchParams.get("origin"),
            destination: searchParams.get("destination"),
            departureDate: searchParams.get("departureDate"),
            adults: parseInt(searchParams.get("adults") || "1", 10),
          },
        });
        setResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar voos:", error);
      }
    };

    fetchFlightData();
    console.log(results);
  }, []);
  return (
    <div className="min-h-screen bg-[#FAFAFC] px-32">
      <Header />
      <div className="flex w-full h-full gap-4 py-40">
        <div className="flex-1 bg-red-600 border-r border-gray-300">
          <h1>Filtros</h1>
        </div>
        <div className="flex flex-col flex-2 bg-blue-700 px-4 gap-4 items-center">
          <div className="flex justify-between items-center w-full">
            <h1>Mostrando 50 voos</h1>
          </div>
          {results.map((flight) => (
            <CardFlight
              key={flight.id}
              id={flight.id}
              carrierCode={flight.carrierCode}
              airline={flight.airline}
              departureCity={flight.departureCity}
              arrivalCity={flight.arrivalCity}
              logo={flight.logo}
              currency={flight.currency}
              price={flight.price}
              departureTime={flight.departureTime}
              arrivalTime={flight.arrivalTime}
              origin={searchParams.get("origin") || ""}
              destination={searchParams.get("destination") || ""}
              duration={flight.duration}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Flights;
