import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowRight, ChevronDown, Clock, Star, User, X } from "lucide-react";
import { UserContext } from "@/contexts/User.context";
import { logoutUser } from "@/services/auth.service";
import Logo from "@/components/Logo";
import { animationDelay } from "@/lib/utils";
import paris from "@/assets/photos/paris.webp";

const navItems = [
  { label: "Voos", to: "/" },
  { label: "Destinos", to: "/#destinos" },
  { label: "Ofertas", to: "/#ofertas", badge: "NOVAS" },
  { label: "Sobre nós", to: "/#sobre" },
];

const accountItems = [
  { label: "Minha conta", mobileLabel: "Dados da conta", icon: User, tab: "conta" },
  {
    label: "Minhas avaliações",
    mobileLabel: "Minhas avaliações",
    icon: Star,
    tab: "avaliacoes",
  },
  {
    label: "Histórico de pesquisas",
    mobileLabel: "Histórico de pesquisas",
    icon: Clock,
    tab: "historico",
  },
];

function Avatar({ initials, className }: { initials: string; className: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#E8480C] font-bold text-white ${className}`}
    >
      {initials}
    </span>
  );
}

function SignOutIcon({ className, strokeWidth }: { className: string; strokeWidth: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M10 4H5v16h5M14 8l-4 4 4 4M10 12h10"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuArrow({ className = "" }: { className?: string }) {
  return <ArrowRight className={`shrink-0 ${className}`} strokeWidth={2.2} />;
}

function Header() {
  const { user, setUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const initials = user ? `${user.firstName[0]}${user.lastName[0]}` : "";
  const activeNav = pathname === "/profile" ? null : "Voos";

  useEffect(() => {
    if (!isAccountOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (!accountRef.current?.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsAccountOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isAccountOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsAccountOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Erro ao sair da conta:", error);
    }
    closeMenus();
    setUser(null);
    navigate("/");
  };

  return (
    <header className="relative z-40 flex items-center justify-between px-5 pt-4 pb-3 lg:px-16 lg:py-7">
      <Link to="/" aria-label="Decolando — página inicial" className="xl:w-65">
        <Logo
          className="gap-[7px] lg:gap-2"
          markClassName="h-[23px] w-[26px] lg:h-7 lg:w-[31px]"
          textClassName="text-[22px] leading-6 lg:text-[28px] lg:leading-7"
        />
      </Link>

      <nav className="hidden items-center gap-1 rounded-full border border-[#EAEAE6] bg-[#F4F4F2] p-1.5 lg:flex">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`rounded-full px-[18px] py-2 text-[15px] whitespace-nowrap leading-[18px] transition-colors ${
              activeNav === item.label
                ? "bg-white font-semibold text-[#1A1A1A] shadow-[0_1px_3px_#020B3D14]"
                : "font-medium text-[#5C5C58] hover:text-[#1A1A1A]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="hidden items-center justify-end gap-2 lg:flex xl:w-65">
        {user ? (
          <div ref={accountRef} className="relative">
            <button
              type="button"
              onClick={() => setIsAccountOpen((open) => !open)}
              aria-expanded={isAccountOpen}
              aria-haspopup="menu"
              className={`flex cursor-pointer items-center gap-2.5 rounded-full border bg-[#F4F4F2] py-[5px] pr-3.5 pl-[5px] transition-colors ${
                isAccountOpen ? "border-[#1A1A1A]" : "border-[#EAEAE6] hover:border-[#1A1A1A]"
              }`}
            >
              <Avatar initials={initials} className="size-8 text-[13px] leading-4" />
              <span className="text-[15px] leading-[18px] font-semibold text-[#1A1A1A]">
                {user.firstName}
              </span>
              <ChevronDown
                className={`size-3.5 text-[#5C5C58] transition-transform ${isAccountOpen ? "rotate-180" : ""}`}
                strokeWidth={2.2}
              />
            </button>

            {isAccountOpen && (
              <div
                role="menu"
                className="absolute top-[calc(100%+12px)] right-0 w-80 origin-top-right animate-in duration-200 fade-in zoom-in-95 slide-in-from-top-2overflow-hidden rounded-3xl border border-[#EAEAE6] bg-white shadow-[0_24px_48px_-16px_#1A1A1A2E,0_2px_8px_#1A1A1A14]"
              >
                <div className="flex items-center gap-3.5 px-5 pt-5 pb-[18px]">
                  <Avatar
                    initials={initials}
                    className="size-13 text-lg leading-[22px] font-extrabold tracking-[-0.03em]"
                  />
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-lg leading-[22px] font-extrabold tracking-[-0.03em] text-[#1A1A1A]">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="truncate text-[13px] leading-[17px] text-[#5C5C58]">
                      {user.email}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col border-t border-[#EAEAE6] px-2 py-1.5">
                  {accountItems.map(({ label, icon: Icon, tab }) => (
                    <Link
                      key={label}
                      to={`/profile?tab=${tab}`}
                      role="menuitem"
                      onClick={closeMenus}
                      className="group flex items-center gap-3 rounded-xl px-3 py-[11px] text-[15px] leading-[19px] font-medium text-[#1A1A1A] transition-colors hover:bg-[#F4F4F2]"
                    >
                      <Icon className="size-[18px]" strokeWidth={1.9} />
                      <span className="flex-1">{label}</span>
                      <MenuArrow className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
                <div className="flex border-t border-[#EAEAE6] px-2 pt-1.5 pb-2">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex flex-1 cursor-pointer items-center gap-3 rounded-xl px-3 py-[11px] text-[15px] leading-[19px] font-bold text-[#B8360A] transition-colors hover:bg-[#FFF6F2]"
                  >
                    <SignOutIcon className="size-[18px]" strokeWidth={2} />
                    Sair da conta
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="rounded-full px-[18px] py-2.5 text-[15px] leading-[18px] font-semibold text-[#1A1A1A] transition-colors hover:bg-[#F4F4F2]"
            >
              Entrar
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-[#1A1A1A] px-5 py-2.5 text-[15px] leading-[18px] font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#E8480C]"
            >
              Criar conta
            </Link>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 lg:hidden">
        {user ? (
          <Link to="/profile" aria-label="Minha conta">
            <Avatar initials={initials} className="size-9 text-[13px] leading-4" />
          </Link>
        ) : (
          <Link
            to="/login"
            className="rounded-full bg-[#1A1A1A] px-4 py-[9px] text-sm leading-[18px] font-semibold text-white"
          >
            Entrar
          </Link>
        )}
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Abrir menu"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#EAEAE6] bg-[#F4F4F2]"
        >
          <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h10"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <MobileMenu onClose={() => setIsMenuOpen(false)}>
          {user && (
            <div className="px-5 pt-3.5">
              <Link
                to="/profile"
                onClick={closeMenus}
                className="flex items-center gap-3.5 rounded-[20px] bg-[#F4F4F2] px-4 py-3.5"
              >
                <Avatar
                  initials={initials}
                  className="size-13 text-lg leading-[22px] font-extrabold tracking-[-0.03em]"
                />
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-lg leading-[22px] font-extrabold tracking-[-0.03em] text-[#1A1A1A]">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="truncate text-[13px] leading-[17px] text-[#5C5C58]">
                    {user.email}
                  </span>
                </span>
                <MenuArrow className="size-4 text-[#1A1A1A]" />
              </Link>
            </div>
          )}

          <nav className={`flex flex-1 flex-col px-5 ${user ? "pt-[22px]" : "pt-7"}`}>
            <span className="pb-3 text-[11px] leading-4 font-semibold tracking-[0.18em] text-[#5C5C58] uppercase">
              Menu
            </span>
            {navItems.map((item, index) => {
              const isActive = activeNav === item.label;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={closeMenus}
                  style={animationDelay(120 + index * 70)}
                  className={`animate-rise flex items-center justify-between border-t py-[18px] ${
                    index === 0 ? "border-[#1A1A1A]" : "border-[#EAEAE6]"
                  } ${index === navItems.length - 1 ? "border-b border-b-[#EAEAE6]" : ""}`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`text-[40px] leading-11 font-extrabold tracking-[-0.045em] ${isActive ? "text-[#E8480C]" : "text-[#1A1A1A]"}`}
                    >
                      {item.label}
                    </span>
                    {isActive && <span className="size-2 rounded-full bg-[#E8480C]" />}
                    {item.badge && (
                      <span className="rounded-full bg-[#FFEDE4] px-2.5 py-1 text-[10px] leading-[14px] font-bold tracking-[0.14em] text-[#C23A07]">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <MenuArrow
                    className={`size-[22px] ${isActive ? "text-[#E8480C]" : "text-[#1A1A1A]"}`}
                  />
                </Link>
              );
            })}
          </nav>

          {user ? (
            <div className="flex flex-col gap-3.5 px-5 pt-6 pb-[34px]">
              <div className="flex flex-col">
                <span className="pb-1 text-[11px] leading-4 font-semibold tracking-[0.18em] text-[#5C5C58] uppercase">
                  Minha conta
                </span>
                {accountItems.map(({ mobileLabel, icon: Icon, tab }, index) => (
                  <Link
                    key={mobileLabel}
                    to={`/profile?tab=${tab}`}
                    onClick={closeMenus}
                    className={`flex items-center gap-3 py-3 text-base leading-5 font-medium text-[#1A1A1A] ${
                      index < accountItems.length - 1 ? "border-b border-[#EAEAE6]" : ""
                    }`}
                  >
                    <Icon className="size-[18px]" strokeWidth={1.9} />
                    {mobileLabel}
                  </Link>
                ))}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex h-13 cursor-pointer items-center justify-center gap-2 rounded-full border border-[#F3C9B8] bg-[#FFF6F2] text-[15px] leading-[18px] font-bold text-[#B8360A]"
              >
                <SignOutIcon className="size-4" strokeWidth={2.2} />
                Sair da conta
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-[18px] px-5 pt-6 pb-[34px]">
              <Link
                to="/#destinos"
                onClick={closeMenus}
                className="flex items-center gap-3.5 rounded-[20px] bg-[#F4F4F2] p-3"
              >
                <img src={paris} alt="" className="size-16 shrink-0 rounded-[14px] object-cover" />
                <span className="flex flex-1 flex-col gap-0.5">
                  <span className="text-[11px] leading-[14px] font-semibold tracking-[0.14em] text-[#5C5C58] uppercase">
                    Destino em alta
                  </span>
                  <span className="text-lg leading-[22px] font-extrabold tracking-[-0.03em] text-[#1A1A1A]">
                    Paris
                  </span>
                  <span className="text-sm leading-[18px] font-bold text-[#E8480C]">
                    a partir de R$ 600
                  </span>
                </span>
              </Link>
              <div className="flex gap-2.5">
                <Link
                  to="/login"
                  onClick={closeMenus}
                  className="flex h-13 flex-1 items-center justify-center rounded-full border-[1.5px] border-[#1A1A1A] text-[15px] leading-[18px] font-bold text-[#1A1A1A]"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenus}
                  className="flex h-13 flex-1 items-center justify-center rounded-full bg-[#1A1A1A] text-[15px] leading-[18px] font-bold text-white"
                >
                  Criar conta
                </Link>
              </div>
            </div>
          )}
        </MobileMenu>
      )}
    </header>
  );
}

function MobileMenu({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white animate-in duration-300 fade-in slide-in-from-top-4 lg:hidden"
    >
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <Link to="/" onClick={onClose} aria-label="Decolando — página inicial">
          <Logo
            className="gap-[7px]"
            markClassName="h-[23px] w-[26px]"
            textClassName="text-[22px] leading-6"
          />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#1A1A1A] text-white"
        >
          <X className="size-4" strokeWidth={2.4} />
        </button>
      </div>
      {children}
    </div>
  );
}

export default Header;
