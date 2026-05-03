import Image from "next/image";
import Link from "next/link";
import { DaedalusMark } from "@/components/DaedalusMark";

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTIwMCcgaGVpZ2h0PSc2MzAnIHZpZXdCb3g9JzAgMCAxMjAwIDYzMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nMTIwMCcgaGVpZ2h0PSc2MzAnIGZpbGw9JyNENEM0QTQnLz48cmVjdCB4PScxNTAnIHk9JzExMCcgd2lkdGg9JzkwMCcgaGVpZ2h0PSc0MTAnIHJ4PScyNCcgZmlsbD0nI0Y3RjNFQycgZmlsbC1vcGFjaXR5PScuNTUnLz48L3N2Zz4=";

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
      className="group block rounded-lg border border-border bg-surface p-4 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      <div className="relative mb-5 h-56 overflow-hidden rounded-lg bg-secondary">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          placeholder="blur"
          blurDataURL={blurDataURL}
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
