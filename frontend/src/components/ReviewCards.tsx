import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getReviews, type PublicReview } from "@/services/review.service";

function ReviewCard({ review }: { review: PublicReview }) {
  return (
    <div className="min-w-[20rem] rounded-[1.5rem] border border-[#E5E7EB] bg-white px-5 py-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Avaliação de
          </p>
          <p className="text-base font-semibold text-slate-950">
            {review.user.firstName} {review.user.lastName}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={16}
              className={
                index < review.rating
                  ? "text-yellow-500 fill-current"
                  : "text-slate-300"
              }
            />
          ))}
        </div>
      </div>
      <p className="text-sm leading-6 text-slate-600">{review.text}</p>
    </div>
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
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  if (loading) {
    return null;
  }

  if (reviews.length === 0) {
    return <p className="text-sm text-slate-500">Nenhuma avaliação ainda.</p>;
  }

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