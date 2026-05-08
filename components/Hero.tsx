import Image from "next/image";
import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-background px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            Atelier Dédalo · Taller boutique
          </p>

          <h1 className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.96] text-primary md:text-7xl">
            Laberintos de madera resueltos a medida
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-primary md:text-lg">
            Diseñamos mobiliario, cocinas y espacios singulares con la
            precisión de un plano antiguo y la calidez de un taller vivo.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/proyectos"
              className={buttonVariants({
                size: "lg",
                className:
                  "rounded-full bg-secondary px-6 !text-primary hover:bg-accent hover:!text-surface",
              })}
            >
              Ver obra
            </Link>

            <Link
              href="/mensajes"
              className={buttonVariants({
                size: "lg",
                className:
                  "rounded-full bg-primary px-6 !text-secondary hover:bg-accent hover:!text-surface",
              })}
            >
              Escribir mensaje
            </Link>
          </div>
        </div>

        <div className="relative min-h-[560px] overflow-hidden rounded-lg border border-background bg-secondary">
          <Image
            src="/images/workshop-hero.jpg"
            alt="Taller artesanal con muestras de madera"
            fill
            priority
            quality={78}
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover"
          />

          <div className="absolute right-6 top-6 z-10 rounded-full border border-primary bg-background p-5 text-primary">
            <LogoMark className="size-16" />
          </div>

          <div className="absolute bottom-6 left-6 right-6 grid gap-4 md:grid-cols-[0.75fr_1fr]">
            <div className="relative min-h-36 overflow-hidden rounded-lg border border-background bg-background">
              <Image
                src="/images/workshop-process.jpg"
                alt="Plano de taller de carpintería a medida"
                fill
                quality={72}
                sizes="(min-width: 1024px) 20vw, 80vw"
                className="object-cover"
              />
            </div>

            <div className="rounded-lg bg-primary p-5 text-surface">
              <p className="font-serif text-2xl text-secondary">
                Oficio y mito
              </p>
              <p className="mt-3 text-sm leading-6 text-surface">
                El laberinto como símbolo de espacios complejos convertidos en
                soluciones precisas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
