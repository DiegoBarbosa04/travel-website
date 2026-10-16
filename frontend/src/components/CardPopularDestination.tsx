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
    <div className="w-74 h-105 rounded-2xl bg-white border border-gray-primary flex flex-col justify-between px-4 py-6 gap-2 shadow-xl">
      <div className="w-full h-40 rounded-2xl flex items-center">
        <div
          style={{ backgroundImage: `url(${imageUrl})` }}
          className="w-full h-full bg-cover bg-center rounded-2xl"
        />
      </div>

      <div className="flex items-end justify-between">
        <div className="flex flex-col w-full gap-1">
          <div>
            <h2 className="text-3xl font-bold text-black">{title}</h2>
            <p className="text-black font-light text-sm">{description}</p>
          </div>
          <Button className="w-full text-white bg-blue-primary h-12 hover:bg-blue-secondary font-semibold font-lg cursor-pointer">
            Reservar voo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CardPopularDestination;
