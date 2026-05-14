import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const furniture = await prisma.category.create({
    data: {
      name: "Muebles",
      description: "Mesas, estanterias y piezas de mobiliario a medida.",
    },
  });

  const interior = await prisma.category.create({
    data: {
      name: "Carpinteria interior",
      description: "Armarios, puertas, revestimientos y soluciones integradas.",
    },
  });

  const materials = await prisma.category.create({
    data: {
      name: "Materiales",
      description: "Maderas, barnices, herrajes y consumibles del taller.",
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Mesa de roble",
        description: "Mesa artesanal de roble macizo para comedor.",
        price: "780.00",
        stock: 3,
        categoryId: furniture.id,
      },
      {
        name: "Estanteria modular",
        description: "Modulo configurable para salon o estudio.",
        price: "420.00",
        stock: 5,
        categoryId: furniture.id,
      },
      {
        name: "Banco de entrada",
        description: "Banco bajo con almacenaje interior.",
        price: "260.00",
        stock: 4,
        categoryId: furniture.id,
      },
      {
        name: "Armario a medida",
        description: "Armario empotrado con acabado lacado.",
        price: "1450.00",
        stock: 1,
        categoryId: interior.id,
      },
      {
        name: "Puerta corredera",
        description: "Puerta interior de madera con guia vista.",
        price: "390.00",
        stock: 2,
        categoryId: interior.id,
      },
      {
        name: "Frente de cocina",
        description: "Frente de cocina en madera tratada.",
        price: "980.00",
        stock: 1,
        categoryId: interior.id,
      },
      {
        name: "Tablero de roble",
        description: "Tablero cepillado para fabricacion de muebles.",
        price: "95.50",
        stock: 18,
        categoryId: materials.id,
      },
      {
        name: "Barniz satinado",
        description: "Barniz protector para acabado interior.",
        price: "24.90",
        stock: 7,
        categoryId: materials.id,
      },
      {
        name: "Bisagras de laton",
        description: "Juego de bisagras para puertas y armarios.",
        price: "12.75",
        stock: 34,
        categoryId: materials.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
