import { Edit, Star, Trash2 } from "lucide-react";
import type { Review } from "@/services/review.service";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, type ReviewForm } from "@/schemas/review.schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { api } from "@/services/api";
import { toast } from "sonner";

interface MyReviewsTabProps {
  reviews: Review[];
  setReviews: Dispatch<SetStateAction<Review[]>>;
}

interface EditingReview {
  text: string;
  rating: number;
}

function MyReviewsTab({ reviews, setReviews }: MyReviewsTabProps) {
  const { register, handleSubmit, reset, control } = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      text: "",
      rating: 1,
    },
  });

  const [idInEditing, setIdInEditing] = useState<Review["id"] | null>(null);

  const handleEditingForId = (review: Review) => {
    setIdInEditing(review.id);
    reset({
      text: review.text,
      rating: review.rating,
    });
  };

  const handleEditReview = async (data: EditingReview) => {
    try {
      const response = await api.put(`/reviews/${idInEditing}`, data);
      setReviews((prev) =>
        prev.map((review) =>
          review.id === idInEditing ? response.data : review,
        ),
      );
      toast.success("Avaliação alterada com sucesso");
    } catch (error) {
      toast.error("Erro ao alterar avaliação");
    }
  };

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

              <div className="flex justify-between">
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {review.text}
                </p>

                <div className="flex gap-2 items-center">
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        onClick={() => handleEditingForId(review)}
                        variant={"outline"}
                        className="rounded-md p-2 cursor-pointer"
                      >
                        <Edit size={20} />
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar avaliação</DialogTitle>
                      </DialogHeader>

                      <form onSubmit={handleSubmit(handleEditReview)}>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="text">Descrição</label>
                            <Input
                              {...register("text")}
                              id="text"
                              name="text"
                              placeholder="Digite aqui seu comentário"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <label htmlFor="rating">Classificação</label>
                            <Controller
                              name="rating"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  value={field.value?.toString()}
                                  onValueChange={(value) =>
                                    field.onChange(Number(value))
                                  }
                                >
                                  <SelectTrigger className="w-full max-w-48">
                                    <SelectValue placeholder="Escolha de 1 a 5" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="1">
                                        1 estrelas
                                      </SelectItem>
                                      <SelectItem value="2">
                                        2 estrelas
                                      </SelectItem>
                                      <SelectItem value="3">
                                        3 estrelas
                                      </SelectItem>
                                      <SelectItem value="4">
                                        4 estrelas
                                      </SelectItem>
                                      <SelectItem value="5">
                                        5 estrelas
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                        </div>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              onClick={() => setIdInEditing(null)}
                              variant="outline"
                            >
                              Cancelar
                            </Button>
                          </DialogClose>

                          <DialogClose asChild>
                            <Button type="submit">Salvar</Button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant={"destructive"}
                    className=" rounded-md p-2  cursor-pointer"
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyReviewsTab;
