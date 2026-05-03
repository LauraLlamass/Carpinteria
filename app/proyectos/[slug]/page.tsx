import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DaedalusMark } from "@/components/DaedalusMark";
import { getProjectBySlug, getProjectSlugs } from "@/data/projects";

export const revalidate = 3600;
export const dynamicParams = false;

type ProjectDetailParams = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProjectSlugs();
}

export async function generateMetadata({
  params,
}: ProjectDetailParams): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = `/proyectos/${project.slug}`;

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailParams) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

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
              {project.year} · {project.materials.join(", ")}
            </p>
            <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight text-primary">
              {project.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {project.detail}
            </p>

            <div className="mt-10 rounded-lg border border-border bg-surface p-6">
              <div className="flex items-center gap-4">
                <DaedalusMark className="size-12 text-accent" />
                <p className="text-sm leading-6 text-muted-foreground">
                  Proyecto resuelto con el método Dédalo: lectura del espacio,
                  precisión de taller y acabado duradero.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.materials.map((material) => (
                  <span
                    key={material}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground"
                  >
                    {material}
                  </span>
                ))}
              </div>
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
