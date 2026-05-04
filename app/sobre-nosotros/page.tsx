import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/FinalCta";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Taller",
  description:
    "Conoce la historia de Carpintería Las Artesanas, el método de trabajo y el crecimiento del taller por España.",
  alternates: {
    canonical: "/sobre-nosotros",
  },
  openGraph: {
    title: "Historia del taller de carpintería artesanal",
    description:
      "Dos amigas, un pequeño taller y una forma artesanal de resolver proyectos de madera a medida.",
    url: "/sobre-nosotros",
    images: [
      {
        url: "/images/workshop-process.jpg",
        width: 1200,
        height: 630,
        alt: "Mesa de trabajo con plano de carpintería",
      },
    ],
  },
};

const milestones = [
  "Año 1: primeros encargos de restauración y muebles pequeños.",
  "Año 2: apertura del taller propio y primeras cocinas a medida.",
  "Año 3: colaboración con interioristas y estudios de arquitectura.",
  "Año 5: ampliación del equipo y proyectos en distintas ciudades de España.",
];

export default function AboutPage() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionTitle
              eyebrow="Historia del taller"
              title="Dos amigas, un plano y una idea que empezó entre virutas"
              description="Carpintería Las Artesanas nació de una conversación sencilla: si los muebles acompañan nuestra vida diaria, deberían pensarse con la misma atención con la que se diseña una casa."
            />

            <div className="mt-10 space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                Nuestra historia empezó hace cinco años, cuando decidimos
                alquilar un pequeño local para probar una intuición que
                llevábamos tiempo compartiendo. Somos Ana y Marina, amigas
                desde la escuela de diseño. Una venía del mundo de la
                restauración de piezas antiguas; la otra, del diseño de
                interiores y la planificación de espacios. Las dos sentíamos que
                muchos hogares necesitaban algo más que muebles bonitos:
                necesitaban soluciones pensadas para encajar con la forma real
                de vivir.
              </p>

              <p>
                Al principio trabajábamos con encargos modestos: una mesa
                heredada que pedía una segunda vida, una estantería imposible
                para una pared irregular, un armario que debía aprovechar hasta
                el último centímetro. Cada proyecto nos enseñó a escuchar antes
                de dibujar y a medir dos veces antes de cortar. Esa mezcla de
                paciencia, técnica y cercanía se convirtió pronto en la
                identidad del taller.
              </p>

              <p>
                Con el tiempo, el boca a boca hizo su parte. Llegaron cocinas
                completas, reformas de lofts, muebles para estudios creativos y
                piezas especiales para viviendas familiares. Lo que había nacido
                como un taller de barrio empezó a recibir encargos desde otras
                ciudades. Cinco años después, hemos ampliado el equipo, hemos
                afinado los procesos y estamos creciendo por toda España sin
                perder la misma filosofía inicial: cada pieza la pensamos desde
                el espacio, el material y la persona que va a usarla.
              </p>
            </div>
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-border bg-secondary">
            <Image
              src="/images/workshop-process.jpg"
              alt="Mesa de trabajo con plano de carpintería"
              fill
              quality={78}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-14 rounded-lg border border-border bg-surface p-6 md:p-8">
          <h2 className="font-serif text-3xl font-semibold text-primary">
            Proceso artesanal
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
            Cada encargo lo empezamos leyendo el espacio, proponiendo
            materiales, dibujando un plano técnico y fabricando con cuidado en
            taller. No se trata solo de producir una pieza, sino de resolver un
            uso: abrir mejor una cocina, ordenar una habitación, recuperar un
            mueble familiar o dar carácter a una estancia.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {milestones.map((milestone) => (
              <p
                key={milestone}
                className="rounded-lg bg-muted px-4 py-3 text-sm text-foreground"
              >
                {milestone}
              </p>
            ))}
          </div>
        </div>

        <FinalCta
          title="Ven con una idea, sal con un plano"
          description="Traducimos referencias, medidas y necesidades en una propuesta fabricable, duradera y ajustada al espacio real."
        />
      </div>
    </section>
  );
}
