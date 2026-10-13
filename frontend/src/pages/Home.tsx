import Hero from "@/components/Hero";
import CardPopularDestination from "@/components/CardPopularDestination";
import ReviewCards from "@/components/ReviewCards";
import melborneImage from "@/assets/melbourne.png";
import parisImage from "@/assets/paris.png";
import londonImage from "../assets/london.png";
import columbiaImage from "@/assets/columbia.png";
import { Button } from "@/components/ui/button";
import PartnerCompanies from "@/components/PartnerCompanies";
import divisor from "@/assets/Divisor.png";

function Home() {
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Espaçamento vertical único entre todas as seções (--respiro-vertical). */}
      <main className="flex flex-col gap-(--respiro-vertical)">
        <Hero />

        <section className="conteudo space-y-4">
          <h2 className="fs-titulo">Nossos Parceiros</h2>
          <PartnerCompanies />
        </section>

        <section className="conteudo flex flex-col gap-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div className="flex flex-col gap-2">
              <h1 className="fs-titulo">Destinos Populares</h1>
              <p className="fs-descricao max-w-[90ch] text-[#112211] opacity-70">
                Descubra os destinos mais populares para suas próximas férias.
                Explore cidades vibrantes, praias paradisíacas e paisagens
                deslumbrantes ao redor do mundo.
              </p>
            </div>

            <div>
              <Button className="cursor-pointer bg-blue-primary px-4 py-5 text-white hover:bg-blue-secondary">
                Explorar Destinos <span aria-hidden="true">›</span>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex justify-center [&>div]:!w-full">
              <CardPopularDestination title="Melborne" description="Uma jornada espetacular" price={800} imageUrl={melborneImage} />
            </div>
            <div className="flex justify-center [&>div]:!w-full">
              <CardPopularDestination title="Paris" description="Uma aventura em Paris" price={600} imageUrl={parisImage} />
            </div>
            <div className="flex justify-center [&>div]:!w-full">
              <CardPopularDestination title="Londres" description="Uma viagem inesquecível" price={800} imageUrl={londonImage} />
            </div>
            <div className="flex justify-center [&>div]:!w-full">
              <CardPopularDestination title="Columbia" description="Ruas espetaculares" price={900} imageUrl={columbiaImage} />
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden pt-28">
          <img
            src={divisor}
            alt=""
            aria-hidden="true"
            className="absolute left-0 top-0 h-auto w-full"
          />
          <div className="conteudo relative space-y-4">
            <h2 className="fs-titulo text-center">Avaliações</h2>
            <ReviewCards />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
