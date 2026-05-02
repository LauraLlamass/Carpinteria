import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/data/services";

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

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              index={index + 1}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
