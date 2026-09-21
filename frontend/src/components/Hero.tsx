import hero from "../assets/hero.webp";
import SearchFlightCard from "./SearchFlightForm";

function Hero() {
  return (
    <section className="px-32">
      <div className="relative w-full h-150 rounded-b-2xl overflow-visible">
        <img
          src={hero}
          alt="Hero"
          className="w-full h-full object-cover rounded-b-2xl brightness-80"
        />

        <div className="absolute left-1/2 -bottom-20 -translate-x-1/2 w-5xl">
          <SearchFlightCard />
        </div>
      </div>
    </section>
  );
}

export default Hero;