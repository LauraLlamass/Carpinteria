import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

function getInitial(name?: string | null, email?: string | null) {
  return (name ?? email ?? "U").charAt(0).toUpperCase();
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const userName = session.user?.name ?? "Usuario autenticado";
  const userEmail = session.user?.email ?? "Email no disponible";

  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-4xl font-semibold text-primary">
          Bienvenida, {userName}
        </h1>
        <p className="mt-4 max-w-2xl text-primary/70">
          Esta es el area privada. La sesion se esta leyendo desde el servidor
          con NextAuth antes de renderizar esta pagina.
        </p>

        <article className="mt-10 max-w-xl rounded-lg border border-background bg-surface p-6 text-primary">
          <div className="flex items-center gap-4">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={`Avatar de ${userName}`}
                className="size-16 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-16 items-center justify-center rounded-full bg-primary font-serif text-2xl text-surface">
                {getInitial(session.user?.name, session.user?.email)}
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold">{userName}</h2>
              <p className="mt-1 text-sm text-primary/70">{userEmail}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
