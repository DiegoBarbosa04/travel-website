import { useState, type KeyboardEvent } from "react";

type StarRatingInputProps = {
  value: number;
  onChange: (value: number) => void;
  invalid?: boolean;
};

const ratingLabels = ["Péssima", "Ruim", "Regular", "Boa", "Excelente"];

const STAR_PATH =
  "M12 2.8l2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 17.36 6.3 20.36l1.09-6.35-4.62-4.5 6.38-.93L12 2.8z";

function StarRatingInput({ value, onChange, invalid = false }: StarRatingInputProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = hovered ?? value;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      onChange(Math.min(5, value + 1));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      onChange(Math.max(1, value - 1));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div
          role="radiogroup"
          aria-label="Nota de 1 a 5 estrelas"
          aria-invalid={invalid}
          className="flex gap-1"
          onMouseLeave={() => setHovered(null)}
          onKeyDown={handleKeyDown}
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const active = star <= shown;
            return (
              <button
                key={star}
                type="button"
                role="radio"
                aria-checked={value === star}
                aria-label={`${star} ${star === 1 ? "estrela" : "estrelas"}: ${ratingLabels[star - 1]}`}
                tabIndex={value === star || (value === 0 && star === 1) ? 0 : -1}
                onClick={() => onChange(star)}
                onMouseEnter={() => setHovered(star)}
                className="cursor-pointer rounded-lg p-0.5 transition-transform outline-none hover:scale-110 focus-visible:ring-2 focus-visible:ring-[#E8480C]"
              >
                <svg viewBox="0 0 24 24" className="size-9 lg:size-10" aria-hidden="true">
                  <path
                    d={STAR_PATH}
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    className={`transition-colors ${
                      active
                        ? "fill-[#FFC400] stroke-[#E5A800]"
                        : `fill-white ${invalid ? "stroke-red-400" : "stroke-[#C9B5A7]"}`
                    }`}
                  />
                </svg>
              </button>
            );
          })}
        </div>
        <span aria-live="polite" className="text-[15px] leading-5 font-bold text-[#1A1A1A]">
          {shown > 0 ? (
            <>
              {ratingLabels[shown - 1]}{" "}
              <span className="font-medium text-[#5C5C58]">({shown} de 5)</span>
            </>
          ) : (
            <span className="font-medium text-[#8F8F8A]">Nenhuma nota selecionada</span>
          )}
        </span>
      </div>
      <p className="text-[13px] leading-4 text-[#5C5C58]">
        Clique em uma estrela para escolher sua nota: 1 é a pior e 5 é a melhor.
      </p>
    </div>
  );
}

export default StarRatingInput;
