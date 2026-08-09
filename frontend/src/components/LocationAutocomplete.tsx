import { useEffect, useState } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { searchLocations, type Location } from "@/services/location.service";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
}

export default function LocationAutocomplete<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Location[]>([]);
  const [selectedLabel, setSelectedLabel] = useState("");

  useEffect(() => {
    if (search.length < 2) {
      setOptions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await searchLocations(search);

        setOptions(response);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="min-w-45 flex-1">
          <label className="mb-2 block text-sm font-medium">{label}</label>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full justify-between font-medium text-[#112211] rounded-md border border-[#CCCCCC] bg-white px-3 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DD3BB] overflow-hidden"
              >
                {selectedLabel || placeholder}

                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-87 p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder={placeholder}
                  value={search}
                  onValueChange={setSearch}
                />

                <CommandList>
                  {loading && (
                    <div className="flex justify-center py-6">
                      <Loader2 className="size-5 animate-spin" />
                    </div>
                  )}

                  {!loading && (
                    <>
                      <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

                      <CommandGroup>
                        {options.map((location) => (
                          <CommandItem
                            key={location.id}
                            value={location.iataCode}
                            onSelect={() => {
                              field.onChange(location.iataCode);

                              setSelectedLabel(location.name);

                              setSearch("");

                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2",
                                field.value === location.iataCode
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />

                            {location.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  );
}
