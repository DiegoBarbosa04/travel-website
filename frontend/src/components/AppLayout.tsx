import { Outlet } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
