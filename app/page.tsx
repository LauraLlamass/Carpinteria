import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { LogoMark } from "@/components/LogoMark";
import { ProjectGrid } from "@/components/ProjectGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceGrid } from "@/components/ServiceGrid";
import { CardGridSkeleton, ProjectGridSkeleton } from "@/components/Skeletons";

const process = [
  {
    title: "El plano",
    description: "Medimos, escuchamos y trazamos la ruta del proyecto.",
  },
  {
    title: "El laberinto",
    description: "Convertimos restricciones de espacio en soluciones claras.",
  },
  {
    title: "Las alas",
    description: "Elevamos la pieza con proporciones, acabados y detalle.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="bg-background px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div className="flex items-start gap-4">
            <LogoMark className="mt-1 size-12" />
            <SectionTitle
              eyebrow="Servicios destacados"
              title="Muebles, restauración y estructura con carácter de taller"
              description="Una carpintería boutique no produce en serie: interpreta cada encargo como una pieza única."
            />
          </div>

          <Suspense fallback={<CardGridSkeleton />}>
            <ServiceGrid />
          </Suspense>
        </div>
      </section>

      <section className="bg-primary px-6 py-20 text-surface">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            inverted
            eyebrow="Método Dédalo"
            title="Del laberinto al mueble preciso"
            description="Cada encargo pasa por un proceso de lectura, diseño y fabricación donde el detalle guía la salida."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {process.map((step) => (
              <article
                key={step.title}
                className="rounded-lg border border-background p-6"
              >
                <LogoMark variant="light" className="size-10" />
                <h3 className="mt-8 font-serif text-2xl text-secondary">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-surface">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Proyectos recientes"
            title="Resumen de obra destacada"
            description="Una muestra de espacios y piezas donde la madera actúa como arquitectura cercana."
          />

          <div className="mt-10">
            <Suspense fallback={<ProjectGridSkeleton />}>
              <ProjectGrid featured />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
