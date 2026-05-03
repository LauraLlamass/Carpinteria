import { CardGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-5 h-12 w-full max-w-xl animate-pulse rounded bg-muted" />
        <div className="mt-4 h-4 w-full max-w-2xl animate-pulse rounded bg-muted" />
        <div className="mt-12">
          <CardGridSkeleton />
        </div>
      </div>
    </section>
  );
}
