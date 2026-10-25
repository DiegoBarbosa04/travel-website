import { loginSchema, type LoginSchemaType } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { loginUser } from "@/services/auth.service";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "@/contexts/User.context";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { AuthInput, PasswordInput } from "@/components/AuthInput";
import paris from "@/assets/auth/paris.webp";
import planeWindow from "@/assets/auth/plane-window.webp";
import parisRooftops from "@/assets/auth/paris-rooftops.webp";
import planeWing from "@/assets/auth/plane-wing.webp";

const collage = {
  desktop: {
    polaroids: [
      { image: paris, caption: "Paris", date: "12 MAI", left: 72, top: 110, rotate: -21, width: 290, imageHeight: 300 },
      { image: planeWindow, caption: "Assento 14A", date: "10 MAI", left: 370, top: 48, rotate: 13, width: 310, imageHeight: 350 },
      { image: parisRooftops, caption: "Telhados de Paris", date: "14 MAI", left: 104, top: 450, rotate: 11, width: 280, imageHeight: 300 },
      { image: planeWing, caption: "Quase lá", date: "11 MAI", left: 404, top: 420, rotate: -14, width: 290, imageHeight: 290 },
    ],
    boardingPass: { from: "GRU", to: "CDG", gate: "B12", boarding: "21:40", seat: "14A", left: 264, top: 356, rotate: -11 },
  },
  mobile: {
    polaroids: [
      { image: paris, caption: "Paris", left: 22, top: 34, rotate: -12, width: 140, imageHeight: 132 },
      { image: planeWindow, caption: "Assento 14A", left: 196, top: 14, rotate: 9, width: 150, imageHeight: 150 },
    ],
    boardingPass: { from: "GRU", to: "CDG", left: 86, top: 136, rotate: -7 },
  },
};

function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginSchemaType) => {
    try {
      setLoginError(null);
      setIsLoading(true);
      const user = await loginUser(data);
      setUser(user);
      navigate("/");
    } catch (error) {
      const message = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      setLoginError(message || "Usuário ou senha inválido");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout
      eyebrow="Entrar na conta"
      title="Que bom ter você de volta."
      description="Entre na sua conta para ver seus voos salvos e continuar de onde parou."
      collage={collage}
      footer={
        <>
          Ainda não tem conta?
          <Link
            to="/register"
            className="font-bold text-[#1A1A1A] underline decoration-[#E8480C] decoration-2 underline-offset-4 transition-colors hover:text-[#E8480C]"
          >
            Criar conta
          </Link>
        </>
      }
    >
      <form
        className="flex flex-col gap-7 lg:gap-9 lg:short:gap-5"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="flex flex-col gap-[18px] lg:short:gap-3">
          <div className="flex flex-col gap-2 lg:short:gap-1.5">
            <label
              htmlFor="login-email"
              className="text-sm leading-5 font-semibold text-[#1A1A1A]"
            >
              Email
            </label>
            <AuthInput
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="seuemail@exemplo.com"
              aria-invalid={Boolean(errors.email || loginError)}
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:short:gap-1.5">
            <label
              htmlFor="login-password"
              className="text-sm leading-5 font-semibold text-[#1A1A1A]"
            >
              Senha
            </label>
            <PasswordInput
              id="login-password"
              autoComplete="current-password"
              placeholder="Digite sua senha"
              aria-invalid={Boolean(errors.password || loginError)}
              {...register("password")}
            />
            {errors.password?.message && (
              <p className="text-sm text-red-600" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:short:gap-3.5">
          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm leading-5 text-[#5C5C58]">
              <Checkbox className="size-[18px] rounded-[5px] border-[#D6D6D1] bg-white data-[state=checked]:border-[#1A1A1A] data-[state=checked]:bg-[#1A1A1A] data-[state=checked]:text-white [&_svg]:size-3" />
              Lembrar de mim
            </label>
            <span className="text-sm leading-5 font-semibold text-[#B8360A]">
              Esqueceu a senha?
            </span>
          </div>

          {loginError && (
            <p className="text-sm text-red-600" role="alert">
              {loginError}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="h-14 w-full lg:short:h-12 lg:shorter:h-11 gap-2.5 rounded-[14px] bg-[#E8480C] text-base font-bold text-white hover:bg-[#B8360A]"
          >
            {isLoading ? (
              <Spinner className="size-5 text-white" />
            ) : (
              <>
                Entrar
                <ArrowRight className="size-[18px]" strokeWidth={2.4} />
              </>
            )}
          </Button>

          <div className="flex items-center gap-3.5">
            <span className="h-px flex-1 bg-[#D6D6D1]" />
            <span className="text-xs leading-4 font-semibold tracking-[0.08em] text-[#8F8F8A]">
              OU
            </span>
            <span className="h-px flex-1 bg-[#D6D6D1]" />
          </div>

          <GoogleAuthButton text="signin_with" />
        </div>
      </form>
    </AuthLayout>
  );
}

export default Login;
