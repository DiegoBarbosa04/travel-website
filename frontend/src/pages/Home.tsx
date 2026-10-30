import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useLocation } from "react-router";
import { toast } from "sonner";
import SearchFlightCard from "@/components/SearchFlightForm";
import Reveal from "@/components/Reveal";
import { useCountUp } from "@/hooks/useCountUp";
import { animationDelay } from "@/lib/utils";
import { getReviews, type PublicReview } from "@/services/review.service";
import heroSunset from "@/assets/home/hero-sunset.webp";
import melbourne from "@/assets/home/melbourne.webp";
import london from "@/assets/home/london.webp";
import orlando from "@/assets/home/orlando.webp";
import paris from "@/assets/photos/paris.webp";
import planeWing from "@/assets/photos/plane-wing.webp";
import parisRooftops from "@/assets/photos/paris-rooftops.webp";
import AerLingusLogo from "@/assets/Aer-Lingus-Logo.svg";
import AirFranceLogo from "@/assets/Air-France-Logo.svg";
import BritishAirwaysLogo from "@/assets/British-Airways-Logo.svg";
import EasyJetLogo from "@/assets/EasyJet-Logo.svg";
import ItaAirwaysLogo from "@/assets/ITA-Airways-Logo.svg";
import TapPortugalLogo from "@/assets/TAP-Portugal-Logo.svg";

const destinations = [
  { city: "Paris", country: "França", description: "Uma aventura em Paris", price: 600, image: paris },
  { city: "Melbourne", country: "Austrália", description: "Uma jornada espetacular", price: 800, image: melbourne },
  { city: "Londres", country: "Inglaterra", description: "Uma viagem inesquecível", price: 800, image: london },
  { city: "Orlando", country: "Estados Unidos", description: "Diversão o ano inteiro", price: 900, image: orlando },
];

const partners = [
  { name: "Aer Lingus", logo: AerLingusLogo, className: "h-9 w-30" },
  { name: "Air France", logo: AirFranceLogo, className: "h-7 w-32.5" },
  { name: "British Airways", logo: BritishAirwaysLogo, className: "h-7 w-35" },
  { name: "easyJet", logo: EasyJetLogo, className: "h-7.5 w-27.5" },
  { name: "ITA Airways", logo: ItaAirwaysLogo, className: "h-9 w-25" },
  { name: "TAP Portugal", logo: TapPortugalLogo, className: "h-8 w-27.5" },
];

const fallbackReviews: PublicReview[] = [
  {
    id: "fallback-1",
    text: "Destino lindo e organização impecável do início ao fim.",
    rating: 5,
    createdAt: "",
    user: { firstName: "Mariana", lastName: "Costa" },
  },
  {
    id: "fallback-2",
    text: "Já é a segunda vez que viajo com eles, sempre excelente.",
    rating: 5,
    createdAt: "",
    user: { firstName: "Ana", lastName: "Souza" },
  },
  {
    id: "fallback-3",
    text: "Preços justos e atendimento cordial. Recomendo!",
    rating: 4,
    createdAt: "",
    user: { firstName: "Rafael", lastName: "Silva" },
  },
];

