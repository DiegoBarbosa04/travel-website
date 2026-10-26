import type { Review } from "@/services/review.service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, type ReviewForm } from "@/schemas/review.schema";
import { api } from "@/services/api";
import { toast } from "sonner";
import StarRatingInput from "./StarRatingInput";

interface MyReviewsTabProps {
  reviews: Review[];
  setReviews: Dispatch<SetStateAction<Review[]>>;
}

const formatRating = (rating: number) =>
  rating.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const formatReviewDate = (date: string) =>
  new Date(date)
    .toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
    .replace(/\./g, "")
    .replace(/ de /g, " ");

const secondaryButtonClassName =
  "flex h-12 flex-1 cursor-pointer items-center justify-center rounded-[14px] border border-[#D6D6D1] text-[15px] font-bold text-[#1A1A1A] transition-colors hover:border-[#1A1A1A]";

function IconButton({
  label,
  icon,
  danger = false,
  onClick,
}: {
  label: string;
  icon: string;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#D6D6D1] transition-colors lg:size-11 ${
        danger ? "text-[#C23A07] hover:border-[#C23A07]" : "text-[#1A1A1A] hover:border-[#1A1A1A]"
      }`}
    >
      <svg viewBox="0 0 24 24" className="size-[15px] lg:size-4" aria-hidden="true">
        <path
          d={icon}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function MyReviewsTab({ reviews, setReviews }: MyReviewsTabProps) {
  const { register, handleSubmit, reset, control, formState } = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      text: "",
      rating: 5,
    },
  });

  const [editingId, setEditingId] = useState<Review["id"] | null>(null);
  const [deletingId, setDeletingId] = useState<Review["id"] | null>(null);

  const startEditing = (review: Review) => {
    setEditingId(review.id);
    reset({
      text: review.text,
      rating: review.rating,
    });
  };

  const handleEditReview = async (data: ReviewForm) => {
    try {
      const response = await api.put(`/reviews/${editingId}`, data);
      setReviews((prev) =>
        prev.map((review) => (review.id === editingId ? response.data : review)),
      );
      setEditingId(null);
      toast.success("Avaliação alterada com sucesso");
    } catch {
      toast.error("Erro ao alterar avaliação");
    }
  };

  const handleDeleteReview = async () => {
    const id = deletingId;
    setDeletingId(null);
    try {
      await api.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((review) => review.id !== id));
      toast.success("Avaliação removida com sucesso");
    } catch {
      toast.error("Erro ao apagar avaliação");
    }
  };

  if (reviews.length === 0) {
    return (
      <p className="py-8 text-[15px] leading-6 text-[#5C5C58]">
        Você ainda não fez nenhuma avaliação.
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      {reviews.map((review) => (
        <article
          key={review.id}
          className="flex flex-col gap-3 border-b border-[#EAEAE6] py-6 lg:flex-row lg:items-start lg:gap-8 lg:py-8"
        >
          <div className="flex items-start justify-between lg:contents">
            <span
              aria-hidden="true"
              className="h-8 w-10 shrink-0 text-[64px] leading-12 font-extrabold text-[#E8480C] lg:h-11 lg:text-[80px] lg:leading-14"
            >
              “
            </span>
            <div className="flex gap-2 lg:order-last lg:w-24 lg:justify-end">
              <IconButton
                label="Editar avaliação"
                icon="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4"
                onClick={() => startEditing(review)}
              />
              <IconButton
                label="Apagar avaliação"
                icon="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"
                danger
                onClick={() => setDeletingId(review.id)}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2.5 lg:gap-3.5">
            <p className="text-lg leading-[26px] font-medium tracking-[-0.01em] text-[#1A1A1A] lg:text-2xl lg:leading-8 lg:font-semibold lg:tracking-[-0.02em]">
              {review.text}
            </p>
            <div className="flex items-center gap-3">
              <span
                aria-label={`Nota ${review.rating} de 5`}
                className="text-[13px] leading-4 tracking-widest lg:w-22 lg:shrink-0 lg:text-[15px] lg:leading-5"
              >
                <span className="text-[#FFC400]">{"★".repeat(review.rating)}</span>
                <span className="text-[#D6D6D1]">{"★".repeat(5 - review.rating)}</span>
              </span>
              <span className="text-[13px] leading-4 text-[#5C5C58] lg:text-sm lg:leading-[18px]">
                {formatRating(review.rating)} · {formatReviewDate(review.createdAt)}
              </span>
            </div>
          </div>
        </article>
      ))}

      <Dialog open={editingId !== null} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent className="rounded-3xl p-6 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold tracking-[-0.03em] text-[#1A1A1A]">
              Editar avaliação
            </DialogTitle>
            <DialogDescription className="sr-only">
              Altere o texto e a nota da sua avaliação.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleEditReview)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[15px] font-bold text-[#1A1A1A]">Sua nota</span>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <StarRatingInput value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
            <textarea
              {...register("text")}
              aria-label="Comentário"
              maxLength={500}
              className="h-32 w-full resize-none rounded-[14px] border border-[#D6D6D1] px-4 py-3 text-base leading-6 text-[#1A1A1A] outline-none focus:border-[#E8480C] focus:ring-4 focus:ring-[#FFEDE4]"
            />
            {formState.errors.text?.message && (
              <p className="text-sm text-red-600" role="alert">
                {formState.errors.text.message}
              </p>
            )}
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className={secondaryButtonClassName}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex h-12 flex-1 cursor-pointer items-center justify-center rounded-[14px] bg-[#E8480C] text-[15px] font-bold text-white transition-colors hover:bg-[#B8360A]"
              >
                Salvar
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deletingId !== null} onOpenChange={(open) => !open && setDeletingId(null)}>
        <DialogContent className="rounded-3xl p-6 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold tracking-[-0.03em] text-[#1A1A1A]">
              Apagar avaliação?
            </DialogTitle>
            <DialogDescription className="text-[15px] text-[#5C5C58]">
              Ela deixa de aparecer na página inicial. Essa ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setDeletingId(null)}
              className={secondaryButtonClassName}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleDeleteReview}
              className="flex h-12 flex-1 cursor-pointer items-center justify-center rounded-[14px] bg-[#C23A07] text-[15px] font-bold text-white transition-colors hover:bg-[#9E2F05]"
            >
              Apagar
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MyReviewsTab;
