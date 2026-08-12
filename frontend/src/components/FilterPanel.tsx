import { useState } from "react";
import { Checkbox } from "./ui/checkbox";

function FilterPanel() {
  const [priceRange, setPriceRange] = useState(500);
  const [airlines, setAirlines] = useState({
    iberia: false,
    tap: false,
    american: false,
  });
  const [time, setTime] = useState<string>("");

  const handleAirlineChange = (airline: keyof typeof airlines) => {
    setAirlines((prev) => ({
      ...prev,
      [airline]: !prev[airline],
    }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 w-full">
      <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-200">
        Filtros
      </h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Preço</h3>
        <p>A partir de</p>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="1000"
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
          <div className="flex items-center gap-3">
            <Checkbox
              id="iberia"
              checked={airlines.iberia}
              onCheckedChange={() => handleAirlineChange("iberia")}
            />
            <label htmlFor="iberia" className="cursor-pointer text-sm">
              Iberia
            </label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="tap"
              checked={airlines.tap}
              onCheckedChange={() => handleAirlineChange("tap")}
            />
            <label htmlFor="tap" className="cursor-pointer text-sm">
              TAP
            </label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="american"
              checked={airlines.american}
              onCheckedChange={() => handleAirlineChange("american")}
            />
            <label htmlFor="american" className="cursor-pointer text-sm">
              American Airlines
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Horário</h3>
        <div className="space-y-3">
          {["Madrugada", "Manhã", "Tarde", "Noite"].map((timeOption) => (
            <div key={timeOption} className="flex items-center gap-3">
              <input
                type="radio"
                id={timeOption}
                name="time"
                value={timeOption}
                checked={time === timeOption}
                onChange={(e) => setTime(e.target.value)}
                className="w-4 h-4 accent-[#8DD3BB] cursor-pointer"
              />
              <label htmlFor={timeOption} className="cursor-pointer text-sm">
                {timeOption}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
