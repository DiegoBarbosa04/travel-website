import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";

interface FilterPanelProps {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      priceRange: [number, number];
      airlines: string[];
      time: {
        madrugada: boolean;
        manha: boolean;
        tarde: boolean;
        noite: boolean;
      };
    }>
  >;
  airlinesResults: string[];
}

function FilterPanel({ setFilters, airlinesResults }: FilterPanelProps) {
  const [priceRange, setPriceRange] = useState(5000);
  const [airlines, setAirlines] = useState<string[]>([]);
  const [time, setTime] = useState({
    madrugada: false,
    manha: false,
    tarde: false,
    noite: false,
  });

  useEffect(() => {
    setFilters({
      priceRange: [0, priceRange],
      airlines,
      time: time,
    });
  }, [priceRange, airlines, time, setFilters]);

  const handleAirlineChange = (airline: string) => {
    setAirlines((prev) =>
      prev.includes(airline)
        ? prev.filter((selectedAirline) => selectedAirline !== airline)
        : [...prev, airline],
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 w-full">
      <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-200">
        Filtros
      </h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Preço</h3>
        <p>Passagens até</p>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8DD3BB]"
          />
          <span className="text-lg font-semibold text-[#FF8682] min-w-fit">
            R$ {priceRange}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Companhias</h3>
        <div className="space-y-3">
          <div className="space-y-3">
            {Array.from(new Set(airlinesResults)).map((airline) => (
              <div key={airline} className="flex items-center gap-3">
                <Checkbox
                  id={airline}
                  checked={airlines.includes(airline)}
                  onCheckedChange={() => handleAirlineChange(airline)}
                />
                <label htmlFor={airline} className="cursor-pointer text-sm">
                  {airline}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Horário</h3>
        <div className="space-y-3">
          {[
            ["Madrugada", "madrugada"],
            ["Manhã", "manha"],
            ["Tarde", "tarde"],
            ["Noite", "noite"],
          ].map(([label, key]) => (
            <div key={key} className="flex items-center gap-3">
              <Checkbox
                id={key}
                checked={time[key as keyof typeof time]}
                onCheckedChange={(checked) =>
                  setTime((prev) => ({
                    ...prev,
                    [key]: checked === true,
                  }))
                }
              />
              <label htmlFor={key} className="cursor-pointer text-sm">
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
