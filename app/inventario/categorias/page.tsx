import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const categories = [
  {
    name: "Muebles",
    description: "Mesas, sillas, estanterías y piezas de mobiliario.",
  },
  {
    name: "Carpintería interior",
    description: "Armarios, puertas, revestimientos y trabajos a medida.",
  },
  {
    name: "Restauración",
    description: "Piezas antiguas restauradas o en proceso de reparación.",
  },
];

export default function CategoriasPage() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="secondary">Inventario</Badge>
        <h1 className="mt-3 font-serif text-3xl font-semibold">Categorías</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Familias usadas para organizar los productos de la carpintería.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.name}>
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {category.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
