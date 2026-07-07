import CardFlight from "@/components/CardFlight";
import Header from "@/components/Header";

function Flights() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] px-32">
      <Header />
      <div className="flex w-full h-full gap-4 py-40">
        <div className="flex-1 bg-red-600 border-r border-gray-300">
          <h1>Filtros</h1>
        </div>
        <div className="flex flex-col flex-2 bg-blue-700 px-4 gap-4 items-center">
          <div className="flex justify-between items-center w-full">
            <h1>Mostrando 50 voos</h1>
          </div>
          <CardFlight />
        </div>
      </div>
    </div>
  );
}

export default Flights;
