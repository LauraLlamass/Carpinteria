import type { Metadata } from "next";
import { MessageCenter } from "@/components/MessageCenter";

export const metadata: Metadata = {
  title: "Mensajes",
  description:
    "Conversa con el taller desde la web y envia una copia del chat por correo cuando el cliente la necesite.",
  alternates: {
    canonical: "/mensajes",
  },
  openGraph: {
    title: "Mensajes del proyecto",
    description:
      "Apartado de mensajes para proyectos de carpinteria a medida con copia opcional por email.",
    url: "/mensajes",
  },
};

export default function MessagesPage() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <MessageCenter />
      </div>
    </section>
  );
}
