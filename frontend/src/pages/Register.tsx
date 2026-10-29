import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { registerSchema, type RegisterSchemaType } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { loginUser, registerUser } from "@/services/auth.service";
import { Link, useNavigate } from "react-router";
import { UserContext } from "@/contexts/User.context";
import { ArrowRight } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { AuthInput, PasswordInput } from "@/components/AuthInput";
import aboveClouds from "@/assets/auth/above-clouds.webp";
import sugarloaf from "@/assets/auth/sugarloaf.webp";
import planeWing from "@/assets/photos/plane-wing.webp";
import landing from "@/assets/auth/landing.webp";

const collage = {
  desktop: {
    polaroids: [
      { image: sugarloaf, caption: "Pão de Açúcar", date: "08 JAN", left: 420, top: 70, rotate: -11, width: 290, imageHeight: 300 },
      { image: aboveClouds, caption: "Acima das nuvens", date: "06 JAN", left: 60, top: 40, rotate: 7, width: 310, imageHeight: 350 },
      { image: planeWing, caption: "Janela 22F", date: "06 JAN", left: 390, top: 500, rotate: 4, width: 280, imageHeight: 300 },
      { image: landing, caption: "Hora do pouso", date: "06 JAN", left: 80, top: 480, rotate: -6, width: 290, imageHeight: 290 },
    ],
    boardingPass: { from: "GRU", to: "SDU", gate: "C07", boarding: "06:15", seat: "22F", left: 196, top: 432, rotate: -2 },
  },
  mobile: {
    polaroids: [
      { image: aboveClouds, caption: "Acima das nuvens", left: 22, top: 34, rotate: -12, width: 140, imageHeight: 132 },
      { image: sugarloaf, caption: "Pão de Açúcar", left: 196, top: 14, rotate: 9, width: 150, imageHeight: 150 },
    ],
    boardingPass: { from: "GRU", to: "SDU", left: 86, top: 136, rotate: -7 },
  },
};

const labelClassName = "text-sm leading-5 font-semibold text-[#1A1A1A]";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const handleRegister = async (data: RegisterSchemaType) => {
    if (!acceptedTerms) {
      setTermsError(true);
      return;
    }

    try {
      setIsLoading(true);
      await registerUser(data);
      const user = await loginUser(data);
      setUser(user);
      navigate("/");
    } catch (error) {
      console.error("Erro ao registrar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      compact
      eyebrow="Criar conta"
      title="Sua próxima viagem começa aqui."
      description="Crie sua conta e compare voos de mais de 300 companhias, tudo em reais."
      collage={collage}
      footer={
        <>
          Já tem uma conta?
          <Link
            to="/login"
            className="font-bold text-[#1A1A1A] underline decoration-[#E8480C] decoration-2 underline-offset-4 transition-colors hover:text-[#E8480C]"
          >
            Entrar
          </Link>
        </>
      }
    >
      <form
        className="flex flex-col gap-7 lg:gap-6 lg:short:gap-4"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="flex flex-col gap-3.5 lg:short:gap-2">
          <div className="flex gap-3">
            <div className="flex flex-1 flex-col gap-1.5 lg:short:gap-1">
              <label htmlFor="register-first-name" className={labelClassName}>
                Nome
              </label>
              <AuthInput
                id="register-first-name"
                type="text"
                autoComplete="given-name"
                placeholder="Seu nome"
                className="h-12 lg:short:h-11 lg:shorter:h-10"
                {...register("firstName")}
                aria-invalid={Boolean(errors.firstName)}
              />
              {errors.firstName?.message && (
                <p className="text-sm text-red-600" role="alert">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-1.5 lg:short:gap-1">
              <label htmlFor="register-last-name" className={labelClassName}>
                Sobrenome
              </label>
              <AuthInput
                id="register-last-name"
                type="text"
                autoComplete="family-name"
                placeholder="Seu sobrenome"
                className="h-12 lg:short:h-11 lg:shorter:h-10"
                {...register("lastName")}
                aria-invalid={Boolean(errors.lastName)}
              />
              {errors.lastName?.message && (
                <p className="text-sm text-red-600" role="alert">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 lg:short:gap-1">
            <label htmlFor="register-email" className={labelClassName}>
              Email
            </label>
            <AuthInput
              id="register-email"
              type="email"
              autoComplete="email"
              placeholder="seuemail@exemplo.com"
              className="h-12 lg:short:h-11 lg:shorter:h-10"
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email?.message && (
              <p className="text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 lg:short:gap-1">
            <label htmlFor="register-password" className={labelClassName}>
              Senha
            </label>
            <PasswordInput
              id="register-password"
              autoComplete="new-password"
              placeholder="Pelo menos 6 caracteres"
              className="h-12 lg:short:h-11 lg:shorter:h-10"
              {...register("password")}
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password?.message && (
              <p className="text-sm text-red-600" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5 lg:short:gap-1">
            <label
              htmlFor="register-confirm-password"
              className={labelClassName}
            >
              Confirmar senha
            </label>
            <PasswordInput
              id="register-confirm-password"
              autoComplete="new-password"
              placeholder="Digite a senha novamente"
              className="h-12 lg:short:h-11 lg:shorter:h-10"
              {...register("confirmPassword")}
              aria-invalid={Boolean(errors.confirmPassword)}
            />
            {errors.confirmPassword?.message && (
              <p className="text-sm text-red-600" role="alert">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:short:gap-3.5">
          <div className="flex flex-col gap-1.5 lg:short:gap-1">
            <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-5 text-[#5C5C58]">
              <Checkbox
                checked={acceptedTerms}
                onCheckedChange={(checked) => {
                  setAcceptedTerms(checked === true);
                  setTermsError(false);
                }}
                aria-invalid={termsError}
                className="mt-px size-[18px] rounded-[5px] border-[#D6D6D1] bg-white data-[state=checked]:border-[#1A1A1A] data-[state=checked]:bg-[#1A1A1A] data-[state=checked]:text-white [&_svg]:size-3"
              />
              Aceito os Termos de Uso e a Política de Privacidade.
            </label>
            {termsError && (
              <p className="text-sm text-red-600" role="alert">
                Você precisa aceitar os termos para continuar
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-[52px] w-full lg:short:h-12 lg:shorter:h-11 gap-2.5 rounded-[14px] bg-[#E8480C] text-base font-bold text-white hover:bg-[#B8360A]"
          >
            {isLoading ? (
              <Spinner className="size-5 text-white" />
            ) : (
              <>
                Criar conta
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

          <GoogleAuthButton text="signup_with" />
        </div>
      </form>
    </AuthLayout>
  );
}

export default Register;
