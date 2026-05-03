import { ProjectGridSkeleton } from "@/components/Skeletons";

export default function ProjectsLoading() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-5 h-12 w-full max-w-xl animate-pulse rounded bg-muted" />
        <div className="mt-10">
          <ProjectGridSkeleton />
        </div>
      </div>
    </section>
  );
}
