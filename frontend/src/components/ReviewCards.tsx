import { Star } from "lucide-react";

type Review = {
  firstName: string;
  lastName: string;
  stars: number;
  comment: string;
};

const reviews: Review[] = [
  {
    firstName: "Ana",
    lastName: "Souza",
    stars: 5,
    comment: "Experiência incrível! Atendimento rápido e destino maravilhoso.",
  },
  {
    firstName: "Carlos",
    lastName: "Menezes",
    stars: 4,
    comment:
      "Ótimo custo-benefício e suporte atencioso durante toda a reserva.",
  },
  {
    firstName: "Beatriz",
    lastName: "Almeida",
    stars: 5,
    comment: "Viagem perfeita com excelente orientação em cada etapa.",
  },
  {
    firstName: "Eduardo",
    lastName: "Pereira",
    stars: 4,
    comment: "O passeio superou as expectativas e o serviço foi muito gentil.",
  },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="min-w-[20rem] rounded-[1.5rem] border border-[#E5E7EB] bg-white px-5 py-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Avaliação de
          </p>
          <p className="text-base font-semibold text-slate-950">
            {review.firstName} {review.lastName}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={16}
              className={
                index < review.stars
                  ? "text-yellow-500 fill-current"
                  : "text-slate-300"
              }
            />
          ))}
        </div>
      </div>
      <p className="text-sm leading-6 text-slate-600">{review.comment}</p>
    </div>
  );
}

function ReviewCards() {
  return (
    <div className="w-full overflow-hidden rounded-[2rem] border border-[#E5E7EB] bg-[#F8FBF9] p-5 shadow-sm">
      <div className="flex flex-col gap-5">
        <div className="flex overflow-hidden">
          <div className="flex animate-scroll gap-4">
            {reviews.map((review, index) => (
              <ReviewCard key={`top-${index}`} review={review} />
            ))}
            {reviews.map((review, index) => (
              <ReviewCard key={`top-copy-${index}`} review={review} />
            ))}
          </div>
        </div>
        <div className="flex overflow-hidden">
          <div className="flex animate-scroll-reverse gap-4">
            {[...reviews].reverse().map((review, index) => (
              <ReviewCard key={`bottom-${index}`} review={review} />
            ))}
            {[...reviews].reverse().map((review, index) => (
              <ReviewCard key={`bottom-copy-${index}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCards;
