type ServiceCardProps = {
  index: number;
  title: string;
  description: string;
};

export function ServiceCard({ index, title, description }: ServiceCardProps) {
  return (
    <article className="rounded-lg border border-border bg-surface p-6 transition hover:-translate-y-1">
      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="mt-8 font-serif text-2xl font-semibold text-primary">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </article>
  );
}
