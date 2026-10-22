import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  searchFlightSchema,
  type SearchFlightForm,
} from "@/schemas/flight.schema";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "./ui/button";
import LocationAutocomplete from "./LocationAutocomplete";
import DatePickerField from "./DataPickerField";
import { Spinner } from "./ui/spinner";
import { cn } from "@/lib/utils";

type SearchFlightCardProps = {
  defaultValues?: Partial<SearchFlightForm>;
  originLabel?: string;
  destinationLabel?: string;
  isLoading?: boolean;
  onSearchStart?: () => void;
  // hero: busca da Home · bar: barra única nos resultados · sheet: folha mobile, sempre empilhada e com o botão fora (via formId)
  variant?: "hero" | "bar" | "sheet";
  formId?: string;
};

function SearchFlightCard({
  defaultValues,
  originLabel,
  destinationLabel,
  isLoading = false,
  onSearchStart,
  variant = "hero",
  formId,
}: SearchFlightCardProps) {
  const form = useForm<SearchFlightForm>({
    resolver: zodResolver(searchFlightSchema),
    defaultValues: {
      origin: "",
      destination: "",
      departureDate: undefined,
      adults: 1,
      ...defaultValues,
    },
  });

  const [labels, setLabels] = useState({
    origin: originLabel ?? defaultValues?.origin ?? "",
    destination: destinationLabel ?? defaultValues?.destination ?? "",
  });

  // Remonta os autocompletes ao inverter origem/destino para refletir os novos rótulos.
  const [swapCount, setSwapCount] = useState(0);

  const { handleSubmit } = form;
  const navigate = useNavigate();

  const onSubmit = (data: SearchFlightForm) => {
    const params = new URLSearchParams({
      origin: data.origin,
      destination: data.destination,
      departureDate: format(data.departureDate, "yyyy-MM-dd"),
      adults: data.adults.toString(),
    });

    if (labels.origin) {
      params.set("originName", labels.origin);
    }

    if (labels.destination) {
      params.set("destinationName", labels.destination);
    }

    const nextSearch = `?${params.toString()}`;

    if (nextSearch === window.location.search) {
      return;
    }

    onSearchStart?.();

    navigate(`/flights${nextSearch}`);
  };

  const swapLocations = () => {
    const { origin, destination } = form.getValues();
    form.setValue("origin", destination);
    form.setValue("destination", origin);
    setLabels((prev) => ({
      origin: prev.destination,
      destination: prev.origin,
    }));
    setSwapCount((count) => count + 1);
  };

  const isBar = variant === "bar";
  const isSheet = variant === "sheet";

  return (
    <form
      id={formId}
      className={cn(
        "flex flex-col gap-2.5 lg:gap-3",
        variant === "hero" && "pt-2 lg:pt-0",
        isBar && "lg:flex-row",
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      {variant === "hero" && (
        <h2 className="text-[11px] leading-4 font-semibold tracking-[0.18em] text-[#5C5C58] uppercase lg:text-xs">
          Para onde você quer ir?
        </h2>
      )}

      <div
        className={cn(
          "relative flex flex-col rounded-[14px] border border-[#D6D6D1]",
          !isSheet && "md:flex-row",
          isBar && "lg:flex-1",
        )}
      >
        <LocationAutocomplete
          key={`origin-${swapCount}`}
          control={form.control}
          name="origin"
          label="Origem"
          placeholder="Digite uma cidade"
          variant="field"
          className={cn(
            "min-w-0 border-b border-[#D6D6D1] pr-14",
            !isSheet && "md:flex-1 md:border-r md:border-b-0 md:pr-0",
          )}
          initialLabel={labels.origin}
          onSelectLabel={(label) =>
            setLabels((prev) => ({ ...prev, origin: label }))
          }
        />
        <LocationAutocomplete
          key={`destination-${swapCount}`}
          control={form.control}
          name="destination"
          label="Destino"
          placeholder="Digite uma cidade"
          variant="field"
          className={cn("min-w-0 pr-14", !isSheet && "md:flex-1 md:pr-0 md:pl-3")}
          initialLabel={labels.destination}
          onSelectLabel={(label) =>
            setLabels((prev) => ({ ...prev, destination: label }))
          }
        />
        <button
          type="button"
          onClick={swapLocations}
          aria-label="Inverter origem e destino"
          className={cn(
            "absolute top-[52px] right-4 flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#D6D6D1] bg-white transition-colors hover:border-[#E8480C]",
            !isSheet && "md:top-4 md:right-auto md:left-1/2 md:-translate-x-1/2",
            isBar && "lg:top-3.5",
          )}
        >
          <svg
            viewBox="0 0 24 24"
            className={cn("size-4", !isSheet && "md:rotate-90")}
            aria-hidden="true"
          >
            <path
              d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3"
              fill="none"
              stroke="#E8480C"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        className={cn(
          "flex flex-wrap gap-2.5 lg:flex-nowrap lg:gap-3",
          isBar && "lg:contents",
        )}
      >
        <DatePickerField
          control={form.control}
          name="departureDate"
          label="Data"
          variant="field"
          className={cn("min-w-0 flex-1", isBar && "lg:w-50 lg:flex-none lg:shrink-0")}
        />
        <label className="flex w-29 shrink-0 cursor-text flex-col gap-1 rounded-[14px] border border-[#D6D6D1] px-[18px] py-3.5 transition-colors focus-within:border-[#E8480C] focus-within:ring-4 focus-within:ring-[#FFEDE4] lg:w-30 lg:px-5 lg:py-4">
          <span className="text-[13px] leading-4 font-semibold text-[#5C5C58]">
            Adultos
          </span>
          <input
            type="number"
            min={1}
            className="w-full bg-transparent text-base leading-5 font-semibold text-[#1A1A1A] outline-none"
            {...form.register("adults", { valueAsNumber: true })}
          />
        </label>
        {!isSheet && (
          <Button
            type="submit"
            disabled={isLoading}
            className="h-14 w-full gap-2.5 rounded-[14px] bg-[#E8480C] text-base font-bold text-white hover:bg-[#B8360A] lg:h-auto lg:w-50 lg:shrink-0"
          >
            {isLoading ? (
              <Spinner className="size-5 text-white" />
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M20 20l-3.5-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                {isBar ? "Atualizar busca" : "Pesquisar voos"}
              </>
            )}
          </Button>
        )}
      </div>
    </form>
  );
}

export default SearchFlightCard;
