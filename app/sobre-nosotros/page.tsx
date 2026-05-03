import Image from "next/image";
import { DaedalusMark } from "@/components/DaedalusMark";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "Taller | Carpintería Los Artesanos",
  description: "Conoce el taller, el método de trabajo y la inspiración Dédalo.",
};

export default function AboutPage() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionTitle
            eyebrow="Taller"
            title="El oficio como forma de resolver laberintos"
            description="Trabajamos cada encargo desde la escucha, el plano y la materia. Dédalo inspira nuestra manera de pensar: técnica, imaginación y precisión al servicio del espacio."
          />

          <div className="mt-10 flex items-center gap-4 rounded-lg border border-border bg-card p-6">
            <DaedalusMark className="size-12 text-accent" />
            <p className="text-sm leading-6 text-muted-foreground">
              El símbolo del taller une alas y laberinto: construir soluciones
              que eleven la vida cotidiana.
            </p>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-border bg-secondary">
          <Image
            src="/images/workshop-process.svg"
            alt="Mesa de trabajo con plano de carpintería"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
