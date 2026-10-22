import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

type BottomSheetProps = {
  title: string;
  onClose: () => void;
  onClear?: () => void;
  footer: ReactNode;
  children: ReactNode;
};

function BottomSheet({ title, onClose, onClear, footer, children }: BottomSheetProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[#1A1A1A]/85"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex max-h-[calc(100dvh-40px)] flex-col rounded-t-[28px] bg-white"
      >
        <div className="flex justify-center pt-2.5">
          <span className="h-[5px] w-10 rounded-full bg-[#D6D6D1]" />
        </div>
        <div className="flex items-center justify-between border-b border-[#EAEAE6] px-5 pt-4 pb-[18px]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-[#F4F4F2]"
            >
              <X className="size-4 text-[#1A1A1A]" strokeWidth={2.2} />
            </button>
            <h2 className="text-[22px] leading-[26px] font-extrabold tracking-[-0.03em] text-[#1A1A1A]">
              {title}
            </h2>
          </div>
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="cursor-pointer text-sm leading-[18px] font-bold text-[#E8480C]"
            >
              Limpar
            </button>
          )}
        </div>
        <div className="overflow-y-auto px-5 pt-[22px] pb-[22px]">{children}</div>
        <div className="flex gap-2.5 border-t border-[#EAEAE6] px-5 pt-4 pb-[34px]">
          {footer}
        </div>
      </div>
    </div>
  );
}

export default BottomSheet;
