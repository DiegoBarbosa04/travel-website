import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerSchema, type RegisterSchemaType } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { loginUser, registerUser } from "@/services/auth.service";
import { Link, useNavigate } from "react-router";
import { UserContext } from "@/contexts/User.context";
import AuthLayout from "@/components/AuthLayout";

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

  const handleRegister = async (data: RegisterSchemaType) => {
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
      title="Crie sua conta"
      description="Cadastre-se para encontrar voos e preparar sua próxima aventura."
      footer={
        <>
          Já possui conta?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#0D2EFC] transition-colors hover:text-[#081B96]"
          >
            Entrar
          </Link>
        </>
      }
    >
      <form className="mt-5 space-y-3" onSubmit={handleSubmit(handleRegister)}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="register-first-name"
              className="block text-sm font-semibold text-[#020B3D]"
            >
              Primeiro nome
            </label>
            <Input
              id="register-first-name"
              type="text"
              autoComplete="given-name"
              placeholder="Seu nome"
              className="h-10 rounded-xl border-[#D8E1F0] bg-white px-4 text-sm text-[#020B3D] placeholder:text-[#8A94A6] focus-visible:border-[#0D2EFC] focus-visible:ring-[#0D2EFC]/20"
              {...register("firstName")}
              aria-invalid={Boolean(errors.firstName)}
            />
            {errors.firstName?.message && (
              <p className="text-sm text-red-600" role="alert">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="register-last-name"
              className="block text-sm font-semibold text-[#020B3D]"
            >
              Sobrenome
            </label>
            <Input
              id="register-last-name"
              type="text"
              autoComplete="family-name"
              placeholder="Seu sobrenome"
              className="h-10 rounded-xl border-[#D8E1F0] bg-white px-4 text-sm text-[#020B3D] placeholder:text-[#8A94A6] focus-visible:border-[#0D2EFC] focus-visible:ring-[#0D2EFC]/20"
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

        <div className="space-y-1.5">
          <label
            htmlFor="register-email"
            className="block text-sm font-semibold text-[#020B3D]"
          >
            Email
          </label>
          <Input
            id="register-email"
            type="email"
            autoComplete="email"
            placeholder="seuemail@exemplo.com"
            className="h-10 rounded-xl border-[#D8E1F0] bg-white px-4 text-sm text-[#020B3D] placeholder:text-[#8A94A6] focus-visible:border-[#0D2EFC] focus-visible:ring-[#0D2EFC]/20"
            {...register("email")}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email?.message && (
            <p className="text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="register-password"
            className="block text-sm font-semibold text-[#020B3D]"
          >
            Senha
          </label>
          <Input
            id="register-password"
            type="password"
            autoComplete="new-password"
            placeholder="Pelo menos 6 caracteres"
            className="h-10 rounded-xl border-[#D8E1F0] bg-white px-4 text-sm text-[#020B3D] placeholder:text-[#8A94A6] focus-visible:border-[#0D2EFC] focus-visible:ring-[#0D2EFC]/20"
            {...register("password")}
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password?.message && (
            <p className="text-sm text-red-600" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="register-confirm-password"
            className="block text-sm font-semibold text-[#020B3D]"
          >
            Confirmar senha
          </label>
          <Input
            id="register-confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="Digite a senha novamente"
            className="h-12 rounded-xl border-[#D8E1F0] bg-white px-4 text-[#020B3D] placeholder:text-[#8A94A6] focus-visible:border-[#0D2EFC] focus-visible:ring-[#0D2EFC]/20"
            {...register("confirmPassword")}
            aria-invalid={Boolean(errors.confirmPassword)}
          />
          {errors.confirmPassword?.message && (
            <p className="text-sm text-red-600" role="alert">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <p className="text-xs leading-5 text-[#526078]">
          Ao continuar, você concorda com nossos{" "}
          <span className="font-semibold text-[#0D2EFC]">Termos</span> e com a{" "}
          <span className="font-semibold text-[#0D2EFC]">
            Política de Privacidade
          </span>
          .
        </p>

        <Button
          type="submit"
          disabled={isLoading}
          className="h-10 w-full rounded-xl bg-blue-primary text-sm font-semibold text-white hover:bg-blue-secondary"
        >
          {isLoading ? <Spinner className="size-5 text-white" /> : "Criar conta"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Register;
