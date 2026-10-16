import { loginSchema, type LoginSchemaType } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/services/auth.service";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "@/contexts/User.context";
import { Spinner } from "@/components/ui/spinner";
import AuthLayout from "@/components/AuthLayout";

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
      compact
      title="Que bom ter você de volta"
      description="Entre na sua conta para encontrar voos e continuar planejando sua próxima viagem."
      footer={
        <>
          Não possui conta?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#0D2EFC] transition-colors hover:text-[#081B96]"
          >
            Criar conta
          </Link>
        </>
      }
    >
      <form className="mt-5 space-y-3" onSubmit={handleSubmit(handleLogin)}>
        <div className="space-y-1.5">
          <label
            htmlFor="login-email"
            className="block text-sm font-semibold text-[#020B3D]"
          >
            Email
          </label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="seuemail@exemplo.com"
            className="h-10 rounded-xl border-[#D8E1F0] bg-white px-4 text-sm text-[#020B3D] placeholder:text-[#8A94A6] focus-visible:border-[#0D2EFC] focus-visible:ring-[#0D2EFC]/20"
            aria-invalid={Boolean(errors.email || loginError)}
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="login-password"
            className="block text-sm font-semibold text-[#020B3D]"
          >
            Senha
          </label>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="Digite sua senha"
            className="h-10 rounded-xl border-[#D8E1F0] bg-white px-4 text-sm text-[#020B3D] placeholder:text-[#8A94A6] focus-visible:border-[#0D2EFC] focus-visible:ring-[#0D2EFC]/20"
            aria-invalid={Boolean(errors.password || loginError)}
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-sm text-red-600" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-[#526078]">
          <span>Lembrar de mim</span>
          <span className="font-semibold text-[#0D2EFC]">
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
          className="h-10 w-full rounded-xl bg-blue-primary text-sm font-semibold text-white hover:bg-blue-secondary"
        >
          {isLoading ? <Spinner className="size-5 text-white" /> : "Entrar"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Login;
