import { Suspense } from "react";
import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceGrid } from "@/components/ServiceGrid";
import { CardGridSkeleton } from "@/components/Skeletons";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios de carpintería artesanal, mobiliario a medida, restauración y carpintería estructural.",
  alternates: {
    canonical: "/servicios",
  },
  openGraph: {
    title: "Servicios de carpintería artesanal",
    description:
      "Diseño, fabricación y restauración de piezas de madera hechas a medida.",
    url: "/servicios",
  },
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
