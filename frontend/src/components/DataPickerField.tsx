import { useState } from "react";
import { CalendarDays } from "lucide-react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
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
}

export default function DatePickerField<T extends FieldValues>({
  control,
  name,
  label,
}: DatePickerFieldProps<T>) {
  const [open, setOpen] = useState(false);

  const formatDate = (date?: Date) => {
    if (!date) return "Escolha uma data";

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="min-w-55sflex-1">
          <label className="mb-2 block text-sm font-medium text-[#112211]">
            {label}
          </label>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full justify-between rounded-md border border-[#CCCCCC] bg-white px-3 text-left font-normal"
              >
                <span className="truncate">{formatDate(field.value)}</span>

                <CalendarDays className="ml-2 h-4 w-4 text-muted-foreground" />
              </Button>
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
