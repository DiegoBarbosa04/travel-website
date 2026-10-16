import type { ReactNode } from "react";
import { Link } from "react-router";
import hero from "@/assets/hero.webp";
import logo from "@/assets/Logos/Logo-preta.webp";

type AuthLayoutProps = {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
  compact?: boolean;
};

function AuthLayout({
  title,
  description,
  footer,
  children,
  compact = false,
}: AuthLayoutProps) {
  return (
    <main
      className={`relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAFBFC] px-3 sm:px-6 ${compact ? "py-2 sm:py-3" : "py-6 sm:py-8"}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 size-96 rounded-full bg-[#0D2EFC]/5 blur-3xl"
      />

      <div
        className="relative grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-[#EAEFF3] bg-white shadow-[0_30px_100px_-45px_rgba(2,11,61,0.35)] lg:min-h-[680px] lg:grid-cols-2"
      >
        <section
          className={`flex items-center px-6 sm:px-10 lg:px-12 ${compact ? "py-6 sm:py-7 lg:py-5" : "py-10 sm:py-12 lg:py-14"}`}
        >
          <div className="mx-auto w-full max-w-[420px]">
            <Link
              to="/"
              aria-label="Decolando — página inicial"
              className="mx-auto flex w-fit rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0D2EFC]/20"
            >
              <img className="h-auto w-40" src={logo} alt="Decolando" />
            </Link>

            <div className={compact ? "mt-5" : "mt-9"}>
              <h1
                className={`${compact ? "text-3xl" : "fs-titulo"} font-extrabold text-[#020B3D]`}
              >
                {title}
              </h1>
              <p
                className={`${compact ? "mt-2 text-sm leading-6" : "mt-3 text-base leading-7"} text-[#526078]`}
              >
                {description}
              </p>
            </div>

            {children}

            <div
              className={`${compact ? "mt-5 pt-4" : "mt-8 pt-5"} border-t border-[#EAEFF3] text-center text-sm text-[#526078]`}
            >
              {footer}
            </div>
          </div>
        </section>

        <aside className="relative hidden min-h-full overflow-hidden bg-[#020B3D] lg:block">
          <img
            src={hero}
            alt="Avião voando acima das nuvens sob um céu azul"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020B3D]/95 via-[#020B3D]/20 to-[#020B3D]/10" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-10 xl:p-12">
            <p className="max-w-lg text-3xl font-bold leading-tight xl:text-4xl">
              O mundo é grande. Sua próxima história também.
            </p>
            <p className="mt-3 max-w-md text-base leading-7 text-white/80">
              Encontre voos, descubra destinos e planeje experiências para
              lembrar por toda a vida.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default AuthLayout;
