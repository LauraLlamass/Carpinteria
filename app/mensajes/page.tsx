import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { MessageCenter } from "@/components/MessageCenter";
import { authOptions } from "@/lib/auth";

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

export default async function MessagesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/mensajes");
  }

  const ownerEmail = process.env.OWNER_EMAIL?.toLowerCase();
  const userEmail = session.user.email;
  const isOwner = Boolean(ownerEmail && userEmail.toLowerCase() === ownerEmail);

  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <MessageCenter
          isOwner={isOwner}
          userEmail={userEmail}
          userName={session.user.name}
        />
      </div>
    </section>
  );
}
