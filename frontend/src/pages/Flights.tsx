import CardFlight from "@/components/CardFlight";
import CardFlightSkeleton from "@/components/CardFlightSkeleton";
import FilterPanel from "@/components/FilterPanel";
import SearchFlightCard from "@/components/SearchFlightForm";
import type { FlightCardForm } from "@/schemas/flight.schema";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { parse } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { filterFlights } from "@/utils/filterFlights";

function Flights() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<FlightCardForm[]>([]);
  const [airlinesResults, setAirlinesResults] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [sortBy, setSortBy] = useState("menor-preco");
  const [isLoading, setIsLoading] = useState(false);

  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const originName = searchParams.get("originName") || "";
  const destinationName = searchParams.get("destinationName") || "";
  const departureDateParam = searchParams.get("departureDate") || "";
  const adultsParam = parseInt(searchParams.get("adults") || "1", 10);

  const [filters, setFilters] = useState({
    priceRange: [0, 5000] as [number, number],
    airlines: [] as string[],
    time: {
      madrugada: false,
      manha: false,
      tarde: false,
      noite: false,
    },
  });

  const resultsFilteredFlights = filterFlights(results, filters);

  useEffect(() => {
    let isMounted = true;

    const fetchFlightData = async () => {
      setIsLoading(true);
      setResults([]);
      setAirlinesResults([]);
      try {
        const response = await api.get("/flights/search", {
          params: {
            origin,
            destination,
            departureDate: departureDateParam,
            adults: adultsParam,
          },
        });

        if (!isMounted) {
          return;
        }

        setResults(response.data);
        setAirlinesResults(
          Array.from(
            new Set(
              response.data.map(
                (flight: { airline: string }) => flight.airline,
              ),
            ),
          ),
        );
      } catch (error) {
        if (isMounted) {
          console.error("Erro ao buscar voos:", error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchFlightData();

    return () => {
      isMounted = false;
    };
  }, [origin, destination, departureDateParam, adultsParam]);

  useEffect(() => {
    setVisibleCount(10);
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#FAFAFC] px-32">
      <div className="pt-32">
        <SearchFlightCard
          defaultValues={{
            origin,
            destination,
            departureDate: departureDateParam
              ? parse(departureDateParam, "yyyy-MM-dd", new Date())
              : undefined,
            adults: adultsParam,
          }}
          originLabel={originName}
          destinationLabel={destinationName}
          isLoading={isLoading}
          onSearchStart={() => setIsLoading(true)}
        />
      </div>

      <div className="flex w-full h-full gap-4 mt-10 pb-20">
        <div className="flex-1">
          <FilterPanel
            setFilters={setFilters}
            airlinesResults={airlinesResults}
          />
        </div>
        <div className="flex flex-col flex-2 px-4 gap-4 items-center">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CardFlightSkeleton key={index} />
            ))
          ) : (
            <>
              <div className="flex justify-between items-center w-full">
                <h1 className="flex gap-1 text-lg font-semibold text-[#112211]">
                  <span className="font-bold text-[#FF8682]">
                    {resultsFilteredFlights.length}
                  </span>
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
              {resultsFilteredFlights.slice(0, visibleCount).map((flight) => (
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
                  origin={origin}
                  destination={destination}
                  duration={flight.duration}
                />
              ))}
              {visibleCount < resultsFilteredFlights.length && (
                <Button
                  className=" w-full py-5 text-md"
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                >
                  Carregar mais voos
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Flights;