import { useState, type ComponentProps } from "react";
import { EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function AuthInput({ className, ...props }: ComponentProps<"input">) {
  return (
    <Input
      className={cn(
        "h-[52px] rounded-[14px] border border-[#D6D6D1] bg-white px-4 text-[15px] leading-5 text-[#1A1A1A] placeholder:text-[#8F8F8A] focus-visible:border-[1.5px] focus-visible:border-[#E8480C] focus-visible:ring-4 focus-visible:ring-[#FFEDE4] md:text-[15px]",
        className,
      )}
      {...props}
    />
  );
}

function PasswordInput({ className, ...props }: ComponentProps<"input">) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <AuthInput
        type={visible ? "text" : "password"}
        className={cn("pr-12", className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        className="absolute inset-y-0 right-2 flex w-9 cursor-pointer items-center justify-center rounded-lg text-[#8F8F8A] transition-colors hover:text-[#1A1A1A] focus-visible:ring-2 focus-visible:ring-[#E8480C]/30 focus-visible:outline-none"
      >
        {visible ? (
          <EyeOff className="size-5" strokeWidth={1.8} />
        ) : (
          <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
            <path
              d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="12"
              r="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

export { AuthInput, PasswordInput };
