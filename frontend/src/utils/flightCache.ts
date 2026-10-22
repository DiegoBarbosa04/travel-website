import type { FlightCardForm } from "@/schemas/flight.schema";

// A API não tem endpoint de um voo só: guardamos a última busca para a página de
// detalhes continuar funcionando ao recarregar.
const STORAGE_KEY = "decolando:flights";

export function saveFlights(flights: FlightCardForm[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(flights));
  } catch {
    // Armazenamento indisponível (modo privado, cota cheia): a página de detalhes
    // ainda funciona com o estado da navegação.
  }
}

export function findFlight(id: string) {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const flights = JSON.parse(stored) as FlightCardForm[];
    return flights.find((flight) => flight.id === id) ?? null;
  } catch {
    return null;
  }
}
