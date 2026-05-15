import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const updateProductSchema = z
  .object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().optional().nullable(),
    price: z.number().positive("El precio debe ser positivo").optional(),
    categoryId: z.string().cuid("El ID de categoria no es valido").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "No hay datos para actualizar",
  });

type ProductRouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: ProductRouteContext) {
  const { id } = await params;
  const body = await request.json();
  const result = updateProductSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Datos invalidos", details: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const product = await db.product.update({
      where: { id },
      data: result.data,
      include: { category: { select: { id: true, name: true } } },
    });

    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 },
    );
  }
}

export async function DELETE(_request: Request, { params }: ProductRouteContext) {
  const { id } = await params;

  try {
    await db.product.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 },
    );
  }
}
