import Image from "next/image";
import Link from "next/link";
import { DaedalusMark } from "@/components/DaedalusMark";

type ProjectCardProps = {
  title: string;
  description: string;
  slug: string;
  image: string;
  imageAlt: string;
};

export function ProjectCard({
  title,
  description,
  slug,
  image,
  imageAlt,
}: ProjectCardProps) {
  return (
    <Link
      href={`/proyectos/${slug}`}
      className="group block rounded-lg border border-border bg-card p-4 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="relative mb-5 h-56 overflow-hidden rounded-lg bg-secondary">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-primary">
          <span className="rounded bg-background px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
            Obra
          </span>
          <DaedalusMark className="size-10 opacity-70" />
        </div>
      </div>

      <h3 className="font-serif text-xl font-semibold text-primary transition group-hover:text-accent">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </Link>
  );
}
