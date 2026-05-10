import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <section className="bg-background px-6 py-20">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg border border-background bg-surface p-8 text-primary">
          <h1 className="font-serif text-3xl font-semibold">
            Iniciar sesion
          </h1>
          <p className="mt-3 text-sm leading-6 text-primary/70">
            Accede con tu email y contraseña o con tu cuenta de Google para
            entrar al area privada.
          </p>

          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
