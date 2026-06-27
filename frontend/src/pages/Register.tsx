import { Input } from "@/components/ui/input";
import { registerSchema, type registerSchemaType } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.svg";

function Register() {
  const img =
    "https://plus.unsplash.com/premium_photo-1679830513886-e09cd6dc3137?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dm9vfGVufDB8fDB8fHww";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = (data: registerSchemaType) => {
    //api.post("/auth/register", data);
  };

  return (
    <div className="h-screen flex items-center justify-around ">
      <img
        className="w-134 h-185 bg-no-repeat bg-cover rounded-3xl"
        src={img}
        alt="flight.png"
      />

      <div>
        <div className="flex flex-col gap-4 w-126 ">
          <img className="w-25 h-25" src={logo} alt="logo" />
          <div className="flex flex-col gap-1 my-4">
            <h1 className="text-4xl font-bold">Registrar</h1>
            <h2 className="font-light text-md text-[#112211]">
              Crie sua conta para desfrutar de todos os recursos do nosso site.
            </h2>
          </div>

          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="flex flex-col gap-1">
              <div className="flex gap-4">
                <div>
                  <label className="font-light text-[#1C1B1F]">
                    Primeiro nome
                  </label>
                  <Input
                    type="text"
                    className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DD3BB]"
                    {...register("firstName")}
                    aria-invalid={errors.firstName ? "true" : "false"}
                  />
                  <p className="text-red-500 text-sm">
                    {errors.firstName?.message}
                  </p>
                </div>

                <div>
                  <label className="font-light text-[#1C1B1F]">Sobrenome</label>
                  <Input
                    type="text"
                    className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DD3BB]"
                    {...register("lastName")}
                    aria-invalid={errors.lastName ? "true" : "false"}
                  />
                  <p className="text-red-500 text-sm">
                    {errors.lastName?.message}
                  </p>
                </div>
              </div>

              <label className="font-light text-[#1C1B1F]">Email</label>
              <Input
                type="email"
                className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DD3BB]"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
              <label className="font-light text-[#1C1B1F]">Senha</label>
              <Input
                type="password"
                className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DD3BB]"
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
              <label className="font-light text-[#1C1B1F]">
                Confirmar senha
              </label>
              <Input
                type="password"
                className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DD3BB]"
                {...register("confirmPassword")}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
              />
              <p className="text-red-500 text-sm">
                {errors.confirmPassword?.message}
              </p>
            </div>

            <div className="my-4">
              <span className="text-[#1C1B1F] text-sm">
                Eu concordo com todos os
                <a className="text-[#FF8682]"> Termos </a>e
                <a className="text-[#FF8682]"> Politicas de Privacidade</a>
              </span>
            </div>
            <button
              type="submit"
              className="h-10 rounded-sm bg-[#8DD3BB] text-[#112211] font-semibold w-full hover:bg-[#7BC0A8] cursor-pointer"
            >
              Registrar
            </button>
          </form>

          <div className="flex justify-center gap-1">
            <span>Já possui conta? </span>
            <a href="" className="text-[#FF8682] hover:underline">
              Entrar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
