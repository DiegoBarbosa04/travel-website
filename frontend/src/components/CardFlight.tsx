import { Clock, MoveLeft, MoveRight, Star } from "lucide-react";
import PlaneIcon from "../assets/plane.svg";
import { Button } from "./ui/button";
import type { FlightCardForm } from "@/schemas/flight.schema";
import { formatDateTime, formatDuration } from "@/utils/format";

function CardFlight({
  id,
  price,
  airlineCode,
  carrierName,
  departureTime,
  arrivalTime,
  origin,
  destination,
  currency,
  duration,
}: FlightCardForm) {
  return (
    <div className="flex flex-col justify-center items-center bg-white h-70 rounded-lg p-6 gap-8">
      <div className="flex justify-between items-center w-full">
        <p>{airlineCode}</p>
        <h1 className="text-xl font-bold">{carrierName}</h1>
        <h2 className="text-2xl font-bold">€ {price}</h2>
      </div>
      <div className="flex w-full items-center gap-2">
        <p>Duração de{formatDuration(duration)}</p>
        <Clock size={20} />
        {/* <p>{formatDateTime(arrivalTime)}</p> */}
      </div>
      <div className="flex justify-between items-center gap-2 w-full">
        <div className="flex justify-center items-center gap-2">
          <h3 className="text-lg font-semibold">
            {formatDateTime(departureTime)}
          </h3>
          <p>({origin})</p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <MoveLeft size={30} />
          <img src={PlaneIcon} alt="plane" className="w-10 h-10" />
          <MoveRight size={30} />
        </div>
        <div className="flex justify-center items-center gap-2">
          <h3 className="text-lg font-semibold">
            {formatDateTime(arrivalTime)}
          </h3>
          <p>({destination})</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 w-full px-6">
        <div className="flex justify-center items-center gap-2 border border-[#8DD3BB] rounded-lg p-2 group transition cursor-pointer hover:bg-yellow-100 hover:border-yellow-500">
          <Star
            size={20}
            className="text-yellow-500 fill-transparent transition-colors duration-300 group-hover:stroke-yellow-500 group-hover:fill-yellow-500"
          />
        </div>

        <Button className="w-full h-10 bg-[#8DD3BB] text-[#112211] hover:bg-[#7BB8A8] font-semibold text-lg">
          Comprar
        </Button>
      </div>
    </div>
  );
}

export default CardFlight;
