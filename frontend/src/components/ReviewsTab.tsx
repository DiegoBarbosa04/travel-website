import type { ReactNode } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, type ReviewForm } from "@/schemas/review.schema";
import { createReview, type Review } from "@/services/review.service";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import StarRatingInput from "./StarRatingInput";

interface ReviewsTabProps {
  onReviewCreated: (review: Review) => void;
}

function StepTitle({ id, step, children }: { id?: string; step: number; children: ReactNode }) {
  return (
    <span
      id={id}
      className="flex items-center gap-2.5 text-[15px] leading-5 font-bold text-[#1A1A1A] lg:text-base"
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#E8480C] text-[13px] text-white">
        {step}
      </span>
      {children}
    </span>
  );
}

function ReviewsTab({ onReviewCreated }: ReviewsTabProps) {
  const form = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { text: "", rating: 0 },
  });
  const {
    formState: { errors, isSubmitting },
  } = form;
  const textLength = useWatch({ control: form.control, name: "text" }).length;

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
      <h3 className="text-xl leading-6 font-extrabold tracking-[-0.03em] text-[#1A1A1A] lg:text-2xl lg:leading-[30px]">
        Avalie sua experiência
      </h3>

      <div
        role="group"
        aria-labelledby="review-rating-title"
        className="flex flex-col gap-3 rounded-[20px] bg-white p-4 lg:p-5"
      >
        <StepTitle id="review-rating-title" step={1}>
          Qual nota você dá para a sua viagem?
        </StepTitle>
        <Controller
          control={form.control}
          name="rating"
          render={({ field }) => (
            <StarRatingInput
              value={field.value}
              onChange={field.onChange}
              invalid={Boolean(errors.rating)}
            />
          )}
        />
        {errors.rating?.message && (
          <p className="text-sm text-red-600" role="alert">
            {errors.rating.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 rounded-[20px] bg-white p-4 lg:p-5">
        <label htmlFor="review-text">
          <StepTitle step={2}>Conte como foi</StepTitle>
        </label>
        <textarea
          {...form.register("text")}
          id="review-text"
          aria-invalid={Boolean(errors.text)}
          maxLength={500}
          placeholder="Compartilhe sua experiência, o que mais gostou e o que poderia melhorar"
          className="h-30 w-full resize-none rounded-[14px] border border-[#D6D6D1] bg-white px-4 py-3 text-base leading-6 text-[#1A1A1A] outline-none placeholder:text-[#8F8F8A] focus:border-[#E8480C] focus:ring-4 focus:ring-[#FFEDE4]"
        />
        <div className="flex items-start justify-between gap-3">
          {errors.text?.message ? (
            <p className="text-sm text-red-600" role="alert">
              {errors.text.message}
            </p>
          ) : (
            <p className="text-[13px] leading-4 text-[#5C5C58]">Mínimo de 10 caracteres.</p>
          )}
          <span className="shrink-0 text-[13px] leading-4 text-[#8F8F8A]">
            {textLength}/500
          </span>
        </div>
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
