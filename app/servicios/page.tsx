import { Suspense } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceGrid } from "@/components/ServiceGrid";
import { CardGridSkeleton } from "@/components/Skeletons";

export const metadata = {
  title: "Servicios | Carpintería Los Artesanos",
  description: "Servicios de carpintería artesanal y mobiliario a medida.",
};

export default function ServicesPage() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Servicios"
          title="Carpintería para espacios singulares"
          description="Diseño, fabricación y restauración con criterios de taller boutique."
        />

        <div className="mt-10">
          <Suspense fallback={<CardGridSkeleton />}>
            <ServiceGrid />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
