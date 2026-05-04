import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Solicita presupuesto para tu proyecto de carpintería a medida y recibe una primera valoración del taller.",
  alternates: {
    canonical: "/contacto",
  },
  openGraph: {
    title: "Contacto para proyectos de carpintería",
    description:
      "Comparte medidas, materiales e idea inicial para valorar tu proyecto a medida.",
    url: "/contacto",
  },
};

export default function ContactPage() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionTitle
            eyebrow="Contacto"
            title="Cuéntanos el laberinto que quieres resolver"
            description="Comparte medidas, idea inicial y necesidades. Te responderemos con una primera valoración del proyecto."
          />

        
        </div>

        <div className="rounded-lg border border-border bg-surface p-6">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
