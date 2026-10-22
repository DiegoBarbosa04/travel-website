import {
  MAX_PRICE,
  timeRanges,
  type FlightFilters,
  type TimeRangeKey,
} from "@/utils/filterFlights";
import { formatoBrlInteiro } from "@/utils/formatCurrency";

interface FilterPanelProps {
  filters: FlightFilters;
  onChange: (filters: FlightFilters) => void;
  airlineCounts: [string, number][];
}

const sectionTitleClassName =
  "text-lg leading-6 font-bold text-[#1A1A1A]";

function FilterPanel({ filters, onChange, airlineCounts }: FilterPanelProps) {
  const toggleAirline = (airline: string) => {
    onChange({
      ...filters,
      airlines: filters.airlines.includes(airline)
        ? filters.airlines.filter((selected) => selected !== airline)
        : [...filters.airlines, airline],
    });
  };

  const toggleTime = (key: TimeRangeKey) => {
    onChange({
      ...filters,
      times: filters.times.includes(key)
        ? filters.times.filter((selected) => selected !== key)
        : [...filters.times, key],
    });
  };

  const pricePercent = (filters.maxPrice / MAX_PRICE) * 100;

  return (
    <div className="flex flex-col gap-6 lg:gap-9">
      <div className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <span className={sectionTitleClassName}>Preço máximo</span>
          <span className="text-lg leading-6 font-extrabold tracking-[-0.02em] text-[#E8480C]">
            {filters.maxPrice >= MAX_PRICE
              ? "Sem limite"
              : formatoBrlInteiro(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={MAX_PRICE}
          step={100}
          value={filters.maxPrice}
          aria-label="Preço máximo"
          onChange={(event) =>
            onChange({ ...filters, maxPrice: Number(event.target.value) })
          }
          className="price-range h-5 w-full cursor-pointer appearance-none bg-transparent"
          style={{ "--range-progress": `${pricePercent}%` } as React.CSSProperties}
        />
        <div className="flex justify-between text-[13px] leading-4 text-[#5C5C58]">
          <span>R$ 0</span>
          <span>{formatoBrlInteiro(MAX_PRICE)}</span>
        </div>
      </div>

      {airlineCounts.length > 0 && (
        <div className="flex flex-col gap-3.5 border-t border-[#EAEAE6] pt-7">
          <span className={`${sectionTitleClassName} pb-0.5`}>Companhias</span>
          {airlineCounts.map(([airline, count]) => {
            const checked = filters.airlines.includes(airline);
            return (
              <label
                key={airline}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAirline(airline)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`flex size-5 shrink-0 items-center justify-center rounded-[5px] peer-focus-visible:ring-2 peer-focus-visible:ring-[#E8480C]/40 ${
                    checked
                      ? "bg-[#1A1A1A]"
                      : "border-[1.5px] border-[#D6D6D1] bg-white"
                  }`}
                >
                  {checked && (
                    <svg viewBox="0 0 24 24" className="size-3">
                      <path
                        d="M5 12.5l4.5 4.5L19 7.5"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="flex-1 text-[15px] leading-5 font-medium text-[#1A1A1A]">
                  {airline}
                </span>
                <span className="text-[13px] leading-4 text-[#5C5C58]">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-[#EAEAE6] pt-7">
        <span className={sectionTitleClassName}>Horário de partida</span>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(timeRanges) as TimeRangeKey[]).map((key) => {
            const selected = filters.times.includes(key);
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleTime(key)}
                className={`flex cursor-pointer flex-col gap-0.5 rounded-xl border px-3.5 py-3 text-left transition-colors ${
                  selected
                    ? "border-[#1A1A1A] bg-[#1A1A1A]"
                    : "border-[#D6D6D1] hover:border-[#1A1A1A]"
                }`}
              >
                <span
                  className={`text-[15px] leading-5 font-semibold ${selected ? "text-white" : "text-[#1A1A1A]"}`}
                >
                  {timeRanges[key].label}
                </span>
                <span
                  className={`text-[13px] leading-4 ${selected ? "text-[#BDBDB8]" : "text-[#5C5C58]"}`}
                >
                  {timeRanges[key].hint}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
