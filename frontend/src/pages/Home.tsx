import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CardPopularDestination from "@/components/CardPopularDestination";
import ReviewCards from "@/components/ReviewCards";
import melborneImage from "@/assets/melbourne.png";
import parisImage from "@/assets/paris.png";
import londonImage from "../assets/london.png";
import columbiaImage from "@/assets/columbia.png";
import { Button } from "@/components/ui/button";
import PartnerCompanies from "@/components/PartnerCompanies";

function Home() {
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <Header />
      <Hero />

      <section className="px-32 mt-43 flex flex-col gap-8 justify-around">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Destinos Populares</h1>
            <p className="text-[#112211] opacity-70 max-w-[90ch]">
              Descubra os destinos mais populares para suas próximas férias.
              Explore cidades vibrantes, praias paradisíacas e paisagens
              deslumbrantes ao redor do mundo.
            </p>
          </div>

          <div>
            <Button className="bg-[#FAFBFC] text-[#112211] border border-[#8DD3BB] hover:bg-[#8DD3BB] px-4 py-5 cursor-pointer">
              Ver todos
            </Button>
          </div>
        </div>
        <div className="flex gap-4 justify-between">
          <CardPopularDestination
            title="Melborne"
            description="Uma jornada espetacular"
            price={800}
            imageUrl={melborneImage}
          />
          <CardPopularDestination
            title="Paris"
            description="Uma aventura em Paris"
            price={600}
            imageUrl={parisImage}
          />
          <CardPopularDestination
            title="Londres"
            description="Uma viagem inesquecível"
            price={800}
            imageUrl={londonImage}
          />
          <CardPopularDestination
            title="Columbia"
            description="Ruas espetaculares"
            price={900}
            imageUrl={columbiaImage}
          />
        </div>
      </section>

      <section className="px-32 py-24 space-y-4 mt-4">
        <h2 className="text-3xl font-bold">Nossos parceiros</h2>
        <PartnerCompanies />
      </section>

      <section className="px-32 pb-24 mb-18">
        <h2 className="text-3xl font-bold mb-8">Avaliações</h2>

        <ReviewCards />
      </section>

      <Footer />
    </div>
  );
}

export default Home;
