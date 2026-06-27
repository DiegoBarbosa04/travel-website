import hero from "../assets/hero.webp";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";

function Home() {
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
  return (
    <div className="h-screen flex flex-col items-center gap-4 bg-[#FAFBFC] px-32">
      <Header />
      <div className="w-full h-150 rounded-b-lg overflow-hidden relative">
        <img
          className="w-full h-full object-cover rounded-b-lg brightness-80"
          src={hero}
          alt="hero"
        />
      </div>

      <div className="flex w-5xl shadow-md p-6 rounded-md bg-[#FFFFFF] absolute top-135 z-50 items-end">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-2xl font-bold mb-4">Para onde você quer ir?</h2>
          <div className="flex gap-4">
            <div className="flex">
              <Combobox items={frameworks}>
                <ComboboxInput
                  placeholder="Escolha um destino"
                  className={"h-11 w-45 rounded-md border border-[#CCCCCC]"}
                />
                <ComboboxContent className={"mt-2"}>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>

            <div>
              <Combobox items={frameworks}>
                <ComboboxInput
                  placeholder="Escolha um destino"
                  className={"h-11 w-45 rounded-md border border-[#CCCCCC]"}
                />
                <ComboboxContent className={"mt-2"}>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>

            <div>
              <Combobox items={frameworks}>
                <ComboboxInput
                  placeholder="Escolha um destino"
                  className={"h-11  w-45 rounded-md border border-[#CCCCCC]"}
                />
                <ComboboxContent className={"mt-2"}>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>

            <div>
              <Combobox items={frameworks}>
                <ComboboxInput
                  placeholder="Escolha um destino"
                  className={"h-11 w-45 rounded-md border border-[#CCCCCC]"}
                />
                <ComboboxContent className={"mt-2"}>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
          </div>
        </div>
        <Button
          className={
            "bg-[#8DD3BB] text-[#112211] font-medium text-md px-6 py-6 hover:bg-[#7BC0A8] rounded-full"
          }
        >
          Buscar voos
        </Button>
      </div>
    </div>
  );
}

export default Home;
