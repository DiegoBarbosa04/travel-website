import { useContext, useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import logo from "../assets/logo.svg";
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
      <div className="relative grid grid-cols-3 grid-rows-1 justify-between items-center h-16 w-160 px-4 rounded-full bg-white shadow-md">
        {isMenuOpen && (
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
        )}

        {isUserMenuOpen && (
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
        )}

        <div
          className="flex items-center cursor-pointer gap-2"
          onClick={handleMenuClick}
        >
          {isMenuOpen ? <X /> : <Menu />}
          <span className="text-[#112211] select-none">Menu</span>
        </div>

        <Link to="/">
          <div className="flex justify-center items-center">
            <img className="w-20 h-20" src={logo} alt="logo" />
          </div>
        </Link>

        {user ? (
          <div className="flex gap-4 items-center justify-end pr-2">
            <div
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 py-2 px-3 rounded-full cursor-pointer"
            >
              <AvatarIcon
                initials={`${user.firstName[0]}${user.lastName[0]}`}
              />
              <span className="text-lg font-semibold">
                {user.firstName} {user.lastName[0]}.
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-end gap-2">
            <Link to="/login">
              <button className="text-[#112211] font-medium hover:bg-[#F0F0F0] py-3 px-4 rounded-full cursor-pointer">
                Entrar
              </button>
            </Link>

            <Link to="/register">
              <button className="text-[#112211] bg-[#8DD3BB] font-medium hover:bg-[#7BC0A8] py-3 px-4 rounded-full cursor-pointer">
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
