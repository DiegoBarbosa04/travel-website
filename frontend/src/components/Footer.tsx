import logoFooter from "../assets/Logos/logo-totalmente-branca.svg";
import Newsletter from "./Newsletter";

function Footer() {
  return (
    <footer className="mt-(--respiro-vertical) text-white">
      {/* Metade superior clara e metade inferior escura: a newsletter fica exatamente sobre a divisa. */}
      <div
        className="relative"
        style={{
          background: "linear-gradient(to bottom, #FAFBFC 50%, #020B3D 50%)",
        }}
      >
        <div className="conteudo">
          <Newsletter />
        </div>
      </div>

      <div className="bg-[#020B3D]">
        <div className="conteudo pb-7 pt-16">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr] lg:gap-20">
            <div className="max-w-72">
              <img
                className="h-auto w-38 brightness-0 invert"
                src={logoFooter}
                alt="Decolando"
              />
              <p className="fs-corpo mt-5 text-white/70">
                Tecnologia para encontrar voos, destinos e experiências que
                fazem sua próxima viagem decolar.
              </p>
              <div className="fs-legenda mt-6 space-y-1 text-white/60">
                <p>Decolando Viagens e Turismo Ltda.</p>
                <p>Rua das Nuvens, 2026, São Paulo - SP</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              <FooterColumn
                title="Institucional"
                links={[
                  "Sobre o Decolando",
                  "Nossos parceiros",
                  "Blog de viagens",
                ]}
              />
              <FooterColumn
                title="Planeje sua viagem"
                links={["Destinos populares", "Buscar voos", "Dicas de viagem"]}
              />
              <FooterColumn
                title="Atendimento"
                links={["Central de ajuda", "Contato", "Perguntas frequentes"]}
              />
              <div>
                <h3 className="fs-subtitulo mb-4">Contato</h3>
                <div className="fs-corpo space-y-3 text-white/70">
                  <p>
                    <strong className="fs-subtitulo block text-white">
                      0800 000 2026
                    </strong>
                    Capitais e regiões metropolitanas
                  </p>
                  <p>contato@decolando.com.br</p>
                </div>
              </div>
            </div>
          </div>
          <div className="fs-legenda mt-12 flex flex-col gap-4 border-t border-white/15 pt-5 text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Decolando. Todos os direitos reservados.</p>
            <div className="flex gap-5">
              <a href="#">Política de privacidade</a>
              <a href="#">Termos de uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="fs-subtitulo mb-4">{title}</h3>
      <nav className="fs-corpo flex flex-col gap-3 text-white/70">
        {links.map((link) => (
          <a key={link} href="#">
            {link}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default Footer;
