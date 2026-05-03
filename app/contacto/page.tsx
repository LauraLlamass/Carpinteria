import { ContactForm } from "@/components/ContactForm";
import { SectionTitle } from "@/components/SectionTitle";

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
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
