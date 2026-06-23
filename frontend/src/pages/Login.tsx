function Login() {
  const img =
    "https://plus.unsplash.com/premium_photo-1679830513886-e09cd6dc3137?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dm9vfGVufDB8fDB8fHww";
  return (
    <div className="h-screen flex items-center justify-around ">
      <div className="flex flex-col gap-4 w-106 ">
        <p>logo</p>
        <h1 className="text-4xl font-bold">Login</h1>
        <h2 className="font-light text-xl text-[#112211]">
          Faça login na sua conta
        </h2>

        <div className="flex flex-col gap-1">
          <label className="font-light text-[#1C1B1F]">Email</label>
          <input
            type="text"
            className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-800"
          />
          <label className="font-light">Senha</label>
          <input
            type="password"
            className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-800"
          />
        </div>

        <div className="flex justify-between">
          <p>Lembrar de mim</p>
          <a className="text-violet-800">Esqueceu a senha?</a>
        </div>
        <button className="h-10 rounded-sm bg-violet-800 text-white w-full">
          Entrar
        </button>
        <div className="flex justify-center gap-1">
          <span>Não possui conta? </span>
          <a href="" className="text-violet-800 hover:underline">
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
