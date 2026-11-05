export function CardSkeleton() {
  return (
    <div aria-hidden>
      <div className="skeleton aspect-[4/3] rounded-card" />
      <div className="skeleton mt-5 h-7 w-32 rounded-chip" />
      <div className="skeleton mt-3 h-4 w-4/5 rounded-chip" />
      <div className="skeleton mt-2 h-3 w-1/2 rounded-chip" />
      <div className="skeleton mt-5 h-3 w-full rounded-chip" />
    </div>
  );
}

export function ListingSkeleton() {
  return (
    <div className="container-x pb-24 pt-12" role="status" aria-label="Loading properties">
      <div className="skeleton h-3 w-40 rounded-chip" />
      <div className="skeleton mt-5 h-12 w-2/3 max-w-xl rounded-chip" />
      <div className="mt-12 grid gap-10 lg:grid-cols-[300px_1fr]">
        <div className="hidden space-y-4 lg:block">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-14 rounded-chip" />
          ))}
        </div>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
