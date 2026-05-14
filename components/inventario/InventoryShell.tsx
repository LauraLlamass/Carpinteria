"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Boxes,
  FolderTree,
  Home,
  LogOut,
  Menu,
  MoreVertical,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/inventario", label: "Dashboard", icon: Home, match: "/inventario" },
  { href: "/inventario/productos", label: "Productos", icon: Boxes, match: "/inventario/productos" },
  { href: "/inventario/categorias", label: "Categorias", icon: FolderTree, match: "/inventario/categorias" },
  { href: "/inventario#messages", label: "Messages", icon: Boxes },
];

function InventoryNav({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {links.map((item) => {
        const Icon = item.icon;
        const isActive = item.match
          ? item.match === "/inventario"
            ? pathname === item.match
            : pathname.startsWith(item.match)
          : false;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "relative flex h-10 items-center gap-3 rounded-r-[8px] px-4 text-sm font-semibold transition-colors",
              isActive
                ? "rounded-l-[8px] bg-background text-primary shadow-sm md:-mr-6 md:rounded-r-none md:pr-10"
                : "text-primary/75 hover:bg-background hover:text-primary"
            )}
          >
            <Icon className="size-4.5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function InventoryShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary p-2 text-primary md:grid md:place-items-center">
      <div className="w-full max-w-[calc(100vw-1rem)] overflow-hidden rounded-[8px] bg-background shadow-sm md:grid md:min-h-[680px] md:grid-cols-[230px_1fr]">
        <aside className="hidden bg-surface/70 p-6 md:flex md:flex-col">
          <Link href="/inventario" className="mb-8 font-serif text-2xl font-semibold">
            Smartech
          </Link>

          <div className="mb-7 flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-full bg-secondary font-serif text-lg font-semibold">
              C
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Carpinteria</p>
              <p className="truncate text-xs text-muted-foreground">
                Taller interno
              </p>
            </div>
          </div>

          <InventoryNav />

          <Link
            href="/inventario"
            className="mt-auto flex h-10 items-center gap-3 rounded-[8px] px-4 text-sm font-semibold text-primary/75"
          >
            <LogOut className="size-4.5" />
            <span>Log out</span>
          </Link>
        </aside>

        <div>
        <header className="sticky top-2 z-40 flex h-14 items-center gap-3 rounded-[8px] bg-surface px-4 shadow-sm backdrop-blur md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  title="Abrir menu"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-surface">
              <SheetHeader>
                <SheetTitle>Inventario</SheetTitle>
              </SheetHeader>
              <div className="px-4">
                <InventoryNav onNavigate={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <span className="font-serif text-lg font-semibold">Inventario</span>
        </header>

        <section className="w-full p-3 md:p-5">
          <div>
            <div className="mb-5 hidden items-center justify-between gap-4 md:flex">
              <h1 className="text-2xl font-bold tracking-normal">HELLO, TALLER!</h1>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-80 items-center gap-2 rounded-full bg-surface px-4 text-xs text-muted-foreground shadow-sm ring-1 ring-primary/10">
                  <Search className="size-4" />
                  <span>search</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  title="Notificaciones"
                >
                  <Bell />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  title="Mas opciones"
                >
                  <MoreVertical />
                </Button>
              </div>
            </div>
            {children}
          </div>
        </section>
        </div>
      </div>
    </div>
  );
}
