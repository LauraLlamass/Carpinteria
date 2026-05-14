import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const createCategorySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").max(100),
  description: z.string().optional(),
});

export async function GET() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = createCategorySchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Datos invalidos", details: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const category = await db.category.create({ data: result.data });
    return NextResponse.json(category, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Ya existe una categoria con ese nombre" },
      { status: 409 },
    );
  }
}
