"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { Button } from "@/components/ui/button";
import { getFirebaseAuth } from "@/lib/firebase";

function getRegisterErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    if (error.code === "auth/email-already-in-use") {
      return "Ya existe una cuenta con este email.";
    }

    if (error.code === "auth/weak-password") {
      return "La contraseña debe tener al menos 6 caracteres.";
    }

    if (error.code === "auth/invalid-email") {
      return "El email no tiene un formato valido.";
    }

    if (error.code === "auth/operation-not-allowed") {
      return "El registro con email y contrasena no esta activado en Firebase.";
    }

    if (error.code === "auth/invalid-api-key") {
      return "La API Key de Firebase no es valida. Revisa NEXT_PUBLIC_FIREBASE_API_KEY.";
    }

    if (error.code === "auth/network-request-failed") {
      return "No se ha podido conectar con Firebase. Revisa tu conexion.";
    }
  }

  return "No se ha podido crear la cuenta. Intentalo de nuevo.";
}

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        getFirebaseAuth(),
        email,
        password,
      );

      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });

      router.push("/login");
      router.refresh();
    } catch (registerError) {
      setError(getRegisterErrorMessage(registerError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-8 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-primary">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="mt-2 h-11 w-full rounded-lg border border-background bg-background px-3 text-sm text-primary outline-none transition-colors focus:border-accent focus:ring-3 focus:ring-accent"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-primary">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-2 h-11 w-full rounded-lg border border-background bg-background px-3 text-sm text-primary outline-none transition-colors focus:border-accent focus:ring-3 focus:ring-accent"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-primary"
          >
            Contraseña
          </label>
          <div className="relative mt-2">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
              className="h-11 w-full rounded-lg border border-background bg-background px-3 pr-11 text-sm text-primary outline-none transition-colors focus:border-accent focus:ring-3 focus:ring-accent"
            />
            <button
              type="button"
              aria-label={
                showPassword ? "Ocultar contrasena" : "Mostrar contrasena"
              }
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-primary/70 transition-colors hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        {error ? (
          <p className="rounded-lg bg-accent/10 px-3 py-2 text-sm text-accent">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full"
        >
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </form>

      <p className="text-center text-sm text-primary/70">
        Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Inicia sesion
        </Link>
      </p>
    </div>
  );
}
