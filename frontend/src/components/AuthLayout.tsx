import type { ReactNode } from "react";
import { Link } from "react-router";
import AuthCollage, { type BoardingPass, type Polaroid } from "@/components/AuthCollage";

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
    <main className="min-h-screen bg-[#F4F4F2] lg:flex lg:p-4">
      <section className="mx-auto flex w-full max-w-[480px] flex-col lg:mx-0 lg:w-[520px] lg:max-w-none lg:shrink-0 lg:justify-between lg:gap-10 lg:px-16 lg:py-10 xl:w-[640px] xl:pr-24 xl:pl-[104px]">
        <header className="px-6 pt-6 pb-4 lg:p-0">
          <Link
            to="/"
            aria-label="Decolando — página inicial"
            className="flex w-fit items-center gap-[7px] rounded-lg focus-visible:ring-4 focus-visible:ring-[#E8480C]/20 focus-visible:outline-none lg:gap-2"
          >
            <svg
              viewBox="0 0 64 57"
              className="h-[23px] w-[26px] shrink-0 lg:h-[27px] lg:w-[30px]"
              aria-hidden="true"
            >
              <path
                d="M49.921 35.967L12 52.967C19.5 37.555 18.715 36.067 36.043 36.012L49.921 35.967Z"
                fill="#E8480C"
              />
              <path
                d="M0 0L8.077 0.046C14.107 0.079 16.607 0.216 21.216 4.505L28.941 12.806L35.525 19.386L44.406 27.099L48.493 30.102C53.342 33.361 58.607 35.704 64 37.952L39.812 37.905C35.544 37.897 29.269 38.391 25.093 37.201C22.039 36.332 19.375 34.66 17.269 32.355C13.714 28.465 10.832 21.859 8.46 17.073L0 0Z"
                fill="#E8480C"
              />
            </svg>
            <span className="text-[22px] leading-6 font-bold tracking-[-0.04em] text-[#1A1A1A] lg:text-2xl lg:leading-7 lg:font-extrabold lg:tracking-[-0.03em]">
              Decolando
            </span>
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
          className={`flex flex-col gap-7 px-6 pt-7 lg:w-full lg:max-w-[420px] lg:p-0 ${compact ? "lg:gap-6" : "lg:gap-9"}`}
        >
          <div
            className={`flex flex-col gap-2.5 ${compact ? "lg:gap-3" : "lg:gap-3.5"}`}
          >
            <p className="text-xs leading-4 font-bold tracking-[0.14em] text-[#E8480C] uppercase">
              {eyebrow}
            </p>
            <h1
              className={`text-4xl leading-[38px] font-extrabold tracking-[-0.04em] text-[#1A1A1A] lg:max-w-none ${compact ? "max-w-[330px] lg:text-[42px] lg:leading-[44px]" : "max-w-[300px] lg:text-5xl lg:leading-[50px]"}`}
            >
              {title}
            </h1>
            <p className="text-[15px] leading-[23px] text-[#5C5C58] lg:text-base lg:leading-[26px]">
              {description}
            </p>
          </div>

          {children}
        </div>

        <p className="flex items-center justify-center gap-1.5 px-6 pt-7 pb-8 text-sm leading-5 text-[#5C5C58] lg:justify-start lg:p-0">
          {footer}
        </p>
      </section>

      <aside
        className={`relative hidden flex-1 overflow-hidden rounded-[28px] lg:block ${collageBackground}`}
      >
        <div className="absolute top-1/2 left-1/2 h-[868px] w-[768px] -translate-x-1/2 -translate-y-1/2 lg:max-xl:scale-[0.6] xl:max-[1439px]:scale-[0.8]">
          <AuthCollage {...collage.desktop} />
        </div>
      </aside>
    </main>
  );
}

export default AuthLayout;
