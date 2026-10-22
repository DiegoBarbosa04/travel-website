import type { ReactNode } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import type { FlightCardForm } from "@/schemas/flight.schema";
import { AirlineBadge, PlaneIcon } from "@/components/CardFlight";
import { findFlight } from "@/utils/flightCache";
import { flightSubtitle } from "@/utils/flightLabels";
import { dayOffset, formatDuration, formatShortDate, formatTime } from "@/utils/formatTime";
import { formatoBrlInteiro } from "@/utils/formatCurrency";

type DetailsState = {
  flight?: FlightCardForm;
  search?: string;
  adults?: number;
};

const eyebrowClassName =
  "text-[11px] leading-4 font-semibold tracking-[0.18em] text-[#1A1A1A] uppercase lg:text-xs";

// "São Paulo – Guarulhos International Airport" → "São Paulo · Guarulhos"
function airportLabel(city: string, airport: string) {
  let name = airport.replace(/\s*(International\s+)?Airport$/i, "").trim();
  if (name.toLowerCase().startsWith(city.toLowerCase())) {
    name = name.slice(city.length).replace(/^\s*[–-]?\s*/, "");
  }
  return name && name.toLowerCase() !== city.toLowerCase()
    ? `${city} · ${name}`
    : city;
}

function stopsSummary(stops: string[]) {
  if (stops.length === 0) return "Voo direto";
  const count = stops.length === 1 ? "1 parada" : `${stops.length} paradas`;
  return `${count} · ${stops.join(", ")}`;
}

