import CardFlight from "@/components/CardFlight";
import CardFlightSkeleton from "@/components/CardFlightSkeleton";
import FilterPanel from "@/components/FilterPanel";
import SearchFlightCard from "@/components/SearchFlightForm";
import BottomSheet from "@/components/BottomSheet";
import type { FlightCardForm } from "@/schemas/flight.schema";
import { api } from "@/services/api";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import { parse } from "date-fns";
import {
  countActiveFilters,
  defaultFilters,
  filterFlights,
  sortFlights,
  sortOptions,
  type FlightFilters,
  type SortOption,
} from "@/utils/filterFlights";
import { formatShortDate } from "@/utils/formatTime";
import { saveFlights } from "@/utils/flightCache";
import { animationDelay } from "@/lib/utils";

const PAGE_SIZE = 10;
const EDIT_FORM_ID = "edit-search-form";

const eyebrowClassName =
  "text-[11px] leading-4 font-semibold tracking-[0.18em] text-[#1A1A1A] uppercase lg:text-xs";

function ArrowRight({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M20 20l-3.5-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function SortTabs({
  value,
  onChange,
  className,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className: string;
}) {
  return (
    <div
      role="tablist"
      aria-label="Ordenar voos"
      className={`flex gap-1 rounded-full border border-[#EAEAE6] bg-[#F4F4F2] p-1 lg:p-[5px] ${className}`}
    >
      {sortOptions.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={`flex-1 cursor-pointer rounded-full px-2 py-2 text-[13px] leading-[17px] whitespace-nowrap transition-colors lg:flex-none lg:px-4 lg:py-[7px] lg:text-sm lg:leading-[18px] ${
              active
                ? "bg-white font-semibold text-[#1A1A1A] shadow-[0_1px_3px_#020B3D14]"
                : "font-medium text-[#5C5C58] hover:text-[#1A1A1A]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function Flights() {
  const [searchParams] = useSearchParams();
  const { search } = useLocation();
  const [results, setResults] = useState<FlightCardForm[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [sortBy, setSortBy] = useState<SortOption>("menor-preco");
  const [filters, setFilters] = useState<FlightFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [openSheet, setOpenSheet] = useState<"filters" | "search" | null>(null);
  const [editFormKey, setEditFormKey] = useState(0);
  const [clearEditForm, setClearEditForm] = useState(false);

  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const originName = searchParams.get("originName") || "";
  const destinationName = searchParams.get("destinationName") || "";
  const departureDateParam = searchParams.get("departureDate") || "";
  // Limita a 1–9 para não propagar valores inválidos digitados direto na URL.
  const adultsParam = Math.min(
    9,
    Math.max(1, parseInt(searchParams.get("adults") || "1", 10) || 1),
  );

  const departureDate = departureDateParam
    ? parse(departureDateParam, "yyyy-MM-dd", new Date())
    : undefined;

  useEffect(() => {
    let isMounted = true;

    const fetchFlightData = async () => {
      setIsLoading(true);
      setHasError(false);
      setResults([]);
      setFilters(defaultFilters);
      setVisibleCount(PAGE_SIZE);
      try {
        const response = await api.get<FlightCardForm[]>("/flights/search", {
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
        saveFlights(response.data);
      } catch (error) {
        if (isMounted) {
          console.error("Erro ao buscar voos:", error);
          setHasError(true);
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

  const airlineCounts = useMemo(() => {
    const counts = new Map<string, number>();
    results.forEach((flight) =>
      counts.set(flight.airline, (counts.get(flight.airline) ?? 0) + 1),
    );
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [results]);

  const visibleFlights = useMemo(
    () => sortFlights(filterFlights(results, filters), sortBy),
    [results, filters, sortBy],
  );
  const cheapestId = useMemo(
    () => sortFlights(visibleFlights, "menor-preco")[0]?.id,
    [visibleFlights],
  );
  const activeFilters = countActiveFilters(filters);

  const updateFilters = (next: FlightFilters) => {
    setFilters(next);
    setVisibleCount(PAGE_SIZE);
  };

  // Prefere o nome da cidade vindo da Duffel; o rótulo da busca pode ser o nome de um aeroporto.
  const originTitle = results[0]?.departureCity || originName || origin;
  const destinationTitle = results[0]?.arrivalCity || destinationName || destination;
  const adultsLabel = `${adultsParam} ${adultsParam === 1 ? "adulto" : "adultos"}`;
  const summary = [departureDate && formatShortDate(departureDate, true), adultsLabel]
    .filter(Boolean)
    .join(" · ");
  const priceNote =
    adultsParam === 1
      ? "preços por adulto, em reais"
      : `preço total para ${adultsLabel}, em reais`;

  const searchDefaults = {
    defaultValues: {
      origin,
      destination,
      departureDate,
      adults: adultsParam,
    },
    originLabel: originName,
    destinationLabel: destinationName,
  };

  const filtersHeader = (
    <div className="flex items-center justify-between">
      <span className={eyebrowClassName}>01 — Filtros</span>
      <button
        type="button"
        onClick={() => updateFilters(defaultFilters)}
        className="cursor-pointer text-sm leading-[18px] font-bold text-[#E8480C]"
      >
        Limpar
      </button>
    </div>
  );

  return (
    <main className="text-[#1A1A1A]">
      <section className="flex flex-col gap-[18px] px-5 pt-5 lg:gap-8 lg:px-16 lg:pt-10">
        <div className="flex flex-col gap-[18px] lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="animate-rise flex flex-col gap-[18px] lg:gap-5">
            <p className="flex items-center gap-2 lg:gap-2.5">
              <span className="size-[7px] shrink-0 animate-pulse rounded-full bg-[#E8480C] lg:size-2" />
              <span className={eyebrowClassName}>Resultados da busca · Só ida</span>
            </p>
            <h1 className="flex flex-wrap items-center gap-x-3 text-[46px] leading-12 font-extrabold tracking-[-0.055em] lg:gap-x-5 lg:text-[80px] lg:leading-20">
              <span className="flex items-center gap-3 lg:gap-5">
                {originTitle}
                <ArrowRight className="size-[30px] shrink-0 text-[#E8480C] lg:size-14" />
              </span>
              <span className="text-[#E8480C]">{destinationTitle}</span>
            </h1>
          </div>
          <div className="hidden shrink-0 flex-col items-end gap-1 pb-2 lg:flex">
            <span className="text-lg leading-6 font-semibold">
              {origin} → {destination}
            </span>
            <span className="text-[15px] leading-5 text-[#5C5C58]">{summary}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-[14px] border border-[#D6D6D1] py-3 pr-3 pl-[18px] lg:hidden">
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-base leading-5 font-bold">
              {origin} → {destination}
            </span>
            <span className="text-[13px] leading-[17px] text-[#5C5C58]">{summary}</span>
          </div>
          <button
            type="button"
            onClick={() => setOpenSheet("search")}
            className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-[#E8480C] px-3.5 py-2.5 text-sm leading-[18px] font-bold text-white"
          >
            <SearchIcon className="size-[15px]" />
            Editar
          </button>
        </div>

        <div className="hidden lg:block">
          <SearchFlightCard
            key={search}
            variant="bar"
            {...searchDefaults}
            isLoading={isLoading}
            onSearchStart={() => setIsLoading(true)}
          />
        </div>
      </section>

      <section className="flex flex-col gap-12 px-5 pt-9 lg:flex-row lg:items-start lg:px-16 lg:pt-18">
        <aside className="hidden w-70 shrink-0 flex-col gap-9 border-t border-[#1A1A1A] pt-6 lg:flex">
          {filtersHeader}
          <FilterPanel
            filters={filters}
            onChange={updateFilters}
            airlineCounts={airlineCounts}
          />
        </aside>

        <div className="flex flex-1 flex-col gap-3.5 border-t border-[#1A1A1A] pt-[18px] lg:gap-6 lg:pt-6">
          <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between lg:pb-2">
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-0.5 lg:flex-row lg:items-baseline lg:gap-3">
                <span className="text-[32px] leading-[34px] font-extrabold tracking-[-0.04em] lg:text-[40px] lg:leading-[46px] lg:tracking-[-0.035em]">
                  {isLoading ? "Buscando…" : `${visibleFlights.length} ${visibleFlights.length === 1 ? "voo" : "voos"}`}
                </span>
                <span className="text-[13px] leading-[17px] text-[#5C5C58] lg:text-base lg:leading-[22px]">
                  <span className="hidden lg:inline">
                    {visibleFlights.length === 1 ? "encontrado" : "encontrados"} ·{" "}
                  </span>
                  {priceNote}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpenSheet("filters")}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-[#D6D6D1] px-3.5 py-2.5 text-sm leading-[18px] font-semibold lg:hidden"
              >
                <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                  <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="16" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="10" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="18" cy="18" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                Filtros
                {activeFilters > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E8480C] px-1.5 text-[11px] leading-[14px] font-bold text-white">
                    {activeFilters}
                  </span>
                )}
              </button>
            </div>
            <SortTabs value={sortBy} onChange={setSortBy} className="lg:shrink-0" />
          </div>

          <div className="flex flex-col gap-3 pt-0.5 lg:gap-6 lg:pt-0">
            {isLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <CardFlightSkeleton key={index} />
              ))}

            {!isLoading && hasError && (
              <p className="rounded-3xl border border-[#E2E2DD] px-6 py-10 text-center text-[15px] leading-6 text-[#5C5C58]">
                Não foi possível buscar os voos agora. Tente novamente em
                instantes.
              </p>
            )}

            {!isLoading && !hasError && visibleFlights.length === 0 && (
              <div className="flex flex-col items-center gap-3 rounded-3xl border border-[#E2E2DD] px-6 py-10 text-center">
                <p className="text-[15px] leading-6 text-[#5C5C58]">
                  {results.length === 0
                    ? "Nenhum voo encontrado para essa busca."
                    : "Nenhum voo corresponde aos filtros escolhidos."}
                </p>
                {results.length > 0 && (
                  <button
                    type="button"
                    onClick={() => updateFilters(defaultFilters)}
                    className="cursor-pointer text-sm font-bold text-[#E8480C]"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            )}

            {!isLoading &&
              visibleFlights
                .slice(0, visibleCount)
                .map((flight, index) => (
                  <div
                    key={flight.id}
                    className="animate-rise"
                    style={animationDelay(Math.min(index % PAGE_SIZE, 6) * 80)}
                  >
                    <CardFlight
                      flight={flight}
                      cheapest={flight.id === cheapestId}
                      detailsState={{ flight, search, adults: adultsParam }}
                    />
                  </div>
                ))}
          </div>

          {!isLoading && visibleFlights.length > 0 && (
            <div className="flex flex-col-reverse items-center gap-3 pt-3 lg:flex-row lg:justify-between lg:pt-4">
              <span className="text-[13px] leading-4 text-[#5C5C58] lg:text-[15px] lg:leading-5">
                Mostrando {Math.min(visibleCount, visibleFlights.length)} de{" "}
                {visibleFlights.length} voos
              </span>
              {visibleCount < visibleFlights.length && (
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="flex h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border-[1.5px] border-[#1A1A1A] px-6 text-[15px] leading-[18px] font-bold transition-colors hover:bg-[#F4F4F2] lg:h-auto lg:w-auto lg:border lg:py-3.5"
                >
                  Carregar mais voos
                  <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                    <path d="M12 5v14M6 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {openSheet === "filters" && (
        <BottomSheet
          title="Filtros"
          onClose={() => setOpenSheet(null)}
          onClear={() => updateFilters(defaultFilters)}
          footer={
            <button
              type="button"
              onClick={() => setOpenSheet(null)}
              className="flex h-[54px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-[#E8480C] text-base leading-5 font-bold text-white"
            >
              Mostrar {visibleFlights.length}{" "}
              {visibleFlights.length === 1 ? "voo" : "voos"}
              <ArrowRight className="size-4" />
            </button>
          }
        >
          <FilterPanel
            filters={filters}
            onChange={updateFilters}
            airlineCounts={airlineCounts}
          />
        </BottomSheet>
      )}

      {openSheet === "search" && (
        <BottomSheet
          title="Editar busca"
          onClose={() => setOpenSheet(null)}
          onClear={() => {
            setClearEditForm(true);
            setEditFormKey((key) => key + 1);
          }}
          footer={
            <button
              type="submit"
              form={EDIT_FORM_ID}
              className="flex h-[54px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-[#E8480C] text-base leading-5 font-bold text-white"
            >
              Atualizar busca
              <ArrowRight className="size-4" />
            </button>
          }
        >
          <div className="flex flex-col gap-3.5">
            <div className="flex gap-1 rounded-full border border-[#EAEAE6] bg-[#F4F4F2] p-1">
              <span className="flex-1 rounded-full bg-white py-2 text-center text-sm leading-[18px] font-semibold shadow-[0_1px_3px_#020B3D14]">
                Só ida
              </span>
              <span
                title="Em breve"
                className="flex-1 cursor-not-allowed py-2 text-center text-sm leading-[18px] font-medium text-[#8F8F8A]"
              >
                Ida e volta
              </span>
            </div>
            <SearchFlightCard
              key={editFormKey}
              variant="sheet"
              formId={EDIT_FORM_ID}
              {...(clearEditForm ? {} : searchDefaults)}
              onSearchStart={() => {
                setOpenSheet(null);
                setClearEditForm(false);
                setIsLoading(true);
              }}
            />
          </div>
        </BottomSheet>
      )}
    </main>
  );
}

export default Flights;
