import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DaedalusMark } from "@/components/DaedalusMark";
import { getProjectBySlug, projects } from "@/data/projects";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado",
    };
  }

  return {
    title: `${project.title} | Carpintería Los Artesanos`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/proyectos"
          className="text-sm font-semibold uppercase tracking-[0.22em] text-accent"
        >
          Volver a proyectos
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {project.year} · {project.material}
            </p>
            <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight text-primary">
              {project.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {project.detail}
            </p>

            <div className="mt-10 flex items-center gap-4 rounded-lg border border-border bg-card p-6">
              <DaedalusMark className="size-12 text-accent" />
              <p className="text-sm leading-6 text-muted-foreground">
                Proyecto resuelto con el método Dédalo: lectura del espacio, precisión de taller y acabado duradero.
              </p>
            </div>
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-border bg-secondary">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 768px) 52vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