function ArrowIcon({ className, direction = "right" }: { className: string; direction?: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d={direction === "right" ? "M5 12h14M13 6l6 6-6 6" : "M19 12H5M11 6l-6 6 6 6"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 15V3M7 8l5-5 5 5M5 13v7h14v-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className={eyebrowClassName}>{children}</span>
      {aside && (
        <span className="text-[13px] leading-4 text-[#5C5C58] lg:text-sm lg:leading-[18px]">
          {aside}
        </span>
      )}
    </div>
  );
}

const baggageIcons = {
  personal:
    "M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 8h12a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a1 1 0 0 1 1-1z",
  carryOn:
    "M9 6V3h6v3M7 6h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM9 20v1.5M15 20v1.5",
  checked:
    "M9 7V4h6v3M5 7h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zM9 7v12M15 7v12",
};

function FlightDetails() {
  const { id = "" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state ?? {}) as DetailsState;
  const flight = state.flight ?? findFlight(id);
  const adults = state.adults ?? 1;

  const goBack = () => {
    if (state.search) navigate(`/flights${state.search}`);
    else if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Decolando", url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copiado.");
      }
    } catch {
      // Compartilhamento cancelado pelo usuário.
    }
  };

  const book = () => toast.info("A reserva estará disponível em breve.");

  if (!flight) {
    return (
      <main className="flex flex-col items-start gap-5 px-5 py-20 lg:px-16">
        <h1 className="text-[34px] leading-9 font-extrabold tracking-[-0.045em] text-[#1A1A1A] lg:text-5xl lg:leading-14">
          Voo não encontrado.
        </h1>
        <p className="text-[15px] leading-6 text-[#5C5C58]">
          Os detalhes desse voo expiraram. Faça uma nova busca para ver os
          preços atualizados.
        </p>
        <Link
          to="/"
          className="flex h-12 items-center gap-2 rounded-[14px] bg-[#E8480C] px-6 text-[15px] font-bold text-white"
        >
          Buscar voos
          <ArrowIcon className="size-4" />
        </Link>
      </main>
    );
  }

  const offset = dayOffset(flight.departureTime, flight.arrivalTime);
  const duration = formatDuration(flight.duration);
  const subtitle = flightSubtitle(flight.flightNumber, flight.cabin);
  const legDetail = [flight.flightNumber, flight.aircraft].filter(Boolean).join(" · ");
  const adultsLabel = `${adults} ${adults === 1 ? "adulto" : "adultos"}`;
  const stopsTag =
    flight.stops.length === 0
      ? "Direto"
      : flight.stops.length === 1
        ? "1 parada"
        : `${flight.stops.length} paradas`;

  const departure = {
    time: formatTime(flight.departureTime),
    code: flight.origin,
    place: airportLabel(flight.departureCity, flight.departureAirport),
    detail: [
      formatShortDate(flight.departureTime),
      flight.departureTerminal && `Terminal ${flight.departureTerminal}`,
    ]
      .filter(Boolean)
      .join(" · "),
  };
  const arrival = {
    time: formatTime(flight.arrivalTime),
    code: flight.destination,
    place: airportLabel(flight.arrivalCity, flight.arrivalAirport),
    detail: [
      formatShortDate(flight.arrivalTime),
      flight.arrivalTerminal && `Terminal ${flight.arrivalTerminal}`,
    ]
      .filter(Boolean)
      .join(" · "),
  };

  const baggage = [
    {
      icon: baggageIcons.personal,
      title: "Item pessoal",
      description: "Bolsa ou mochila sob o assento",
      status: "A confirmar",
      included: null,
    },
    {
      icon: baggageIcons.carryOn,
      title: flight.baggage.carryOn > 1 ? `Mala de mão · ${flight.baggage.carryOn}` : "Mala de mão",
      description: "No compartimento superior",
      status: flight.baggage.carryOn > 0 ? "Incluída" : "Não incluída",
      included: flight.baggage.carryOn > 0,
    },
    {
      icon: baggageIcons.checked,
      title: flight.baggage.checked > 1 ? `Mala despachada · ${flight.baggage.checked}` : "Mala despachada",
      description:
        flight.baggage.checked > 0 ? "Despachada no check-in" : "Pode ser adicionada na reserva",
      status: flight.baggage.checked > 0 ? "Incluída" : "Não incluída",
      included: flight.baggage.checked > 0,
    },
  ];

  const priceRows = [
    flight.basePrice !== null && {
      label: `Tarifa · ${adultsLabel}`,
      value: formatoBrlInteiro(flight.basePrice),
    },
    flight.taxes !== null && {
      label: "Taxas e encargos",
      value: formatoBrlInteiro(flight.taxes),
    },
    { label: "Taxa Decolando", value: "R$ 0", highlight: true },
  ].filter(Boolean) as { label: string; value: string; highlight?: boolean }[];

  const priceSummary = (
    <>
      <div className="flex flex-col gap-[18px] lg:px-8 lg:py-7">
        <div className="lg:pb-1">
          <SectionTitle>03 — Resumo do preço</SectionTitle>
        </div>
        {priceRows.map((row) => (
          <div key={row.label} className="flex justify-between text-[15px] leading-5">
            <span className="text-[#5C5C58]">{row.label}</span>
            <span className={`font-semibold ${row.highlight ? "text-[#1F7A55]" : "text-[#1A1A1A]"}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-[18px] border-t-[1.5px] border-dashed border-[#D6D6D1] lg:mt-0" />
      <div className="flex flex-col gap-5 pt-5 lg:px-8 lg:pt-7 lg:pb-8">
        <div className="flex items-baseline justify-between">
          <span className="text-[17px] leading-[22px] font-bold">Total</span>
          <span className="text-[30px] leading-9 font-extrabold tracking-[-0.045em] lg:text-[44px] lg:leading-12">
            {formatoBrlInteiro(flight.price)}
          </span>
        </div>
        <button
          type="button"
          onClick={book}
          className="hidden h-14 cursor-pointer items-center justify-center gap-2.5 rounded-[14px] bg-[#E8480C] text-base leading-5 font-bold text-white transition-colors hover:bg-[#B8360A] lg:flex"
        >
          Reservar voo
          <ArrowIcon className="size-4" />
        </button>
        <p className="-mt-2 text-[13px] leading-5 text-[#5C5C58] lg:mt-0">
          Valor convertido de dólar para real pela cotação de hoje. O preço
          final é confirmado pela companhia.
        </p>
      </div>
    </>
  );

  return (
    <main className="pb-28 text-[#1A1A1A] lg:pb-0">
      <div className="flex items-center justify-between px-5 pt-4 lg:hidden">
        <button
          type="button"
          onClick={goBack}
          aria-label="Voltar aos resultados"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#EAEAE6] bg-[#F4F4F2]"
        >
          <ArrowIcon direction="left" className="size-4" />
        </button>
        <span className="text-base leading-5 font-bold">Detalhes do voo</span>
        <button
          type="button"
          onClick={share}
          aria-label="Compartilhar"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#EAEAE6] bg-[#F4F4F2]"
        >
          <ShareIcon className="size-4" />
        </button>
      </div>

      <section className="flex flex-col gap-5 px-5 pt-7 lg:gap-8 lg:px-16 lg:pt-6">
        <div className="hidden items-center justify-between lg:flex">
          <button
            type="button"
            onClick={goBack}
            className="group flex cursor-pointer items-center gap-2.5 text-[15px] leading-[18px] font-semibold"
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-[#D6D6D1] transition-colors group-hover:border-[#1A1A1A]">
              <ArrowIcon direction="left" className="size-4" />
            </span>
            Voltar aos resultados
          </button>
          <button
            type="button"
            onClick={share}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-[#D6D6D1] px-[18px] py-2.5 text-sm leading-[18px] font-semibold transition-colors hover:border-[#1A1A1A]"
          >
            <ShareIcon className="size-[15px]" />
            Compartilhar
          </button>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex flex-col gap-[18px] lg:gap-5">
            <p className="flex items-center gap-2 lg:gap-2.5">
              <span className="size-[7px] shrink-0 rounded-full bg-[#E8480C] lg:size-2" />
              <span className={eyebrowClassName}>
                <span className="hidden lg:inline">Detalhes do voo · </span>
                Só ida · {formatShortDate(flight.departureTime, true)}
              </span>
            </p>
            <h1 className="flex flex-wrap items-center gap-x-3 text-[46px] leading-12 font-extrabold tracking-[-0.055em] lg:gap-x-5 lg:text-[80px] lg:leading-20">
              <span className="flex items-center gap-3 lg:gap-5">
                {flight.departureCity}
                <ArrowIcon className="size-[30px] shrink-0 text-[#E8480C] lg:size-14" />
              </span>
              <span className="text-[#E8480C]">{flight.arrivalCity}</span>
            </h1>
          </div>

          <div className="flex items-center gap-3.5 rounded-[20px] bg-[#F4F4F2] py-3.5 pr-5 pl-3.5 lg:mb-1 lg:rounded-3xl">
            <AirlineBadge
              code={flight.carrierCode}
              className="size-10 border-0 bg-white text-[13px] leading-4 lg:size-12 lg:text-sm"
            />
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="text-[17px] leading-[22px] font-bold">{flight.airline}</span>
              <span className="text-[13px] leading-4 text-[#5C5C58]">{subtitle}</span>
            </div>
            <span className="rounded-full bg-[#FFEDE4] px-2.5 py-[5px] text-[11px] leading-[14px] font-bold tracking-[0.14em] text-[#C23A07] uppercase lg:ml-3">
              {stopsTag}
            </span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-9 px-5 pt-9 lg:flex-row lg:items-start lg:gap-16 lg:px-16 lg:pt-16 lg:pb-30">
        <div className="flex flex-1 flex-col gap-9 lg:gap-18">
          <div className="flex flex-col gap-6 border-t border-[#1A1A1A] pt-[18px] lg:gap-9 lg:pt-6">
            <SectionTitle aside={`${duration} no total`}>01 — Itinerário</SectionTitle>

            <div className="hidden items-start gap-8 lg:flex">
              <div className="flex w-55 shrink-0 flex-col gap-2">
                <span className="flex items-baseline gap-2.5">
                  <span className="text-[56px] leading-14 font-extrabold tracking-[-0.045em]">
                    {departure.time}
                  </span>
                  <span className="text-sm leading-[18px] font-semibold tracking-[0.12em] text-[#5C5C58]">
                    {departure.code}
                  </span>
                </span>
                <span className="text-[17px] leading-[22px] font-semibold">{departure.place}</span>
                <span className="text-sm leading-[18px] text-[#5C5C58]">{departure.detail}</span>
              </div>

              <div className="flex flex-1 flex-col gap-4 pt-[18px]">
                <span className="flex items-center gap-2">
                  <span className="size-3 shrink-0 rounded-full border-2 border-[#1A1A1A] bg-white" />
                  <span className="h-0 flex-1 border-t-2 border-dashed border-[#1A1A1A]" />
                  <PlaneIcon className="size-6 shrink-0" />
                  <span className="h-0 flex-1 border-t-2 border-dashed border-[#1A1A1A]" />
                  <span className="size-3 shrink-0 rounded-full bg-[#E8480C]" />
                </span>
                <span className="flex flex-col items-center gap-1 self-center rounded-[14px] border border-[#EAEAE6] px-5 py-3 text-center">
                  <span className="text-[15px] leading-5 font-bold">
                    {stopsSummary(flight.stops)} · {duration}
                  </span>
                  <span className="text-[13px] leading-4 text-[#5C5C58]">{legDetail}</span>
                </span>
              </div>

              <div className="flex w-55 shrink-0 flex-col items-end gap-2 text-right">
                <span className="flex items-baseline gap-2.5">
                  <span className="text-sm leading-[18px] font-semibold tracking-[0.12em] text-[#5C5C58]">
                    {arrival.code}
                  </span>
                  <span className="text-[56px] leading-14 font-extrabold tracking-[-0.045em]">
                    {arrival.time}
                  </span>
                  {offset > 0 && (
                    <span className="self-start text-sm leading-[18px] font-bold text-[#E8480C]">
                      +{offset}
                    </span>
                  )}
                </span>
                <span className="text-[17px] leading-[22px] font-semibold">{arrival.place}</span>
                <span className="text-sm leading-[18px] text-[#5C5C58]">{arrival.detail}</span>
              </div>
            </div>

            <div className="relative flex flex-col gap-5 pl-[30px] lg:hidden">
              <span className="absolute top-2 left-0 size-3 rounded-full border-2 border-[#1A1A1A] bg-white" />
              <span className="absolute top-5 bottom-5 left-[5px] border-l-2 border-dashed border-[#1A1A1A]" />
              <span className="absolute bottom-2 left-0 size-3 rounded-full bg-[#E8480C]" />
              {[
                { ...departure, offset: 0 },
                null,
                { ...arrival, offset },
              ].map((point, index) =>
                point ? (
                  <div key={point.code + index} className="flex flex-col gap-1">
                    <span className="flex items-baseline gap-2.5">
                      <span className="text-[34px] leading-9 font-extrabold tracking-[-0.045em]">
                        {point.time}
                      </span>
                      {point.offset > 0 && (
                        <span className="self-start text-xs leading-4 font-bold text-[#E8480C]">
                          +{point.offset}
                        </span>
                      )}
                      <span className="text-[13px] leading-4 font-semibold tracking-[0.12em] text-[#5C5C58]">
                        {point.code}
                      </span>
                    </span>
                    <span className="text-[15px] leading-5 font-semibold">{point.place}</span>
                    <span className="text-[13px] leading-4 text-[#5C5C58]">{point.detail}</span>
                  </div>
                ) : (
                  <div
                    key="leg"
                    className="flex items-center gap-3 rounded-[14px] border border-[#EAEAE6] px-4 py-3"
                  >
                    <PlaneIcon className="size-5 shrink-0 rotate-90" />
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[15px] leading-5 font-bold">
                        {stopsSummary(flight.stops)} · {duration}
                      </span>
                      <span className="text-[13px] leading-4 text-[#5C5C58]">{legDetail}</span>
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-[#1A1A1A] pt-[18px] lg:gap-8 lg:pt-6">
            <SectionTitle>02 — Bagagem</SectionTitle>
            <div className="flex flex-col lg:flex-row">
              {baggage.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex items-center gap-3.5 border-[#EAEAE6] py-4 lg:flex-1 lg:flex-col lg:items-start lg:py-0 ${
                    index > 0 ? "border-t lg:border-t-0 lg:border-l lg:pl-7" : ""
                  } ${index < baggage.length - 1 ? "lg:pr-7" : ""}`}
                >
                  <svg viewBox="0 0 24 24" className="size-5 shrink-0 lg:size-7" aria-hidden="true">
                    <path
                      d={item.icon}
                      fill="none"
                      stroke="#1A1A1A"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="flex flex-1 flex-col gap-0.5 lg:gap-1">
                    <span className="text-base leading-5 font-bold lg:text-[17px] lg:leading-[22px]">
                      {item.title}
                    </span>
                    <span className="text-[13px] leading-[17px] text-[#5C5C58] lg:text-sm lg:leading-5">
                      {item.description}
                    </span>
                  </span>
                  <span
                    className={`text-right text-[13px] leading-[18px] font-bold lg:text-left lg:text-sm ${
                      item.included === true
                        ? "text-[#1F7A55]"
                        : item.included === false
                          ? "text-[#1A1A1A]"
                          : "font-medium text-[#5C5C58]"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#1A1A1A] pt-[18px] lg:hidden">
            {priceSummary}
          </div>
        </div>

        <aside className="hidden w-105 shrink-0 flex-col rounded-3xl border-[1.5px] border-[#1A1A1A] bg-white lg:flex">
          {priceSummary}
        </aside>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-[#EAEAE6] bg-white px-5 pt-4 pb-6 lg:hidden">
        <span className="flex flex-col gap-0.5">
          <span className="text-xs leading-4 text-[#5C5C58]">Total · {adultsLabel}</span>
          <span className="text-2xl leading-7 font-extrabold tracking-[-0.04em]">
            {formatoBrlInteiro(flight.price)}
          </span>
        </span>
        <button
          type="button"
          onClick={book}
          className="flex h-14 flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[14px] bg-[#E8480C] text-base leading-5 font-bold text-white"
        >
          Reservar voo
          <ArrowIcon className="size-4" />
        </button>
      </div>
    </main>
  );
}

export default FlightDetails;
