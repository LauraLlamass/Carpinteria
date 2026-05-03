export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  materials: string[];
  year: string;
  detail: string;
};

const projects: Project[] = [
  {
    slug: "mesa-roble",
    title: "Mesa de roble macizo",
    description: "Mesa artesanal fabricada en roble con acabado natural.",
    image: "/images/project-mesa-roble.svg",
    imageAlt: "Mesa de roble macizo realizada en taller artesanal",
    materials: ["Roble macizo", "Aceite natural", "Ensamble tradicional"],
    year: "2026",
    detail:
      "Una pieza central para comedor, diseñada con proporciones sobrias, veta visible y un acabado natural pensado para el uso diario.",
  },
  {
    slug: "cocina",
    title: "Reforma de cocina",
    description: "Cocina completa con mobiliario a medida.",
    image: "/images/project-cocina.svg",
    imageAlt: "Cocina con muebles de carpintería a medida",
    materials: ["Madera lacada", "Nogal", "Herrajes ocultos"],
    year: "2026",
    detail:
      "Un proyecto integral donde cada módulo se adapta al espacio, equilibrando almacenaje, resistencia y una presencia cálida.",
  },
  {
    slug: "armario",
    title: "Armario empotrado",
    description: "Armario diseñado para maximizar el espacio.",
    image: "/images/project-armario.svg",
    imageAlt: "Armario empotrado fabricado a medida",
    materials: ["Chapa natural", "Tablero técnico", "Herrajes ocultos"],
    year: "2025",
    detail:
      "Un armario limpio y funcional, concebido para aprovechar cada centímetro sin romper la arquitectura de la habitación.",
  },
];

export async function getProjects() {
  return projects;
}

export async function getFeaturedProjects() {
  return projects.slice(0, 3);
}

export async function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export async function getProjectSlugs() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
