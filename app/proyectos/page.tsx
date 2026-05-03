import { Suspense } from "react";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { ProjectGridSkeleton } from "@/components/Skeletons";

export const revalidate = 3600;

export const metadata = {
  title: "Proyectos | Carpintería Los Artesanos",
  description: "Galería de proyectos de carpintería a medida.",
};

export default function ProjectsPage() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Galería ISR"
          title="Obra reciente"
          description="Listado estático, rápido y revalidado cada hora para mantener la galería actualizada."
        />

        <div className="mt-10">
          <Suspense fallback={<ProjectGridSkeleton />}>
            <ProjectGrid />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
