function Register() {
  const img =
    "https://plus.unsplash.com/premium_photo-1679830513886-e09cd6dc3137?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dm9vfGVufDB8fDB8fHww";
  return (
    <div className="h-screen flex items-center justify-around ">
      <img
        className="w-134 h-185 bg-no-repeat bg-cover rounded-3xl"
        src={img}
        alt="flight.png"
      />

      <div>
        <div className="flex flex-col gap-4 w-126 ">
          <p>logo</p>
          <div className="flex flex-col gap-1 mb-4">
            <h1 className="text-4xl font-bold">Registrar</h1>
            <h2 className="font-light text-md text-[#112211]">
              Crie sua conta para desfrutar de todos os recursos do nosso site.
            </h2>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex gap-4">
              <div>
                <label className="font-light text-[#1C1B1F]">
                  Primeiro nome
                </label>
                <input
                  type="text"
                  className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DD3BB]"
                />
              </div>

              <div>
                <label className="font-light text-[#1C1B1F]">Sobrenome</label>
                <input
                  type="text"
                  className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DD3BB]"
                />
              </div>
            </div>

            <label className="font-light text-[#1C1B1F]">Email</label>
            <input
              type="email"
              className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DD3BB]"
            />
            <label className="font-light text-[#1C1B1F]">Senha</label>
            <input
              type="password"
              className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DD3BB]"
            />
            <label className="font-light text-[#1C1B1F]">Confirmar senha</label>
            <input
              type="password"
              className="border border-[#79747E] rounded-sm h-10 w-full px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DD3BB]"
            />
          </div>

          <div>
            <span>
              Eu concordo com todos os <a className="text-[#FF8682]">Termos </a>
              e<a className="text-[#FF8682]"> Politicas de Privacidade</a>
            </span>
          </div>
          <button className="h-10 rounded-sm bg-[#8DD3BB] text-[#112211] font-semibold w-full">
            Registrar
          </button>
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
