export default function Loading() {
  return (
    <div className="container-x pb-24 pt-6" role="status" aria-label="Loading property">
      <div className="skeleton h-3 w-64 rounded-chip" />
      <div className="mt-6 grid h-[min(62vh,560px)] grid-cols-4 grid-rows-2 gap-2">
        <div className="skeleton col-span-4 row-span-2 rounded-media md:col-span-2" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton hidden md:block" />
        ))}
      </div>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          <div className="skeleton h-12 w-3/4 rounded-chip" />
          <div className="skeleton mt-4 h-4 w-1/2 rounded-chip" />
          <div className="skeleton mt-12 h-48 rounded-card" />
        </div>
        <div className="skeleton hidden h-[480px] rounded-card lg:block" />
      </div>
    </div>
  );
}
