import Link from "next/link";
import { DaedalusMark } from "@/components/DaedalusMark";
import { buttonVariants } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/sobre-nosotros", label: "Taller" },
  { href: "/proyectos", label: "Obra" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  return (
    <header className="border-b border-border bg-background/95 text-foreground">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-primary text-primary-foreground">
            <DaedalusMark className="size-6" />
          </span>
          <span>
            <span className="block font-serif text-2xl font-semibold leading-none text-primary">
              Carpintería Los Artesanos
            </span>
            <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-accent">
              Atelier Dédalo
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contacto"
            className={buttonVariants({
              size: "sm",
              className: "rounded-full px-4",
            })}
          >
            Presupuesto
          </Link>
        </div>
      </nav>
    </header>
  );
}
