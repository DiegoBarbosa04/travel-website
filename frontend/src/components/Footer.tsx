import Logo from "@/components/Logo";

const columns = [
  { title: "Outros destinos", links: ["Lisboa", "Porto", "Madrid"] },
  {
    title: "Outras atividades",
    links: ["Acampar", "Praticar esportes", "Trilhas"],
  },
  {
    title: "Blog de viagens",
    links: ["Destinos", "Dicas de viagem", "Histórias de viagem"],
  },
  { title: "Sobre nós", links: ["Nossa história", "Equipe", "Carreiras"] },
];

function Footer() {
  return (
    <footer
      id="sobre"
      className="flex scroll-mt-6 flex-col gap-8 px-5 pt-16 pb-10 lg:gap-12 lg:px-16 lg:pt-24"
    >
      <div className="flex flex-col gap-7 border-t border-[#1A1A1A] pt-8 lg:flex-row lg:gap-12 lg:pt-10">
        <div className="flex flex-col gap-3 lg:w-60 lg:shrink-0 lg:gap-4">
          <Logo
            className="gap-[7px] lg:gap-2"
            markClassName="h-[23px] w-[26px] lg:h-7 lg:w-[31px]"
            textClassName="text-[22px] leading-6 lg:text-[28px] lg:leading-7"
          />
          <p className="text-sm leading-[22px] text-[#5C5C58] lg:text-[15px] lg:leading-6">
            Compare preços de companhias aéreas em um só lugar.
          </p>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-y-7 md:grid-cols-4 xl:flex xl:justify-between">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3 lg:gap-3.5 xl:w-45">
              <h3 className="text-[11px] leading-4 font-semibold tracking-[0.18em] text-[#1A1A1A] uppercase lg:text-xs">
                {column.title}
              </h3>
              {column.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="w-fit text-[15px] leading-5 text-[#1A1A1A] transition-colors hover:text-[#E8480C] lg:text-base"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 border-t border-[#EAEAE6] pt-5 text-[13px] leading-4 text-[#5C5C58] lg:flex-row lg:justify-between lg:pt-6">
        <p>© 2026 Decolando. Todos os direitos reservados.</p>
        <p>
          <a href="#" className="transition-colors hover:text-[#1A1A1A]">
            Privacidade
          </a>
          {" · "}
          <a href="#" className="transition-colors hover:text-[#1A1A1A]">
            Termos de uso
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
