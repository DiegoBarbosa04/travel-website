import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  textClassName?: string;
};

function Logo({ className, markClassName, textClassName }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 64 57"
        className={cn("h-7 w-[31px] shrink-0", markClassName)}
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
      <span
        className={cn(
          "text-[28px] leading-7 font-bold tracking-[-0.04em] text-[#1A1A1A]",
          textClassName,
        )}
      >
        Decolando
      </span>
    </span>
  );
}

export default Logo;
