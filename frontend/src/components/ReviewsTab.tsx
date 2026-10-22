import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, type ReviewForm } from "@/schemas/review.schema";
import { createReview, type Review } from "@/services/review.service";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import StarRatingInput from "./StarRatingInput";

interface ReviewsTabProps {
  onReviewCreated: (review: Review) => void;
}

function ReviewsTab({ onReviewCreated }: ReviewsTabProps) {
  const form = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { text: "", rating: 5 },
  });
  const {
    formState: { errors, isSubmitting },
  } = form;

  const handleCreateReview = async (data: ReviewForm) => {
    try {
      const createdReview = await createReview(data);
      form.reset();
      onReviewCreated(createdReview);
      toast.success("Avaliação criada com sucesso");
    } catch {
      toast.error("Erro ao criar avaliação");
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleCreateReview)}
      className="flex flex-col gap-4 rounded-[28px] bg-[#FFEDE4] px-[18px] py-[22px] lg:gap-5 lg:rounded-3xl lg:p-8"
    >
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <h3 className="text-xl leading-6 font-extrabold tracking-[-0.03em] text-[#1A1A1A] lg:text-2xl lg:leading-[30px]">
          Faça um comentário
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-[13px] leading-4 font-semibold text-[#5C5C58]">
            Sua nota
          </span>
          <Controller
            control={form.control}
            name="rating"
            render={({ field }) => (
              <StarRatingInput value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <textarea
          {...form.register("text")}
          aria-label="Comentário"
          aria-invalid={Boolean(errors.text)}
          placeholder="Compartilhe sua experiência: o que mais gostou, o que poderia melhorar…"
          className="h-30 w-full resize-none rounded-[14px] border border-[#F0D5C6] bg-white px-5 py-4 text-base leading-6 text-[#1A1A1A] outline-none placeholder:text-[#8F8F8A] focus:border-[#E8480C] focus:ring-4 focus:ring-white"
        />
        {errors.text?.message && (
          <p className="text-sm text-red-600" role="alert">
            {errors.text.message}
          </p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-xs leading-[18px] text-[#5C5C58] lg:text-sm">
          Sua avaliação aparece na página inicial com seu primeiro nome.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-[52px] shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-[14px] bg-[#E8480C] px-6 text-[15px] leading-[18px] font-bold text-white transition-colors hover:bg-[#B8360A] disabled:opacity-70"
        >
          {isSubmitting ? (
            <Spinner className="size-5 text-white" />
          ) : (
            <>
              Enviar avaliação
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default ReviewsTab;
