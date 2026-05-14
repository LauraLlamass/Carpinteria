import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
  {
    name: "Mesa de roble",
    category: "Muebles",
    price: "780,00 €",
    stock: 3,
  },
  {
    name: "Armario a medida",
    category: "Carpintería interior",
    price: "1.450,00 €",
    stock: 1,
  },
  {
    name: "Estantería modular",
    category: "Muebles",
    price: "420,00 €",
    stock: 5,
  },
];

export default function ProductosPage() {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="secondary">Inventario</Badge>
        <h1 className="mt-3 font-serif text-3xl font-semibold">Productos</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Listado inicial de productos. Más adelante saldrá de PostgreSQL con
          Prisma.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Catálogo</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead className="text-right">Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.name}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
