"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
          Error del taller
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-primary">
          Algo no ha encajado bien
        </h1>
        <p className="mt-4 text-muted-foreground">
          Puede haber fallado una petición de red o una operación del servidor.
          Intenta reconstruir la vista.
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-accent"
        >
          Reintentar
        </button>
      </div>
    </section>
  );
}
