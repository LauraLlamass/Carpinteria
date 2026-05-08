"use client";

import { useActionState } from "react";
import {
  type ContactFormState,
  sendContactMessage,
} from "@/app/contacto/actions";
import { buttonVariants } from "@/components/ui/button";

const initialState: ContactFormState = {
  status: "idle",
  message: "",
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  return (
    <form action={formAction} className="grid gap-4">
      <div>
        <label className="text-sm font-medium text-primary" htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          className="mt-2 w-full rounded-lg border border-background bg-background px-4 py-3 text-primary outline-none focus:ring-2 focus:ring-accent"
          placeholder="Tu nombre"
        />
        {state.fieldErrors?.name ? (
          <p className="mt-2 text-sm text-accent">
            {state.fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label className="text-sm font-medium text-primary" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          className="mt-2 w-full rounded-lg border border-background bg-background px-4 py-3 text-primary outline-none focus:ring-2 focus:ring-accent"
          placeholder="tu@email.com"
          type="email"
        />
        {state.fieldErrors?.email ? (
          <p className="mt-2 text-sm text-accent">
            {state.fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label
          className="text-sm font-medium text-primary"
          htmlFor="message"
        >
          Proyecto
        </label>
        <textarea
          id="message"
          name="message"
          className="mt-2 min-h-36 w-full rounded-lg border border-background bg-background px-4 py-3 text-primary outline-none focus:ring-2 focus:ring-accent"
          placeholder="Cuéntanos medidas, materiales, estancia y objetivo del proyecto."
        />
        {state.fieldErrors?.message ? (
          <p className="mt-2 text-sm text-accent">
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      {state.message ? (
        <p
          className={
            state.status === "success"
              ? "rounded-lg bg-secondary px-4 py-3 text-sm text-primary"
              : "rounded-lg bg-accent px-4 py-3 text-sm text-surface"
          }
        >
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className={buttonVariants({ className: "rounded-full" })}
      >
        {pending ? "Enviando..." : "Enviar consulta"}
      </button>
    </form>
  );
}
