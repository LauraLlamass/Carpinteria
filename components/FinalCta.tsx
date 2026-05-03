import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type FinalCtaProps = {
  title?: string;
  description?: string;
};

export function FinalCta({
  title = "¿Tienes un proyecto parecido?",
  description = "Cuéntanos medidas, materiales e idea inicial. Te responderemos con una primera valoración del taller.",
}: FinalCtaProps) {
  return (
    <section className="mt-16 rounded-lg border border-border bg-primary px-6 py-10 text-background md:px-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-serif text-3xl font-semibold">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-background/75">
            {description}
          </p>
        </div>

        <Link
          href="/contacto"
          className={buttonVariants({
            variant: "secondary",
            size: "lg",
            className: "rounded-full px-6",
          })}
        >
          Pide tu presupuesto
        </Link>
      </div>
    </section>
  );
}
