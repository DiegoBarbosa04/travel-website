import { Star } from "lucide-react";
import type { Review } from "@/services/review.service";

interface MyReviewsTabProps {
  reviews: Review[];
}

function MyReviewsTab({ reviews }: MyReviewsTabProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Minhas avaliações</h2>
      <div className="rounded-3xl border border-[#E5E7EB] bg-[#F8FBF9] p-6">
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {review.text}
                  </p>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    {review.createdAt}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index < review.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-slate-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyReviewsTab;
