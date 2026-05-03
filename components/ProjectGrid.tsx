import { ProjectCard } from "@/components/ProjectCard";
import { getFeaturedProjects, getProjects } from "@/data/projects";

type ProjectGridProps = {
  featured?: boolean;
};

export async function ProjectGrid({ featured = false }: ProjectGridProps) {
  const projects = featured ? await getFeaturedProjects() : await getProjects();

  return (
    <div className="grid gap-6 md:grid-cols-3">
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
  );
}
