function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <section className="mx-auto max-w-5xl rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
        <div className="grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <div>
            <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
              Tailwind configurado
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Explore seu próximo destino com estilo
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Agora o projeto está usando classes do Tailwind para criar layouts
              modernos e responsivos.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
              >
                Começar agora
              </a>
              <a
                href="#"
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Ver destinos
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-linear-to-br from-sky-500 to-indigo-600 p-6 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-100">
              Popular
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Maldivas</h2>
            <p className="mt-3 text-sm text-sky-50">
              Praia, mergulho e um pôr do sol inesquecível.
            </p>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-xs text-sky-100">A partir de</p>
                <p className="text-3xl font-semibold">R$ 1.299</p>
              </div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-sm">
                4.9 ★
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
