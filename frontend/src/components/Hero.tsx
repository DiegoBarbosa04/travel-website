import hero from "../assets/hero.webp";
import SearchFlightCard from "./SearchFlightForm";

function Hero() {
  return (
    <section className="conteudo pb-20">
      <div className="relative w-full h-125 rounded-b-2xl overflow-visible">
        <img
          src={hero}
          alt="Hero"
          className="w-full h-full object-cover rounded-b-2xl brightness-80"
        />

        <div className="absolute left-1/2 -bottom-20 -translate-x-1/2 w-[min(860px,calc(100%-2rem))]">
          <SearchFlightCard />
        </div>
      </div>
    </section>
  );
}

export default Hero;