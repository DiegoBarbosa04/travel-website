import Header from "../assets/components/Header";

function Home() {
  return (
    <div className="h-screen flex flex-col items-center gap-4 bg-[#FAFBFC]">
      <Header />
      <div>
        <h1>Bem-vindo à nossa página inicial</h1>
        <p>Explore nossos serviços e produtos.</p>
      </div>

      <div>
        <h2>Para onde você quer ir?</h2>
        <select
          className="border border-[#CCCCCC] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#8DD3BB]"
          name="estado"
          id="estado"
        >
          <option value="rj">Rio de Janeiro</option>
          <option value="sp">São Paulo</option>
          <option value="mg">Minas Gerais</option>
        </select>
      </div>
    </div>
  );
}

export default Home;
