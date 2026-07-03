import CardFlight from "@/components/CardFlight";
import Header from "@/components/Header";

function Flights() {
  return (
    <div className="min-h-screen h-screen bg-[#FAFBFC]">
      <Header />
      <div className="flex w-full h-screen">
        <div className="flex-1 bg-red-600"></div>
        <div className="flex flex-col flex-2 bg-blue-700 px-4 gap-4 justify-center items-center">
          <CardFlight />
          <CardFlight />
          <CardFlight />
          <CardFlight />
          <CardFlight />
        </div>
      </div>
    </div>
  );
}

export default Flights;
