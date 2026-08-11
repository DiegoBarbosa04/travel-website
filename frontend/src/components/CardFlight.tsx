import { Clock, Heart } from "lucide-react";
import { Button } from "./ui/button";
import type { FlightCardForm } from "@/schemas/flight.schema";
import { formatDateTime, formatDuration } from "@/utils/formatTime";
import planeIcon from "../assets/planeforflights.svg";
import { formatoBrl } from "@/utils/formatCurrency";

function CardFlight({
  id,
  price,
  airline,
  departureCity,
  arrivalCity,
  carrierCode,
  logo,
  departureTime,
  arrivalTime,
  origin,
  destination,
  currency,
  duration,
}: FlightCardForm) {
  return (
    <div className="flex bg-white rounded-lg overflow-hidden w-full">
      <div className="flex flex-col bg-white p-6 gap-5 flex-1">
        <div className="flex justify-between items-center gap-3 w-full">
          <div className="flex items-center gap-3">
            <img src={logo} alt={carrierCode} className="w-10 h-10" />
            <h1 className="text-xl font-bold">{airline}</h1>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={18} className="text-gray-500" />
            <p className="text-sm text-gray-600">
              Duração de {formatDuration(duration)}
            </p>
          </div>
        </div>

        <div className="flex justify-between gap-2 items-center w-full">
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-gray-500">
              {departureCity} ({origin})
            </p>
            <h3 className="text-lg font-semibold">
              {formatDateTime(departureTime)}
            </h3>
          </div>

          <div className="flex items-center justify-center">
            <img src={planeIcon} alt="Plane" className="w-32" />
          </div>

          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-gray-500">
              {arrivalCity} ({destination})
            </p>
            <h3 className="text-lg font-semibold">
              {formatDateTime(arrivalTime)}
            </h3>
          </div>
        </div>
      </div>

      <div className="h-full border border-dashed"></div>

      <div className="flex flex-col items-center justify-between p-6 gap-4 min-w-max">
        <h2 className="text-3xl font-bold text-[#8DD3BB]">
          {formatoBrl(price)}
        </h2>

        <div className="flex items-center gap-3">
          <Button className="bg-[#8DD3BB] text-[#112211] hover:bg-[#7BB8A8] font-semibold px-6 py-5">
            Ver detalhes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CardFlight;
