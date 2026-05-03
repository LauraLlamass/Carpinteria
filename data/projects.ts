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
    slug: "piano-restaurado",
    title: "Piano restaurado en madera noble",
    description: "Restauración de un piano vertical integrado en un salón.",
    image: "/images/project-mesa-roble.jpg",
    imageAlt: "Piano restaurado en madera noble junto a plantas de interior",
    materials: ["Madera noble", "Barniz satinado", "Restauración manual"],
    year: "2026",
    detail:
      "Una pieza con presencia doméstica, restaurada para recuperar brillo, protección y continuidad visual con el resto del espacio.",
  },
  {
    slug: "cocina",
    title: "Reforma de cocina",
    description: "Cocina completa con mobiliario a medida.",
    image: "/images/project-cocina.jpg",
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
    image: "/images/project-armario.jpg",
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
