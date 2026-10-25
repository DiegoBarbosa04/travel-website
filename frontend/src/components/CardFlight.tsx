import { Link } from "react-router";
import type { FlightCardForm } from "@/schemas/flight.schema";
import { dayOffset, formatDuration, formatTime } from "@/utils/formatTime";
import { formatoBrlInteiro } from "@/utils/formatCurrency";
import { flightSubtitle, stopsLabel } from "@/utils/flightLabels";
import { cn } from "@/lib/utils";

type CardFlightProps = {
  flight: FlightCardForm;
  cheapest?: boolean;
  detailsState?: unknown;
};

export function PlaneIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
        transform="rotate(90 12 12)"
        fill="#E8480C"
      />
    </svg>
  );
}

export function AirlineBadge({
  code,
  className,
}: {
  code: string;
  className: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border border-[#EAEAE6] bg-[#F4F4F2] font-extrabold tracking-[0.02em] text-[#1A1A1A] ${className}`}
    >
      {code}
    </span>
  );
}

function ArrowIcon({ className }: { className: string }) {
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

function CardFlight({ flight, cheapest = false, detailsState }: CardFlightProps) {
  const offset = dayOffset(flight.departureTime, flight.arrivalTime);
  const subtitle = flightSubtitle(flight.flightNumber, flight.cabin);

  return (
    <article
      className={`group flex flex-col rounded-3xl bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_#1A1A1A40] lg:flex-row ${
        cheapest ? "border-[1.5px] border-[#1A1A1A]" : "border border-[#E2E2DD] lg:border-[#D6D6D1]"
      }`}
    >
      <div className="flex flex-col lg:flex-1 lg:flex-row lg:items-center lg:gap-8 lg:px-8 lg:py-7">
        <div className="flex items-center justify-between px-[18px] pt-[18px] lg:w-47.5 lg:shrink-0 lg:p-0">
          <div className="flex items-center gap-2.5 lg:gap-3.5">
            <AirlineBadge code={flight.carrierCode} className="size-10 text-[13px] leading-4 lg:size-12 lg:text-sm lg:leading-[18px]" />
            <div className="flex min-w-0 flex-col gap-px lg:gap-0.5">
              <span className="text-base leading-5 font-bold text-[#1A1A1A] lg:text-[17px] lg:leading-[22px]">
                {flight.airline}
              </span>
              <span className="text-xs leading-[15px] text-[#5C5C58] lg:text-[13px] lg:leading-4">
                {subtitle}
              </span>
            </div>
          </div>
          {cheapest && <CheapestTag className="lg:hidden" />}
        </div>

        <div className="flex items-center gap-2.5 p-[18px] lg:flex-1 lg:gap-5 lg:p-0">
          <div className="flex w-19.5 shrink-0 flex-col gap-0.5 lg:w-21">
            <span className="text-2xl leading-7 font-extrabold tracking-[-0.03em] text-[#1A1A1A] lg:text-[28px] lg:leading-8">
              {formatTime(flight.departureTime)}
            </span>
            <span className="text-xs leading-[15px] font-semibold tracking-[0.12em] text-[#5C5C58] lg:text-[13px] lg:leading-4">
              {flight.origin}
            </span>
          </div>

          <div className="flex flex-1 flex-col items-center gap-1.5 lg:gap-2">
            <span className="text-xs leading-[15px] text-[#5C5C58] lg:text-[13px] lg:leading-4">
              {formatDuration(flight.duration)}
            </span>
            <span className="flex w-full items-center gap-1 lg:gap-1.5">
              <span className="size-[7px] shrink-0 rounded-full border-[1.5px] border-[#1A1A1A]" />
              <span className="h-px flex-1 bg-[#1A1A1A]" />
              <PlaneIcon className="size-4 shrink-0 transition-transform duration-500 group-hover:translate-x-1 lg:size-[18px]" />
            </span>
            <span className="text-xs leading-[15px] font-semibold text-[#1A1A1A] lg:text-[13px] lg:leading-4">
              {stopsLabel(flight.stops)}
            </span>
          </div>

          <div className="flex w-19.5 shrink-0 flex-col items-end gap-0.5 lg:w-21">
            <span className="flex items-start gap-0.5">
              <span className="text-2xl leading-7 font-extrabold tracking-[-0.03em] text-[#1A1A1A] lg:text-[28px] lg:leading-8">
                {formatTime(flight.arrivalTime)}
              </span>
              {offset > 0 && (
                <span className="text-[10px] leading-3 font-bold text-[#E8480C] lg:text-[11px] lg:leading-[14px]">
                  +{offset}
                </span>
              )}
            </span>
            <span className="text-xs leading-[15px] font-semibold tracking-[0.12em] text-[#5C5C58] lg:text-[13px] lg:leading-4">
              {flight.destination}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t-[1.5px] border-dashed border-[#D6D6D1] px-[18px] pt-3.5 pb-[18px] lg:w-60 lg:shrink-0 lg:flex-col lg:items-stretch lg:justify-center lg:gap-3.5 lg:border-t-0 lg:border-l-[1.5px] lg:px-8 lg:py-7">
        <div className="flex flex-col gap-0.5 lg:gap-1">
          {cheapest && <CheapestTag className="mb-2 hidden self-start lg:flex" />}
          <span className="text-xs leading-[15px] text-[#5C5C58] lg:text-[13px] lg:leading-4">
            a partir de
          </span>
          <span className="text-[26px] leading-[30px] font-extrabold tracking-[-0.035em] text-[#1A1A1A] lg:text-[32px] lg:leading-9">
            {formatoBrlInteiro(flight.price)}
          </span>
        </div>
        <Link
          to={`/flights/${flight.id}`}
          state={detailsState}
          className={`flex h-11 items-center justify-center gap-2 rounded-xl px-[18px] text-sm leading-[18px] font-bold transition-colors lg:text-[15px] ${
            cheapest
              ? "bg-[#E8480C] text-white hover:bg-[#B8360A]"
              : "border border-[#D6D6D1] bg-white text-[#1A1A1A] hover:border-[#1A1A1A]"
          }`}
        >
          Ver detalhes
          <ArrowIcon className="size-[15px] lg:size-4" />
        </Link>
      </div>
    </article>
  );
}

function CheapestTag({ className }: { className: string }) {
  return (
    <span
      className={cn(
        "flex items-center gap-1.5 rounded-full bg-[#FFEDE4] px-2.5 py-1 text-[11px] leading-[14px] font-bold tracking-[0.14em] text-[#C23A07] uppercase",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-[#E8480C]" />
      Mais barato
    </span>
  );
}

export default CardFlight;
