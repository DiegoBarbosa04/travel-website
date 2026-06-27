import { loginSchema } from "@/schemas/auth.schema";
import logo from "../assets/logo.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

function Login() {
  const img =
    "https://plus.unsplash.com/premium_photo-1679830513886-e09cd6dc3137?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dm9vfGVufDB8fDB8fHww";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="h-screen flex items-center justify-around ">
      <div className="flex flex-col gap-4 w-126 ">
        <img className="w-25 h-25" src={logo} alt="logo" />

        <div className="flex flex-col gap-1 mb-4">
          <h1 className="text-4xl font-bold mt-4 mb-2">Entrar</h1>
          <h2 className="font-light text-md text-[#112211]">
            Entre na sua conta para desfrutar de todos os recursos do nosso
            site.
          </h2>
        </div>

        <form onSubmit={handleSubmit(() => console.log("submit"))}>
          <div className="flex flex-col gap-1">
            <label className="font-light text-[#1C1B1F]">Email</label>
            <Input
              type="email"
              className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DD3BB]"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email")}
            />

            <p className="text-red-500 text-sm">{errors.email?.message}</p>

            <label className="font-light text-[#1C1B1F]">Senha</label>
            <Input
              type="password"
              className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DD3BB]"
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password")}
            />

            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <div className="flex justify-between my-4">
            <p>Lembrar de mim</p>
            <a className="text-[#8DD3BB]">Esqueceu a senha?</a>
          </div>

          <button className="h-10 rounded-sm bg-[#8DD3BB] text-[#112211] font-semibold w-full">
            Entrar
          </button>
        </form>

        <div className="flex justify-center gap-1">
          <span>Não possui conta? </span>
          <a href="" className="text-[#8DD3BB] hover:underline">
            Registrar-se
          </a>
        </div>
      </div>

      <div>
        <img
          className="w-134 h-185 bg-no-repeat bg-cover rounded-3xl"
          src={img}
          alt="flight.png"
        />
      </div>
    </div>
  );
}

export default Login;
