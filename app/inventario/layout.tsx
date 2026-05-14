import { InventoryShell } from "@/components/inventario/InventoryShell";

export default function InventarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <InventoryShell>{children}</InventoryShell>;
}
