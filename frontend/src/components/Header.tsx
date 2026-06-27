import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.svg";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex mt-4 justify-between items-center h-16 w-160 px-4 rounded-full bg-[#FFFFFF] shadow-md fixed z-50">
      {isMenuOpen && (
        <div className="absolute top-18 left-0 w-160 bg-[#FFFFFF] shadow-md z-10 rounded-xl">
          <ul className="flex flex-col gap-4 p-4">
            <li className="cursor-pointer hover:bg-[#F0F0F0] py-2 px-4">
              Início
            </li>
            <li className="cursor-pointer hover:bg-[#F0F0F0] py-2 px-4">
              Sobre
            </li>
            <li className="cursor-pointer hover:bg-[#F0F0F0] py-2 px-4">
              Contato
            </li>
          </ul>
        </div>
      )}

      <div
        className="flex items-center cursor-pointer gap-2"
        onClick={handleMenuClick}
      >
        {isMenuOpen ? <X /> : <Menu />}
        <span className="text-[#112211] select-none">Menu</span>
      </div>

      <img className="w-20 h-20" src={logo} alt="logo" />
      <div className="flex gap-4">
        <button className="text-[#112211] font-medium hover:bg-[#F0F0F0] py-2 px-4 rounded-full">
          Entrar
        </button>
        <button className="text-[#112211] bg-[#8DD3BB] font-medium hover:bg-[#7BC0A8] py-3 px-4 rounded-full">
          Criar conta
        </button>
      </div>
    </header>
  );
}

export default Header;
