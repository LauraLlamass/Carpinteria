import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const updateCategorySchema = z
  .object({
    name: z.string().min(1, "El nombre es obligatorio").max(100).optional(),
    description: z.string().optional().nullable(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "No hay datos para actualizar",
  });

type CategoryRouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: CategoryRouteContext) {
  const { id } = await params;
  const body = await request.json();
  const result = updateCategorySchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Datos invalidos", details: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const category = await db.category.update({
      where: { id },
      data: result.data,
    });

    return NextResponse.json(category);
  } catch {
    return NextResponse.json(
      { error: "Categoria no encontrada o nombre duplicado" },
      { status: 404 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: CategoryRouteContext,
) {
  const { id } = await params;

  const category = await db.category.findUnique({
    where: { id },
    include: { _count: { select: { products: true } } },
  });

  if (!category) {
    return NextResponse.json(
      { error: "Categoria no encontrada" },
      { status: 404 },
    );
  }

  if (category._count.products > 0) {
    return NextResponse.json(
      { error: "No se puede eliminar una categoria con productos asociados" },
      { status: 409 },
    );
  }

  await db.category.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
