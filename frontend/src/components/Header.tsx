import { useContext, useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import logo from "../assets/Logos/Logo-preta.webp";
import { Link } from "react-router";
import { UserContext } from "@/contexts/User.context";
import AvatarIcon from "./AvatarIcon";
import { logoutUser } from "@/services/auth.service";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    try {
      logoutUser();
    } catch (error) {
      console.error("Error ao sair da conta:");
    }
    setIsUserMenuOpen(false);
    setUser(null);
  };

  return (
    <header className="fixed top-4 left-0 w-full flex justify-center z-50">
      <div className="relative grid grid-cols-3 grid-rows-1 justify-between items-center h-[69px] w-4xl px-4 rounded-2xl bg-white shadow-md">
        {/*         {isMenuOpen && (
          <div className="absolute top-18 left-0 w-160 bg-white shadow-md rounded-xl z-10">
            <ul className="flex flex-col gap-4 p-4">
              <li className="cursor-pointer hover:bg-[#F0F0F0] py-2 px-4">
                Início
              </li>

              <li className="cursor-pointer hover:bg-[#F0F0F0] py-2 px-4">
                Avaliações
              </li>

              <li className="cursor-pointer hover:bg-[#F0F0F0] py-2 px-4">
                Contato
              </li>
            </ul>
          </div>
        )} */}

        {/* {isUserMenuOpen && (
          <div className="absolute top-18 right-0 w-45 bg-white shadow-md rounded-xl z-10">
            <ul className="flex flex-col gap-4 p-4">
              <Link to="/profile">
                <li className="cursor-pointer hover:bg-[#F0F0F0] py-2 px-4">
                  Meu perfil
                </li>
              </Link>

              <li
                onClick={handleLogout}
                className="flex gap-2 items-center cursor-pointer hover:bg-[#F0F0F0] py-2 px-4"
              >
                Sair
                <LogOut size={18} />
              </li>
            </ul>
          </div>
        )} */}

        <Link to="/">
          <div className="flex justify-start items-center">
            <img className="w-36" src={logo} alt="logo" />
          </div>
        </Link>

        <div
          className="flex items-center cursor-pointer gap-2"
          onClick={handleMenuClick}
        >
          {/* {isMenuOpen ? <X /> : <Menu />} */}
          <ul className="flex gap-6 text-[#112211] font-light text-[16px]">
            <li>Início</li>
            <li>Avaliações</li>
            <li>Contato</li>
          </ul>
        </div>

        {user ? (
          <div className="flex gap-4 items-center justify-end pr-2">
            <div
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 py-2 px-3 rounded-full cursor-pointer"
            >
              <AvatarIcon
                initials={`${user.firstName[0]}${user.lastName[0]}`}
              />
              <span className="text-[16px] font-semibold">
                {user.firstName} {user.lastName[0]}.
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-end gap-2">
            <Link to="/login">
              <button className="text-[#112211] font-medium hover:bg-[#EAEFF3] border border-[#EAEFF3] h-11 w-25 px-4 rounded-2xl cursor-pointer animate-in fade-in duration-400">
                Entrar
              </button>
            </Link>

            <Link to="/register">
              <button className="text-white bg-[#0D2EFC] font-medium hover:bg-[#081B96] h-11 w-25 rounded-2xl cursor-pointer animate-in fade-in duration-400">
                Registrar
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
