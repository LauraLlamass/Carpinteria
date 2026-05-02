type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  inverted?: boolean;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  inverted = false,
}: SectionTitleProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={
          inverted
            ? "mt-3 font-serif text-3xl font-semibold text-secondary md:text-4xl"
            : "mt-3 font-serif text-3xl font-semibold text-primary md:text-4xl"
        }
      >
        {title}
      </h2>

      {description ? (
        <p
          className={
            inverted
              ? "mt-4 text-base leading-7 text-primary-foreground/70"
              : "mt-4 text-base leading-7 text-muted-foreground"
          }
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
