import logoFooter from "../assets/logoFooter.svg";
import Newsletter from "./Newsletter";

function Footer() {
  return (
    <div className="relative h-143 flex flex-col justify-end items-center bg-[#FAFBFC]">
      <Newsletter />
      <div className="w-full h-105 bg-[#8DD3BB] flex gap-16 justify-around items-center px-32 pt-24">
        <div>
          <img src={logoFooter} alt="Logo Footer" />
        </div>

        <div>
          <h3 className="text-lg font-bold  text-[#112211] mb-2">
            Outros destinos
          </h3>
          <ul className="text-[#112211] opacity-70">
            <li>Lisboa</li>
            <li>Porto</li>
            <li>Madrid</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#112211] mb-2">
            Outras atividades
          </h3>
          <ul className="text-[#112211] opacity-70">
            <li>Acampar</li>
            <li>Praticar esportes</li>
            <li>Trilhas</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#112211] mb-2">
            Blog de viagens
          </h3>
          <ul className="text-[#112211] opacity-70">
            <li>Destinos</li>
            <li>Dicas de viagem</li>
            <li>Histórias de viagem</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#112211] mb-2">Sobre nós</h3>
          <ul className="text-[#112211] opacity-70">
            <li>Nossa história</li>
            <li>Equipe</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
