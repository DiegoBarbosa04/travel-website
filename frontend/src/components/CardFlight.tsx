import { MoveLeft, MoveRight, Star } from "lucide-react";
import PlaneIcon from "../assets/plane.svg";
import { Button } from "./ui/button";

function CardFlight() {
  return (
    <div className="flex flex-col justify-center items-center bg-white h-70 rounded-lg p-6 gap-8">
      <div className="flex justify-between items-center w-full">
        <p>logo</p>
        <h1 className="text-xl font-bold">Ida(LATAM)</h1>
        <h2 className="text-2xl font-bold">R$ 100</h2>
      </div>
      <div className="flex w-full justify-between items-center gap-2">
        <p>Retorno, qui, Dez 8</p>
        <p>2h 28m</p>
      </div>
      <div className="flex justify-between items-center gap-2 w-full">
        <div className="flex justify-center items-center gap-2">
          <h3 className="text-lg font-semibold">12:00pm</h3>
          <p>Newark(EWR)</p>
        </div>
        <div className="flex justify-center items-center gap-10">
          <MoveLeft size={30} />
          <img src={PlaneIcon} alt="plane" className="w-10 h-10" />
          <MoveRight size={30} />
        </div>
        <div className="flex justify-center items-center gap-2">
          <h3 className="text-lg font-semibold">12:00pm</h3>
          <p>Newark(EWR)</p>
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
