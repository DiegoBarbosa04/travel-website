import { useState } from "react";
import { CalendarDays } from "lucide-react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  variant?: "default" | "field";
  className?: string;
}

export default function DatePickerField<T extends FieldValues>({
  control,
  name,
  label,
  variant = "default",
  className,
}: DatePickerFieldProps<T>) {
  const [open, setOpen] = useState(false);

  const formatDate = (date?: Date) => {
    if (!date) return "Escolha uma data";

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: variant === "field" ? "2-digit" : "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={cn(variant === "default" && "min-w-55sflex-1", className)}>
          {variant === "default" && (
            <label className="mb-2 block text-sm font-medium text-[#112211]">
              {label}
            </label>
          )}

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              {variant === "field" ? (
                <button
                  type="button"
                  className="flex size-full cursor-pointer flex-col gap-1 rounded-[14px] border border-[#D6D6D1] px-[18px] py-3.5 text-left outline-none transition-colors hover:border-[#1A1A1A] focus-visible:border-[#E8480C] focus-visible:ring-4 focus-visible:ring-[#FFEDE4] lg:px-5 lg:py-4"
                >
                  <span className="text-[13px] leading-4 font-semibold text-[#5C5C58]">
                    {label}
                  </span>
                  <span
                    className={cn(
                      "truncate text-base leading-5",
                      field.value
                        ? "font-semibold text-[#1A1A1A]"
                        : "text-[#8F8F8A]",
                    )}
                  >
                    {formatDate(field.value)}
                  </span>
                </button>
              ) : (
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full justify-between rounded-md border border-[#CCCCCC] bg-white px-3 text-left font-normal"
              >
                <span className="truncate">{formatDate(field.value)}</span>

                <CalendarDays className="ml-2 h-4 w-4 text-muted-foreground" />
              </Button>
              )}
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  );
}
