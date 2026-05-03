"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DaedalusMark } from "@/components/DaedalusMark";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-nosotros", label: "Taller" },
  { href: "/proyectos", label: "Obra" },
  { href: "/contacto", label: "Contacto" },
];

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background/95 text-foreground">
      <nav className="mx-auto max-w-6xl px-6 py-5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-primary text-background">
              <DaedalusMark className="size-6" />
            </span>
            <span>
              <span className="block font-serif text-2xl font-semibold leading-none text-primary">
                Carpintería Las Artesanas
              </span>
              <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-accent">
                Atelier Dédalo
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-3 text-sm font-medium md:flex">
            {navItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 transition-colors duration-200 hover:bg-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                    isActive && "bg-muted text-accent",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="rounded-full border border-border bg-background p-2 text-primary transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:hidden"
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {isMenuOpen ? (
          <div className="mt-5 grid gap-2 border-t border-border pt-5 text-sm font-medium md:hidden">
            {navItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-3 transition-colors hover:bg-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    isActive && "bg-muted text-accent",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
