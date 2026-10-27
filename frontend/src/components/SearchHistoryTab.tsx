import { useEffect, useState } from "react";
import { Link } from "react-router";
import { format, isToday, isYesterday } from "date-fns";
import { getHistory, type SearchHistoryEntry } from "@/services/history.service";

const headerClassName =
  "shrink-0 text-xs leading-4 font-semibold tracking-[0.18em] text-[#5C5C58] uppercase";

// A data da viagem é salva como meia-noite UTC; usa só a parte da data para não deslocar o dia.
const toDateParam = (date: string) => date.slice(0, 10);

const formatDate = (date: string) => toDateParam(date).split("-").reverse().join("/");

const formatSearchedAt = (date: string) => {
  const searchedAt = new Date(date);
  if (isToday(searchedAt)) return `Hoje, ${format(searchedAt, "HH:mm")}`;
  if (isYesterday(searchedAt)) return `Ontem, ${format(searchedAt, "HH:mm")}`;
  return format(searchedAt, "dd/MM/yyyy");
};

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
  const [history, setHistory] = useState<SearchHistoryEntry[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");

  useEffect(() => {
    let isMounted = true;

    getHistory()
      .then((data) => {
        if (!isMounted) return;
        // O backend já ordena, mas garante da mais recente para a mais antiga.
        setHistory(
          [...data].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        );
        setStatus("ready");
      })
      .catch((error) => {
        console.error("Erro ao buscar histórico:", error);
        if (isMounted) setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (status !== "ready" || history.length === 0) {
    const message =
      status === "loading"
        ? "Carregando seu histórico…"
        : status === "error"
          ? "Não foi possível carregar seu histórico agora. Tente novamente em instantes."
          : "Você ainda não fez nenhuma pesquisa. Suas últimas 10 buscas aparecem aqui.";

    return (
      <p className="rounded-3xl border border-[#E2E2DD] px-6 py-10 text-center text-[15px] leading-6 text-[#5C5C58]">
        {message}
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="hidden items-center gap-6 border-b border-[#1A1A1A] pb-3.5 lg:flex">
        <span className={`${headerClassName} flex-1`}>Rota</span>
        <span className={`${headerClassName} w-37.5`}>Data da viagem</span>
        <span className={`${headerClassName} w-27.5`}>Passageiros</span>
        <span className={`${headerClassName} w-32.5`}>Pesquisado em</span>
        <span className="w-50 shrink-0" />
      </div>

      {history.map((item, index) => {
        const originCity = item.originName || item.origin;
        const destinationCity = item.destinationName || item.destination;
        const params = new URLSearchParams({
          origin: item.origin,
          destination: item.destination,
          departureDate: toDateParam(item.departureDate),
          adults: String(item.adults),
        });
        if (item.originName) params.set("originName", item.originName);
        if (item.destinationName) params.set("destinationName", item.destinationName);
        const adultsLabel = `${item.adults} ${item.adults === 1 ? "adulto" : "adultos"}`;
        const searchedAt = formatSearchedAt(item.createdAt);

        return (
          <div
            key={item.id}
            className={`flex flex-col gap-3.5 py-5 lg:flex-row lg:items-center lg:gap-6 lg:py-7 ${
              index < history.length - 1 ? "border-b border-[#EAEAE6]" : ""
            } lg:border-b lg:border-[#EAEAE6]`}
          >
            <div className="flex items-start justify-between gap-3 lg:flex-1">
              <div className="flex flex-col gap-1">
                <span className="flex flex-wrap items-center gap-x-3 text-[22px] leading-7 font-extrabold tracking-[-0.035em] text-[#1A1A1A] lg:text-[28px] lg:leading-8">
                  <span className="flex items-center gap-3">
                    {originCity}
                    <ArrowRight className="size-[18px] text-[#E8480C] lg:size-[22px]" />
                  </span>
                  {destinationCity}
                </span>
                <span className="text-xs leading-4 font-semibold tracking-[0.12em] text-[#5C5C58] lg:text-[13px]">
                  {item.origin} → {item.destination}
                </span>
              </div>
              <span className="shrink-0 pt-1 text-[13px] leading-4 text-[#5C5C58] lg:hidden">
                {searchedAt}
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
                {searchedAt}
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
