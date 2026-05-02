import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
  title: "Contacto | Carpintería Los Artesanos",
  description: "Solicita presupuesto para tu proyecto de carpintería.",
};

export default function ContactPage() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <SectionTitle
          eyebrow="Contacto"
          title="Cuéntanos el laberinto que quieres resolver"
          description="Comparte medidas, idea inicial y necesidades. Te responderemos con una primera valoración del proyecto."
        />

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="grid gap-4">
            <input
              className="rounded-lg border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
              placeholder="Nombre"
            />
            <input
              className="rounded-lg border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
              placeholder="Email"
              type="email"
            />
            <textarea
              className="min-h-36 rounded-lg border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
              placeholder="Describe tu proyecto"
            />
            <Link
              href="mailto:hola@carpinterialosartesanos.local"
              className={buttonVariants({ className: "rounded-full" })}
            >
              Enviar consulta
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
