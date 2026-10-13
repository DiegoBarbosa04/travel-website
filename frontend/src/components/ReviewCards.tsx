import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getReviews, type PublicReview } from "@/services/review.service";

const fallbackReviews: PublicReview[] = [
  {
    id: "fallback-1",
    text: "Campanha em massa e transcrição de áudio no mesmo lugar. A equipe deixou de ouvir áudio de cinco minutos para achar o pedido.",
    rating: 5,
    createdAt: "",
    user: { firstName: "Diego", lastName: "B." },
  },
  {
    id: "fallback-2",
    text: "Campanha em massa e transcrição de áudio no mesmo lugar. A equipe deixou de ouvir áudio de cinco minutos para achar o pedido.",
    rating: 5,
    createdAt: "",
    user: { firstName: "Diego", lastName: "B." },
  },
  {
    id: "fallback-3",
    text: "Encontramos opções de voo com rapidez e conseguimos organizar toda a viagem em um só lugar. Recomendo muito.",
    rating: 5,
    createdAt: "",
    user: { firstName: "Marina", lastName: "S." },
  },
];

function ReviewCard({ review }: { review: PublicReview }) {
  return (
    <article className="flex h-44 w-80 shrink-0 flex-col justify-between rounded-2xl bg-[#F1F3FC] px-6 py-5 shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
      <p className="fs-corpo line-clamp-4 text-black">
        {review.text}
      </p>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="fs-legenda flex h-9 w-9 items-center justify-center rounded-full bg-blue-primary font-semibold text-white">
            {review.user.firstName[0]}
            {review.user.lastName[0]}
          </span>
          <span className="fs-corpo font-semibold text-black">
            {review.user.firstName} {review.user.lastName}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={14}
              className="fill-[#FFC400] text-[#FFC400]"
            />
          ))}
        </div>
      </div>
    </article>
  );
}

function ReviewCards() {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await getReviews();

        setReviews(response);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
        setReviews(fallbackReviews);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  if (loading) {
    return null;
  }

  const baseReviews = reviews.length > 0 ? reviews : fallbackReviews;

  // Garante itens suficientes para preencher a largura do trilho.
  const visibleReviews: PublicReview[] = [];
  while (visibleReviews.length < 4) {
    visibleReviews.push(...baseReviews);
  }

  return (
    <div className="relative flex w-full items-center overflow-hidden py-4">
      <div className="absolute left-0 z-10 h-full w-24 bg-linear-to-r from-[#FAFBFC] to-transparent" />

      <div className="flex animate-scroll">
        <div className="flex shrink-0 items-center gap-6 px-3">
          {visibleReviews.map((review, index) => (
            <ReviewCard key={`a-${review.id}-${index}`} review={review} />
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-6 px-3" aria-hidden="true">
          {visibleReviews.map((review, index) => (
            <ReviewCard key={`b-${review.id}-${index}`} review={review} />
          ))}
        </div>
      </div>

      <div className="absolute right-0 z-10 h-full w-24 bg-linear-to-l from-[#FAFBFC] to-transparent" />
    </div>
  );
}

export default ReviewCards;
