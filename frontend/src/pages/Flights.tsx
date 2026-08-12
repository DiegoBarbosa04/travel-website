import CardFlight from "@/components/CardFlight";
import Header from "@/components/Header";
import FilterPanel from "@/components/FilterPanel";
import type { FlightCardForm } from "@/schemas/flight.schema";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function Flights() {
  const searchParams = new URLSearchParams(window.location.search);
  const [results, setResults] = useState<FlightCardForm[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [sortBy, setSortBy] = useState("menor-preco");
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
        <div className="flex-1">
          <FilterPanel />
        </div>
        <div className="flex flex-col flex-2 px-4 gap-4 items-center">
          <div className="flex justify-between items-center w-full">
            <h1 className="flex gap-1 text-lg font-semibold text-[#112211]">
              <span className="font-bold text-[#FF8682]">{results.length}</span>
              voos encontrados
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#112211]">
                Ordenar:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="menor-preco">Menor preço</SelectItem>
                  <SelectItem value="maior-preco">Maior preço</SelectItem>
                  <SelectItem value="duracao">Menor duração</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {results.slice(0, visibleCount).map((flight) => (
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
          {visibleCount < results.length && (
            <Button
              className=" w-full py-5 text-md"
              onClick={() => setVisibleCount((prev) => prev + 10)}
            >
              Carregar mais voos
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Flights;
