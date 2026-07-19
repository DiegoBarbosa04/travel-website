import { Button } from "./ui/button";

const historySearches = [
  {
    id: 1,
    destination: "09/07/2026",
    passengers: "1 adulto",
    searchedAt: "16/07/2026",
  },
  {
    id: 2,
    destination: "10/07/2026",
    passengers: "2 adultos",
    searchedAt: "16/07/2026",
  },
  {
    id: 3,
    destination: "11/07/2026",
    passengers: "1 adulto",
    searchedAt: "15/07/2026",
  },
];

function SearchHistoryTab() {
  return (
    <div className="flex h-full flex-col gap-6">
      {historySearches.map((item) => (
        <div
          key={item.id}
          className="rounded-3xl border border-[#E5E7EB] bg-[#F8FBF9] p-6 shadow-sm"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 space-y-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Última pesquisa
                </p>
                <p className="text-base font-medium text-slate-900">
                  {item.destination}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Passageiros
                </p>
                <p className="text-base font-medium text-slate-900">
                  {item.passengers}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Pesquisado em
                </p>
                <p className="text-base font-medium text-slate-900">
                  {item.searchedAt}
                </p>
              </div>
            </div>

            <Button variant="outline" size="sm" className="shrink-0 px-5 py-3">
              Pesquisar novamente
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchHistoryTab;
