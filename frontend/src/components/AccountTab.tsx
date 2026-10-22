import { useContext, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { UserContext } from "@/contexts/User.context";
import { logoutUser } from "@/services/auth.service";

interface AccountTabProps {
  name: string;
  lastName: string;
  email: string;
}

const labelClassName = "text-[13px] leading-4 font-semibold text-[#5C5C58]";
const valueClassName = "text-lg leading-6 font-semibold text-[#1A1A1A] lg:text-xl lg:leading-[26px]";

function PillButton({
  icon,
  children,
  onClick,
}: {
  icon: string;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-[#D6D6D1] px-4 py-2.5 text-sm leading-[18px] font-semibold text-[#1A1A1A] transition-colors hover:border-[#1A1A1A] lg:px-[18px]"
    >
      <svg viewBox="0 0 24 24" className="size-[15px]" aria-hidden="true">
        <path
          d={icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </button>
  );
}

function AccountTab({ name, lastName, email }: AccountTabProps) {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const comingSoon = () => toast.info("Essa opção estará disponível em breve.");

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Erro ao sair da conta:", error);
    }
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-5 border-b border-[#EAEAE6] py-5 lg:gap-8 lg:py-7">
        <div className="flex flex-1 flex-col gap-1.5">
          <span className={labelClassName}>Nome</span>
          <span className={valueClassName}>{name}</span>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <span className={labelClassName}>Sobrenome</span>
          <span className={valueClassName}>{lastName}</span>
        </div>
        <div className="flex justify-end lg:w-35 lg:shrink-0">
          <PillButton icon="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4" onClick={comingSoon}>
            Editar
          </PillButton>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 border-b border-[#EAEAE6] py-5 lg:py-7">
        <span className={labelClassName}>Email</span>
        <span className={`${valueClassName} break-all`}>{email}</span>
      </div>

      <div className="flex items-center gap-5 border-b border-[#EAEAE6] py-5 lg:gap-8 lg:py-7">
        <div className="flex flex-1 flex-col gap-1.5">
          <span className={labelClassName}>Senha</span>
          <span className="text-lg leading-6 font-bold tracking-[0.2em] text-[#1A1A1A] lg:text-xl lg:leading-[26px]">
            ••••••••
          </span>
        </div>
        <div className="flex justify-end lg:w-35 lg:shrink-0">
          <PillButton icon="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4" onClick={comingSoon}>
            Redefinir
          </PillButton>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-5 lg:flex-row lg:items-center lg:justify-between lg:pt-7">
        <span className="text-sm leading-5 text-[#5C5C58] lg:text-[15px]">
          Sessão ativa neste dispositivo · expira em até 5h
        </span>
        <button
          type="button"
          onClick={handleLogout}
          className="flex h-13 cursor-pointer items-center justify-center gap-2 rounded-full border border-[#F3C9B8] bg-[#FFF6F2] text-[15px] leading-[18px] font-bold text-[#C23A07] transition-colors hover:bg-[#FFEDE4] lg:h-auto lg:border-0 lg:bg-transparent lg:hover:bg-transparent lg:hover:underline"
        >
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
            <path
              d="M10 4H5v16h5M14 8l-4 4 4 4M10 12h10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Sair da conta
        </button>
      </div>
    </div>
  );
}

export default AccountTab;
