import hero from "../assets/hero.webp";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function Hero() {
  const frameworks = [
    "Russia",
    "Brasil",
    "Espanha",
    "França",
    "Itália",
    "Alemanha",
    "Japão",
    "China",
    "Austrália",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const navigate = useNavigate();

  const handleSearchFlights = () => {
    navigate("/flights");
    //console.log(data);
  };

  return (
    <section className="px-32">
      <div className="relative w-full h-150 rounded-b-2xl overflow-visible">
        <img
          src={hero}
          alt="Hero"
          className="w-full h-full object-cover rounded-b-2xl brightness-80"
        />

        {/* CARD DE BUSCA */}
        <div className="absolute left-1/2 -bottom-20 -translate-x-1/2 w-5xl rounded-xl bg-white shadow-xl p-8">
          <form
            className="flex justify-between items-end gap-8"
            onSubmit={handleSubmit(handleSearchFlights)}
          >
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-6">
                Para onde você quer ir?
              </h2>

              <div className="flex gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <Combobox key={item} items={frameworks}>
                    <ComboboxInput
                      placeholder="Escolha um destino"
                      className="h-11 w-45 rounded-md border border-[#CCCCCC]"
                    />

                    <ComboboxContent className="mt-2">
                      <ComboboxEmpty>Nenhum destino encontrado.</ComboboxEmpty>

                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                ))}
              </div>
            </div>

            <Button className="bg-[#8DD3BB] text-[#112211] font-medium px-8 py-6 rounded-full hover:bg-[#7BC0A8]">
              Buscar voos
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Hero;
