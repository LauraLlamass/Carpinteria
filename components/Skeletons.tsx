export function CardGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="min-h-56 animate-pulse rounded-lg border border-border bg-surface p-6"
        >
          <div className="h-3 w-16 rounded bg-muted" />
          <div className="mt-10 h-7 w-3/4 rounded bg-muted" />
          <div className="mt-5 h-3 w-full rounded bg-muted" />
          <div className="mt-3 h-3 w-5/6 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

export function ProjectGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-lg border border-border bg-surface p-4"
        >
          <div className="h-56 rounded-lg bg-muted" />
          <div className="mt-5 h-6 w-3/4 rounded bg-muted" />
          <div className="mt-4 h-3 w-full rounded bg-muted" />
          <div className="mt-3 h-3 w-2/3 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
