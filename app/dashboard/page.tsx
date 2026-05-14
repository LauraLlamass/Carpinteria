import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { ProfileActions } from "@/components/dashboard/ProfileActions";
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
  const ownerEmail = process.env.OWNER_EMAIL?.toLowerCase();
  const isOwner = Boolean(
    ownerEmail && session.user?.email?.toLowerCase() === ownerEmail,
  );

  return (
    <section className="flex min-h-[calc(100vh-220px)] items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-2xl text-center">
        <h1 className="font-serif text-4xl font-semibold text-primary">
          Bienvenida/o, {userName}
        </h1>

        <article className="mt-10 rounded-lg border border-background bg-surface p-6 text-left text-primary">
          <div className="flex items-center justify-center gap-4 sm:justify-start">
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

          <ProfileActions isOwner={isOwner} />
        </article>
      </div>
    </section>
  );
}
