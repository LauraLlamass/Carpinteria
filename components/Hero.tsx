import Image from "next/image";
import Link from "next/link";
import { DaedalusMark } from "@/components/DaedalusMark";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-background px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-between border-y border-border py-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              Atelier Dédalo · Taller boutique
            </p>

            <h1 className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.96] text-primary md:text-7xl">
              Laberintos de madera resueltos a medida
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              Diseñamos mobiliario, cocinas y espacios singulares con la
              precisión de un plano antiguo y la calidez de un taller vivo.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/proyectos"
              className={buttonVariants({
                size: "lg",
                className: "rounded-full px-6",
              })}
            >
              Ver obra
            </Link>

            <Link
              href="/contacto"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "rounded-full px-6",
              })}
            >
              Hablar del proyecto
            </Link>
          </div>
        </div>

        <div className="relative min-h-[560px] overflow-hidden rounded-lg border border-border bg-secondary p-6">
          <div className="absolute right-6 top-6 z-10 rounded-full border border-primary/20 bg-background/85 p-5 text-primary">
            <DaedalusMark className="size-16" />
          </div>

          <div className="grid h-full grid-cols-5 gap-4">
            <div className="col-span-2 flex flex-col justify-end gap-4">
              <div className="relative h-40 overflow-hidden rounded-lg bg-background">
                <Image
                  src="/images/workshop-process.svg"
                  alt="Plano de taller de carpintería a medida"
                  fill
                  sizes="(min-width: 1024px) 18vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="rounded-lg bg-primary p-5 text-primary-foreground">
                <p className="font-serif text-2xl text-secondary">
                  Oficio y mito
                </p>
                <p className="mt-3 text-sm leading-6 text-primary-foreground/75">
                  El laberinto como símbolo de espacios complejos convertidos
                  en soluciones precisas.
                </p>
              </div>
            </div>

            <div className="col-span-3 flex flex-col gap-4 pt-24">
              <div className="relative h-64 overflow-hidden rounded-lg bg-secondary">
                <Image
                  src="/images/workshop-hero.svg"
                  alt="Muestras de madera y taller artesanal"
                  fill
                  priority
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 rounded-lg bg-card" />
                <div className="h-32 rounded-lg bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
