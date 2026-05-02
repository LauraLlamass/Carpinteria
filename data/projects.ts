export type Project = {
  title: string;
  description: string;
  slug: string;
  year: string;
  material: string;
  image: string;
  imageAlt: string;
  detail: string;
};

export const projects: Project[] = [
  {
    title: "Mesa de roble macizo",
    description: "Mesa artesanal fabricada en roble con acabado natural.",
    slug: "mesa-roble",
    year: "2026",
    material: "Roble macizo",
    image: "/images/project-mesa-roble.svg",
    imageAlt: "Mesa de roble macizo realizada en taller artesanal",
    detail:
      "Una pieza central para comedor, diseñada con proporciones sobrias, veta visible y un acabado natural pensado para el uso diario.",
  },
  {
    title: "Reforma de cocina",
    description: "Cocina completa con mobiliario a medida.",
    slug: "cocina",
    year: "2026",
    material: "Madera lacada y nogal",
    image: "/images/project-cocina.svg",
    imageAlt: "Cocina con muebles de carpintería a medida",
    detail:
      "Un proyecto integral donde cada módulo se adapta al espacio, equilibrando almacenaje, resistencia y una presencia cálida.",
  },
  {
    title: "Armario empotrado",
    description: "Armario diseñado para maximizar el espacio.",
    slug: "armario",
    year: "2025",
    material: "Chapa natural y herrajes ocultos",
    image: "/images/project-armario.svg",
    imageAlt: "Armario empotrado fabricado a medida",
    detail:
      "Un armario limpio y funcional, concebido para aprovechar cada centímetro sin romper la arquitectura de la habitación.",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
