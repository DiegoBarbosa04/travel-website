import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, type ReviewForm } from "@/schemas/review.schema";
import { api } from "@/services/api";

function ReviewsTab() {
  const form = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
  });

  const handleReview = async (data: ReviewForm) => {
    api.post("/reviews/", data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleReview)}
      className="flex h-full flex-col justify-between gap-6"
    >
      <div className="rounded-3xl border border-[#E5E7EB] bg-[#F8FBF9] p-5">
        <label className="text-xs uppercase tracking-[0.22em] text-slate-400 mb-2 block">
          Comentário
        </label>
        <textarea
          {...form.register("text")}
          placeholder="Compartilhe sua experiência..."
          className="min-h-40 w-full resize-none rounded-[1.5rem] border border-transparent bg-white px-4 py-4 text-sm text-slate-900 outline-none focus:border-[#8DD3BB] focus:ring-2 focus:ring-[#8DD3BB]/20"
        />
      </div>

      <div className="rounded-3xl border border-[#E5E7EB] bg-[#F8FBF9] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <label className="text-xs uppercase tracking-[0.22em] text-slate-400 mb-2 block">
              Classificação
            </label>
            <select
              {...form.register("rating", {
                valueAsNumber: true,
              })}
              className="w-full rounded-3xl border border-transparent bg-white px-4 py-3 text-base text-slate-900 outline-none focus:border-[#8DD3BB] focus:ring-2 focus:ring-[#8DD3BB]/20"
            >
              <option value="5">5 estrelas</option>
              <option value="4">4 estrelas</option>
              <option value="3">3 estrelas</option>
              <option value="2">2 estrelas</option>
              <option value="1">1 estrela</option>
            </select>
          </div>
        </div>
      </div>
      <Button type="submit" className="px-6 py-4">
        Enviar avaliação
      </Button>
    </form>
  );
}

export default ReviewsTab;
