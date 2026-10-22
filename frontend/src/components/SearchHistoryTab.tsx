import { Link } from "react-router";

// Dados de exemplo: o histórico ainda não é salvo pelo backend.
const historySearches = [
  {
    id: 1,
    origin: { city: "São Paulo", code: "GRU" },
    destination: { city: "Paris", code: "CDG" },
    departureDate: "2026-12-12",
    adults: 1,
    searchedAt: "Hoje, 09:12",
  },
  {
    id: 2,
    origin: { city: "Rio de Janeiro", code: "GIG" },
    destination: { city: "Lisboa", code: "LIS" },
    departureDate: "2027-01-20",
    adults: 2,
    searchedAt: "Ontem, 21:40",
  },
  {
    id: 3,
    origin: { city: "São Paulo", code: "GRU" },
    destination: { city: "Londres", code: "LHR" },
    departureDate: "2027-02-05",
    adults: 1,
    searchedAt: "16/10/2026",
  },
  {
    id: 4,
    origin: { city: "Brasília", code: "BSB" },
    destination: { city: "Melbourne", code: "MEL" },
    departureDate: "2027-03-14",
    adults: 2,
    searchedAt: "15/10/2026",
  },
];

const headerClassName =
  "shrink-0 text-xs leading-4 font-semibold tracking-[0.18em] text-[#5C5C58] uppercase";

const formatDate = (date: string) => date.split("-").reverse().join("/");

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

function SearchHistoryTab() {
  return (
    <div className="flex flex-col">
      <div className="hidden items-center gap-6 border-b border-[#1A1A1A] pb-3.5 lg:flex">
        <span className={`${headerClassName} flex-1`}>Rota</span>
        <span className={`${headerClassName} w-37.5`}>Data da viagem</span>
        <span className={`${headerClassName} w-27.5`}>Passageiros</span>
        <span className={`${headerClassName} w-32.5`}>Pesquisado em</span>
        <span className="w-50 shrink-0" />
      </div>

      {historySearches.map((item, index) => {
        const params = new URLSearchParams({
          origin: item.origin.code,
          destination: item.destination.code,
          departureDate: item.departureDate,
          adults: String(item.adults),
          originName: item.origin.city,
          destinationName: item.destination.city,
        });
        const adultsLabel = `${item.adults} ${item.adults === 1 ? "adulto" : "adultos"}`;

        return (
          <div
            key={item.id}
            className={`flex flex-col gap-3.5 py-5 lg:flex-row lg:items-center lg:gap-6 lg:py-7 ${
              index < historySearches.length - 1 ? "border-b border-[#EAEAE6]" : ""
            } lg:border-b lg:border-[#EAEAE6]`}
          >
            <div className="flex items-start justify-between gap-3 lg:flex-1">
              <div className="flex flex-col gap-1">
                <span className="flex flex-wrap items-center gap-x-3 text-[22px] leading-7 font-extrabold tracking-[-0.035em] text-[#1A1A1A] lg:text-[28px] lg:leading-8">
                  <span className="flex items-center gap-3">
                    {item.origin.city}
                    <ArrowRight className="size-[18px] text-[#E8480C] lg:size-[22px]" />
                  </span>
                  {item.destination.city}
                </span>
                <span className="text-xs leading-4 font-semibold tracking-[0.12em] text-[#5C5C58] lg:text-[13px]">
                  {item.origin.code} → {item.destination.code}
                </span>
              </div>
              <span className="shrink-0 pt-1 text-[13px] leading-4 text-[#5C5C58] lg:hidden">
                {item.searchedAt}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 lg:contents">
              <div className="flex gap-2 lg:contents">
                <span className="rounded-lg bg-[#F4F4F2] px-2.5 py-1.5 text-[13px] leading-4 font-semibold text-[#1A1A1A] lg:w-37.5 lg:shrink-0 lg:bg-transparent lg:p-0 lg:text-base lg:leading-5">
                  {formatDate(item.departureDate)}
                </span>
                <span className="rounded-lg bg-[#F4F4F2] px-2.5 py-1.5 text-[13px] leading-4 text-[#1A1A1A] lg:w-27.5 lg:shrink-0 lg:bg-transparent lg:p-0 lg:text-base lg:leading-5">
                  {adultsLabel}
                </span>
              </div>
              <span className="hidden w-32.5 shrink-0 text-base leading-5 text-[#5C5C58] lg:block">
                {item.searchedAt}
              </span>
              <div className="flex shrink-0 justify-end lg:w-50">
                <Link
                  to={`/flights?${params.toString()}`}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm leading-[18px] font-bold transition-colors lg:px-5 lg:py-3 ${
                    index === 0
                      ? "bg-[#1A1A1A] text-white hover:bg-[#E8480C]"
                      : "border border-[#D6D6D1] text-[#1A1A1A] hover:border-[#1A1A1A]"
                  }`}
                >
                  <span className="lg:hidden">Pesquisar</span>
                  <span className="hidden lg:inline">Pesquisar de novo</span>
                  <ArrowRight className="size-[15px]" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SearchHistoryTab;
