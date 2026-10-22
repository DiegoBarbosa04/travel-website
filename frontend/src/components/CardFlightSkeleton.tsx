import { Skeleton } from "./ui/skeleton";

function CardFlightSkeleton() {
  return (
    <div className="flex flex-col rounded-3xl border border-[#E2E2DD] bg-white lg:flex-row">
      <div className="flex flex-col lg:flex-1 lg:flex-row lg:items-center lg:gap-8 lg:px-8 lg:py-7">
        <div className="flex items-center gap-3.5 px-[18px] pt-[18px] lg:w-47.5 lg:shrink-0 lg:p-0">
          <Skeleton className="size-10 rounded-full lg:size-12" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>

        <div className="flex items-center gap-4 p-[18px] lg:flex-1 lg:p-0">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-3 w-10" />
          </div>
          <Skeleton className="h-px flex-1" />
          <div className="flex flex-col items-end gap-1.5">
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t-[1.5px] border-dashed border-[#D6D6D1] px-[18px] pt-3.5 pb-[18px] lg:w-60 lg:shrink-0 lg:flex-col lg:items-stretch lg:justify-center lg:border-t-0 lg:border-l-[1.5px] lg:px-8 lg:py-7">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-8 w-28" />
        </div>
        <Skeleton className="h-11 w-32 rounded-xl lg:w-full" />
      </div>
    </div>
  );
}

export default CardFlightSkeleton;
