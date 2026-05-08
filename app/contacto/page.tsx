import type { Metadata } from "next";
import { MessageCenter } from "@/components/MessageCenter";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Solicita presupuesto para tu proyecto de carpinteria a medida desde el apartado de mensajes de la web.",
  alternates: {
    canonical: "/contacto",
  },
  openGraph: {
    title: "Contacto para proyectos de carpinteria",
    description:
      "Comparte medidas, materiales e idea inicial en una conversacion interna con copia opcional por email.",
    url: "/contacto",
  },
};

export default function ContactPage() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <MessageCenter />
      </div>
    </section>
  );
}
