import hero from "../assets/hero.webp";

import { Button } from "./ui/button";

import { Input } from "./ui/input";

import LocationAutocomplete from "./LocationAutocomplete";
import DatePickerField from "./DataPickerField";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  searchFlightSchema,
  type SearchFlightForm,
} from "@/schemas/flight.schema";
import { useNavigate } from "react-router";

import { format } from "date-fns";

function Hero() {
  const form = useForm<SearchFlightForm>({
    resolver: zodResolver(searchFlightSchema),
    defaultValues: {
      origin: "",
      destination: "",
      departureDate: undefined,
      adults: 1,
    },
  });

  const { handleSubmit } = form;
  const navigate = useNavigate();

  const onSubmit = (data: SearchFlightForm) => {
    const params = new URLSearchParams({
      origin: data.origin,
      destination: data.destination,
      departureDate: format(data.departureDate, "yyyy-MM-dd"),
      adults: data.adults.toString(),
    });

    navigate(`/flights?${params.toString()}`);
  };

  return (
    <section className="px-32">
      <div className="relative w-full h-150 rounded-b-2xl overflow-visible">
        <img
          src={hero}
          alt="Hero"
          className="w-full h-full object-cover rounded-b-2xl brightness-80"
        />

        <div className="absolute left-1/2 -bottom-20 -translate-x-1/2 w-5xl rounded-xl bg-white shadow-xl p-8">
          <form
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-6">
                Para onde você quer ir?
              </h2>

              <div className="flex flex-wrap gap-4">
                <div className="min-w-45 flex-1">
                  <LocationAutocomplete
                    control={form.control}
                    name="origin"
                    label="Origem"
                    placeholder="Digite uma cidade"
                  />
                </div>

                <div className="min-w-45 flex-1">
                  <LocationAutocomplete
                    control={form.control}
                    name="destination"
                    label="Destino"
                    placeholder="Digite uma cidade"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#112211]">
                    Adultos
                  </label>
                  <Input
                    className="h-11 w-14 justify-between rounded-md border border-[#CCCCCC] bg-white px-3 text-left font-normal"
                    type="number"
                    {...form.register("adults", {
                      valueAsNumber: true,
                    })}
                  />
                </div>

                <div>
                  <DatePickerField
                    control={form.control}
                    name="departureDate"
                    label="Data"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="bg-[#8DD3BB] text-[#112211] font-medium px-8 py-6 rounded-full hover:bg-[#7BC0A8]"
            >
              Buscar voos
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Hero;
