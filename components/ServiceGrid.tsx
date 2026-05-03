import { ServiceCard } from "@/components/ServiceCard";
import { getServices } from "@/data/services";

export async function ServiceGrid() {
  const services = await getServices();

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {services.map((service, index) => (
        <ServiceCard
          key={service.title}
          index={index + 1}
          title={service.title}
          description={service.description}
        />
      ))}
    </div>
  );
}
