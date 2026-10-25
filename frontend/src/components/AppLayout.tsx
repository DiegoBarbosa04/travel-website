import { Outlet, useLocation, useMatches } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function AppLayout() {
  // Rotas com barra própria no mobile (ex.: detalhes do voo) marcam `handle.hideHeaderOnMobile`.
  const { pathname } = useLocation();
  const hideHeaderOnMobile = useMatches().some(
    (match) =>
      (match.handle as { hideHeaderOnMobile?: boolean } | undefined)
        ?.hideHeaderOnMobile,
  );

  return (
    <div className="min-h-screen bg-white">
      <div className={hideHeaderOnMobile ? "hidden lg:block" : undefined}>
        <Header />
      </div>
      {/* A `key` remonta o wrapper a cada rota para repetir o fade de entrada. */}
      <div key={pathname} className="animate-fade">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