const formatRating = (value: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

const eyebrowClassName =
  "text-[11px] leading-4 font-semibold tracking-[0.18em] text-[#1A1A1A] uppercase lg:text-xs";

function SectionHeader({
  eyebrow,
  title,
  action,
  titleClassName,
}: {
  eyebrow: string;
  title: ReactNode;
  action?: ReactNode;
  titleClassName: string;
}) {
  return (
    <Reveal
      variant="fade"
      className="reveal-rule flex flex-col gap-3.5 pt-[18px] lg:flex-row lg:items-start lg:gap-12 lg:pt-6"
    >
      <div className="flex items-center justify-between lg:w-50 lg:shrink-0 lg:pt-2">
        <span className={eyebrowClassName}>{eyebrow}</span>
        {action && <div className="lg:hidden">{action}</div>}
      </div>
      <Reveal
        delay={150}
        className={`flex-1 font-extrabold text-[#1A1A1A] ${titleClassName}`}
      >
        {title}
      </Reveal>
      {action && <div className="hidden shrink-0 pt-4 lg:block">{action}</div>}
    </Reveal>
  );
}

function CountUp({ target, format }: { target: number; format: (value: number) => string }) {
  const value = useCountUp(target, 1800, 900);
  return <>{format(value)}</>;
}

function Stars({ className }: { className: string }) {
  return (
    <span className={`tracking-widest text-[#FFC400] ${className}`} aria-hidden="true">
      ★★★★★
    </span>
  );
}

function Home() {
  const { hash } = useLocation();
  const [reviews, setReviews] = useState<PublicReview[]>(fallbackReviews);

  useEffect(() => {
    getReviews()
      .then((response) => {
        if (response.length > 0) setReviews(response);
      })
      .catch((error) => console.error("Erro ao buscar avaliações:", error));
  }, []);

  useEffect(() => {
    if (!hash) return;
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  const average =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const [featured, ...others] = reviews;

  const handleNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.info("A newsletter estará disponível em breve.");
  };

  const stats = [
    {
      target: 300,
      format: (value: number) => `${Math.round(value)}+`,
      label: "companhias aéreas",
      mobileLabel: "companhias",
    },
    {
      target: average,
      format: (value: number) => `${formatRating(value)} ★`,
      label: "nota dos viajantes",
      mobileLabel: "nota média",
    },
    {
      target: 0,
      format: (value: number) => `R$ ${Math.round(value)}`,
      label: "de taxa de busca",
      mobileLabel: "taxa de busca",
    },
  ];

  return (
    <main className="text-[#1A1A1A]">
      <section className="flex flex-col gap-5 px-5 pt-5 lg:px-16 xl:flex-row xl:gap-12 xl:pt-10">
        <div
          className="animate-clip-up relative order-last mt-3 flex h-100 shrink-0 items-end overflow-hidden rounded-[28px] p-3.5 md:h-140 xl:mt-0 xl:h-180 xl:flex-1 xl:rounded-[32px] xl:p-7"
          style={animationDelay(150)}
          role="img"
          aria-label="Avião decolando ao pôr do sol com prédios ao fundo"
        >
          <div
            className="animate-zoom-out absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSunset})`, ...animationDelay(150) }}
          />
          <div
            className="animate-rise relative flex flex-1 justify-between gap-3 rounded-[20px] bg-white px-[18px] py-3.5 md:flex-none md:justify-start md:gap-7 md:rounded-3xl md:px-7 md:py-5"
            style={animationDelay(800)}
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex gap-3 md:gap-7">
                {index > 0 && <span className="w-px shrink-0 bg-[#EAEAE6]" />}
                <div className="flex flex-col gap-0.5">
                  <span className="text-xl leading-[26px] font-extrabold tracking-[-0.03em] tabular-nums md:text-2xl md:leading-[30px]">
                    <CountUp target={stat.target} format={stat.format} />
                  </span>
                  <span className="text-xs leading-[15px] text-[#5C5C58] md:text-[13px] md:leading-4">
                    <span className="md:hidden">{stat.mobileLabel}</span>
                    <span className="hidden md:inline">{stat.label}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 xl:w-155 xl:shrink-0 xl:justify-between xl:gap-0 xl:pt-6 xl:pb-2">
          <div className="flex flex-col gap-5 xl:gap-8">
            <h1 className="flex flex-col gap-0.5 text-[54px] leading-[54px] font-extrabold tracking-[-0.055em] md:text-[80px] md:leading-[80px] xl:gap-1 xl:text-8xl xl:leading-[94px]">
              <span className="animate-rise flex items-center gap-2.5 xl:gap-[18px]">
                Voe
                <img
                  src={planeWing}
                  alt=""
                  className="animate-pop h-11 w-26 shrink-0 rounded-full object-cover transition-transform duration-500 hover:-rotate-3 hover:scale-105 md:h-16 md:w-38 xl:h-19 xl:w-45"
                  style={animationDelay(450)}
                />
                mais
              </span>
              <span className="animate-rise" style={animationDelay(120)}>
                longe, pague
              </span>
              <span
                className="animate-rise flex items-center gap-2.5 text-[#E8480C] xl:gap-[18px]"
                style={animationDelay(240)}
              >
                menos.
                <img
                  src={parisRooftops}
                  alt=""
                  className="animate-pop h-11 w-22 shrink-0 rounded-full object-cover transition-transform duration-500 hover:rotate-3 hover:scale-105 md:h-16 md:w-32 xl:h-19 xl:w-37.5"
                  style={animationDelay(650)}
                />
              </span>
            </h1>
            <p
              className="animate-rise text-base leading-[25px] text-[#5C5C58] md:max-w-115 xl:text-lg xl:leading-[29px]"
              style={animationDelay(360)}
            >
              Compare preços de companhias aéreas em um só lugar e compre com
              segurança, tudo em reais, sem surpresa no final.
            </p>
          </div>

          <div className="animate-rise" style={animationDelay(480)}>
            <SearchFlightCard variant="hero" />
          </div>
        </div>
      </section>

      <section
        id="destinos"
        className="flex scroll-mt-6 flex-col gap-7 pt-18 lg:gap-14 lg:px-16 lg:py-30"
      >
        <div className="mx-5 lg:mx-0">
          <SectionHeader
            eyebrow="01 — Destinos populares"
            titleClassName="text-[34px] leading-9 tracking-[-0.045em] lg:text-[64px] lg:leading-16"
            title="Cidades que estão no radar de quem viaja."
            action={
              <a
                href="#destinos"
                className="group/link flex items-center gap-1.5 text-sm leading-[18px] font-bold text-[#E8480C] lg:gap-2 lg:text-[15px]"
              >
                Ver todos
                <svg
                  viewBox="0 0 24 24"
                  className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1 lg:size-4"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            }
          />
        </div>

        <div className="flex snap-x snap-mandatory scroll-px-5 gap-3.5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:grid lg:snap-none lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {destinations.map((destination, index) => (
            <Reveal
              as="article"
              key={destination.city}
              delay={index * 120}
              className={`group flex w-62.5 shrink-0 snap-start flex-col gap-4 lg:w-auto lg:gap-5 ${index % 2 === 1 ? "lg:pt-18" : ""}`}
            >
              <div className="overflow-hidden rounded-3xl lg:rounded-[32px]">
                <img
                  src={destination.image}
                  alt={destination.city}
                  className="h-80 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 lg:h-110"
                />
              </div>
              <div className="flex flex-col gap-2.5 border-t border-[#1A1A1A] pt-1">
                <div className="flex justify-between pt-3 text-xs leading-4 font-semibold tracking-[0.18em]">
                  <span>Nº {String(index + 1).padStart(2, "0")}</span>
                  <span className="text-[#5C5C58] uppercase">{destination.country}</span>
                </div>
                <h3 className="text-3xl leading-[34px] font-extrabold tracking-[-0.04em] lg:text-[32px] lg:leading-10 xl:text-[40px] xl:leading-11">
                  {destination.city}
                </h3>
                <p className="text-[15px] leading-[22px] text-[#5C5C58]">
                  {destination.description}
                </p>
                <p className="flex items-center gap-1.5 text-base leading-5 font-bold text-[#E8480C]">
                  a partir de R$ {destination.price}
                  <span
                    aria-hidden="true"
                    className="-translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    →
                  </span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-7 bg-white pt-18 lg:gap-14 lg:pt-0 lg:pb-6">
        <div className="mx-5 lg:mx-16">
          <SectionHeader
            eyebrow="02 — Parceiros"
            titleClassName="text-[28px] leading-8 tracking-[-0.035em] lg:text-[40px] lg:leading-[46px]"
            title="As companhias que levam você mais longe"
          />
        </div>

        <Reveal variant="fade" className="relative flex overflow-hidden border-y border-[#EAEAE6]">
          <div className="flex animate-scroll hover:[animation-play-state:paused]">
            {[0, 1].map((track) => (
              <div
                key={track}
                aria-hidden={track === 1}
                className="flex h-22 shrink-0 items-center gap-12 pr-12 lg:h-32 lg:gap-26 lg:pr-26"
              >
                {partners.map((partner) => (
                  <img
                    key={partner.name}
                    src={partner.logo}
                    alt={track === 0 ? partner.name : ""}
                    className={`shrink-0 object-contain opacity-60 grayscale transition duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0 ${partner.className}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-60 bg-linear-to-r from-white to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-white to-transparent lg:w-60" />
        </Reveal>
      </section>

      <section
        id="avaliacoes"
        className="flex flex-col gap-8 px-5 pt-18 lg:gap-14 lg:px-16 lg:pt-30"
      >
        <SectionHeader
          eyebrow="03 — Avaliações"
          titleClassName="flex items-end justify-between gap-4 lg:items-center"
          title={
            <>
              <span className="w-47.5 shrink-0 text-[28px] leading-8 tracking-[-0.035em] lg:w-auto lg:text-[40px] lg:leading-[46px]">
                O que dizem os viajantes
              </span>
              <span className="flex items-center gap-2 lg:gap-2.5">
                <span className="text-[32px] leading-9 tracking-[-0.035em] lg:text-[40px] lg:leading-12">
                  {formatRating(average)}
                </span>
                <span className="flex flex-col gap-0.5 font-normal">
                  <Stars className="text-[13px] leading-4 lg:text-base lg:leading-5" />
                  <span className="text-xs leading-[15px] text-[#5C5C58] lg:text-[13px] lg:leading-4">
                    <span className="hidden lg:inline">média de </span>
                    {reviews.length} {reviews.length === 1 ? "avaliação" : "avaliações"}
                  </span>
                </span>
              </span>
            </>
          }
        />

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 xl:gap-16 xl:pl-62">
          <Reveal as="figure" className="flex flex-col gap-[18px] lg:flex-1 lg:gap-7">
            <span
              aria-hidden="true"
              className="h-10 text-8xl leading-16 font-extrabold text-[#E8480C] lg:h-14 lg:text-[120px] lg:leading-20"
            >
              “
            </span>
            <blockquote className="text-3xl leading-9 font-semibold tracking-[-0.035em] lg:text-5xl lg:leading-14">
              {featured.text}
            </blockquote>
            <figcaption className="flex items-center gap-3 lg:gap-3.5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#E8480C] text-[15px] leading-[18px] font-bold text-white lg:size-13 lg:text-base lg:leading-5">
                {featured.user.firstName[0]}
                {featured.user.lastName[0]}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-base leading-5 font-bold lg:text-[17px] lg:leading-[22px]">
                  {featured.user.firstName} {featured.user.lastName}
                </span>
                <span className="text-[13px] leading-[17px] text-[#5C5C58] lg:text-sm lg:leading-[18px]">
                  ★ {formatRating(featured.rating)}
                </span>
              </span>
            </figcaption>
          </Reveal>

          {others.length > 0 && (
            <div className="flex flex-col border-t border-[#D6D6D1] lg:w-80 lg:shrink-0 lg:border-t-0 xl:w-100">
              {others.slice(0, 2).map((review, index) => (
                <Reveal
                  as="figure"
                  key={review.id}
                  delay={200 + index * 150}
                  className={`flex flex-col gap-2.5 py-5 lg:gap-5 lg:border-l lg:border-[#D6D6D1] lg:py-0 lg:pl-8 ${
                    index === 0
                      ? "border-b border-[#D6D6D1] lg:border-b-0 lg:pb-8"
                      : "lg:border-t lg:pt-8"
                  }`}
                >
                  <blockquote className="text-[17px] leading-[26px] font-medium lg:text-lg lg:leading-7">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="text-[13px] leading-[17px] text-[#5C5C58] lg:text-sm lg:leading-[18px] lg:text-[#1A1A1A]">
                    {review.user.firstName} {review.user.lastName} · ★{" "}
                    {formatRating(review.rating)}
                  </figcaption>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="ofertas" className="flex scroll-mt-6 px-5 pt-14 lg:px-16 lg:pt-40">
        <Reveal
          variant="zoom"
          className="flex flex-1 flex-col gap-5 rounded-[28px] bg-[#FFEDE4] px-5.5 py-7 lg:gap-8 lg:rounded-[32px] lg:p-14 xl:flex-row xl:items-center xl:justify-between xl:gap-12"
        >
          <div className="flex flex-col gap-2.5 lg:max-w-130 lg:gap-3">
            <h2 className="text-[28px] leading-8 font-extrabold tracking-[-0.035em] lg:text-[40px] lg:leading-[46px]">
              Se inscreva na nossa newsletter
            </h2>
            <p className="text-[15px] leading-[23px] text-[#5C5C58] lg:text-[17px] lg:leading-[27px]">
              Fique por dentro das últimas novidades e ofertas — direto na sua
              caixa de entrada.
            </p>
          </div>
          <form
            onSubmit={handleNewsletter}
            className="flex flex-col gap-2.5 lg:gap-3 xl:w-125 xl:shrink-0"
          >
            <div className="flex flex-col gap-2.5 lg:flex-row">
              <input
                type="email"
                required
                aria-label="Seu melhor e-mail"
                placeholder="Seu melhor e-mail"
                className="h-13 min-w-0 rounded-[14px] border border-[#D6D6D1] bg-white px-[18px] text-base leading-5 text-[#1A1A1A] outline-none placeholder:text-[#8F8F8A] focus:border-[#E8480C] focus:ring-4 focus:ring-white lg:h-14 lg:flex-1 lg:px-5"
              />
              <button
                type="submit"
                className="h-13 cursor-pointer rounded-[14px] bg-[#E8480C] px-7 text-base leading-5 font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#B8360A] hover:shadow-[0_10px_24px_-10px_#B8360A] active:translate-y-0 lg:h-14"
              >
                Inscrever-se
              </button>
            </div>
            <p className="text-[13px] leading-4 text-[#5C5C58]">
              Sem spam. Cancele quando quiser.
            </p>
          </form>
        </Reveal>
      </section>

    </main>
  );
}

export default Home;
