import { ProjectCard } from "@/components/ProjectCard";
import { SectionTitle } from "@/components/SectionTitle";
import { projects } from "@/data/projects";

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

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              description={project.description}
              slug={project.slug}
              image={project.image}
              imageAlt={project.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
