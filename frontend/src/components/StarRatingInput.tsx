import { useState } from "react";

type StarRatingInputProps = {
  value: number;
  onChange: (value: number) => void;
};

function StarRatingInput({ value, onChange }: StarRatingInputProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = hovered ?? value;

  return (
    <div
      role="radiogroup"
      aria-label="Nota"
      className="flex gap-1"
      onMouseLeave={() => setHovered(null)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} ${star === 1 ? "estrela" : "estrelas"}`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          className={`cursor-pointer text-2xl leading-7 transition-colors ${
            star <= shown ? "text-[#FFC400]" : "text-[#E9D3C4]"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default StarRatingInput;
