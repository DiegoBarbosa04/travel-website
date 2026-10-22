import { Outlet, useMatches } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function AppLayout() {
  // Rotas com barra própria no mobile (ex.: detalhes do voo) marcam `handle.hideHeaderOnMobile`.
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
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
