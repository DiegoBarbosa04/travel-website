function Login() {
  const img =
    "https://plus.unsplash.com/premium_photo-1679830513886-e09cd6dc3137?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dm9vfGVufDB8fDB8fHww";
  return (
    <div className="h-screen flex items-center justify-around ">
      <div className="flex flex-col gap-4 w-126 ">
        <p>logo</p>
        <div className="flex flex-col gap-1 mb-4">
          <h1 className="text-4xl font-bold">Entrar</h1>
          <h2 className="font-light text-md text-[#112211]">
            Entre na sua conta para desfrutar de todos os recursos do nosso
            site.
          </h2>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-light text-[#1C1B1F]">Email</label>
          <input
            type="text"
            className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DD3BB]"
          />
          <label className="font-light text-[#1C1B1F]">Senha</label>
          <input
            type="password"
            className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DD3BB]"
          />
        </div>

        <div className="flex justify-between">
          <p>Lembrar de mim</p>
          <a className="text-[#8DD3BB]">Esqueceu a senha?</a>
        </div>
        <button className="h-10 rounded-sm bg-[#8DD3BB] text-[#112211] font-semibold w-full">
          Entrar
        </button>
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
