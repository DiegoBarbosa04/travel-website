import type { ReactNode } from "react";
import { Link } from "react-router";
import AuthCollage, { type BoardingPass, type Polaroid } from "@/components/AuthCollage";
import Logo from "@/components/Logo";
import { animationDelay } from "@/lib/utils";

type Collage = {
  polaroids: Polaroid[];
  boardingPass: BoardingPass;
};

type AuthLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
  collage: { desktop: Collage; mobile: Collage };
  compact?: boolean;
};

const collageBackground =
  "bg-[#E6E6E1] bg-[radial-gradient(circle_farthest-corner_at_55%_45%,#F0F0EC_0%,#E2E2DD_70%)]";

function AuthLayout({
  eyebrow,
  title,
  description,
  footer,
  children,
  collage,
  compact = false,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#F4F4F2] lg:flex lg:p-4 lg:short:p-3">
      <section className="mx-auto flex w-full max-w-[480px] flex-col lg:mx-0 lg:w-[520px] lg:max-w-none lg:shrink-0 lg:justify-between lg:gap-10 lg:px-16 lg:py-10 lg:short:gap-6 lg:short:py-5 lg:shorter:gap-4 lg:shorter:py-3 xl:w-[640px] xl:pr-24 xl:pl-[104px]">
        <header className="px-6 pt-6 pb-4 lg:p-0">
          <Link
            to="/"
            aria-label="Decolando — página inicial"
            className="block w-fit rounded-lg focus-visible:ring-4 focus-visible:ring-[#E8480C]/20 focus-visible:outline-none"
          >
            <Logo
              className="gap-[7px] lg:gap-2"
              markClassName="h-[23px] w-[26px] lg:h-[27px] lg:w-[30px]"
              textClassName="text-[22px] leading-6 lg:text-2xl lg:leading-7 lg:font-extrabold lg:tracking-[-0.03em]"
            />
          </Link>
        </header>

        <div className="px-4 pt-1 lg:hidden">
          <div
            className={`relative h-[232px] overflow-hidden rounded-[28px] ${collageBackground}`}
          >
            <div className="absolute inset-y-0 left-1/2 w-[358px] -translate-x-1/2">
              <AuthCollage size="sm" {...collage.mobile} />
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col gap-7 px-6 pt-7 lg:w-full lg:max-w-[420px] lg:p-0 ${compact ? "lg:gap-6 lg:short:gap-4 lg:shorter:gap-3" : "lg:gap-9 lg:short:gap-5 lg:shorter:gap-4"}`}
        >
          <div
            className={`animate-rise flex flex-col gap-2.5 ${compact ? "lg:gap-3" : "lg:gap-3.5"} lg:short:gap-2`}
          >
            <p className="text-xs leading-4 font-bold tracking-[0.14em] text-[#E8480C] uppercase lg:shorter:hidden">
              {eyebrow}
            </p>
            <h1
              className={`text-4xl leading-[38px] font-extrabold tracking-[-0.04em] text-[#1A1A1A] lg:max-w-none ${compact ? "max-w-[330px] lg:text-[42px] lg:leading-[44px] lg:short:text-[34px] lg:short:leading-9" : "max-w-[300px] lg:text-5xl lg:leading-[50px] lg:short:text-[40px] lg:short:leading-[42px]"}`}
            >
              {title}
            </h1>
            <p className="text-[15px] leading-[23px] text-[#5C5C58] lg:text-base lg:leading-[26px] lg:short:text-[15px] lg:short:leading-6">
              {description}
            </p>
          </div>

          <div className="animate-rise" style={animationDelay(150)}>
            {children}
          </div>
        </div>

        <p className="flex items-center justify-center gap-1.5 px-6 pt-7 pb-8 text-sm leading-5 text-[#5C5C58] lg:justify-start lg:p-0">
          {footer}
        </p>
      </section>

      <aside
        className={`relative hidden flex-1 overflow-hidden rounded-[28px] lg:block ${collageBackground}`}
      >
        <div className="absolute top-1/2 left-1/2 h-[868px] w-[768px] -translate-x-1/2 -translate-y-1/2 [--scale-h:1] [--scale-w:1] [scale:min(var(--scale-w),var(--scale-h))] short:[--scale-h:0.8] shorter:[--scale-h:0.7] lg:max-xl:[--scale-w:0.6] xl:max-[1439px]:[--scale-w:0.8]">
          <AuthCollage {...collage.desktop} />
        </div>
      </aside>
    </main>
  );
}

export default AuthLayout;
