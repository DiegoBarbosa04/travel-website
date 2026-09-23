import { Skeleton } from "./ui/skeleton";

function CardFlightSkeleton() {
  return (
    <div className="flex bg-white rounded-lg overflow-hidden w-full shadow-md">
      <div className="flex flex-col bg-white p-6 gap-5 flex-1">
        <div className="flex justify-between items-center gap-3 w-full">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-6 w-40" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div className="flex justify-between gap-2 items-center w-full">
          <div className="flex flex-col items-center gap-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-28" />
          </div>

          <Skeleton className="h-8 w-32" />

          <div className="flex flex-col items-center gap-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>
      </div>

      <div className="h-full border border-dashed"></div>

      <div className="flex flex-col items-center justify-between p-6 gap-4 min-w-55">
        <Skeleton className="h-8 w-28" />

        <Skeleton className="h-10 w-28 rounded-full" />
      </div>
    </div>
  );
}

export default CardFlightSkeleton;