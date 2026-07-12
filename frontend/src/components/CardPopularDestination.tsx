import { Button } from "./ui/button";

interface CardPopularDestinationProps {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

function CardPopularDestination({
  title,
  description,
  price,
  imageUrl,
}: CardPopularDestinationProps) {
  return (
    <div
      className="w-74 h-105 rounded-2xl bg-cover bg-center flex flex-col justify-end px-4 py-6 gap-2"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-white font-light text-sm opacity-80">
            {description}
          </p>
        </div>
        <div>
          <span className="font-bold text-2xl text-white">R$ {price}</span>
        </div>
      </div>
      <Button className="text-[#112211] bg-[#8DD3BB] h-12 hover:bg-[#7BC0A8] font-semibold font-lg cursor-pointer">
        Reservar voo
      </Button>
    </div>
  );
}

export default CardPopularDestination;
