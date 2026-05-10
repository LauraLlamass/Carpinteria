"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

type AuthButtonProps = {
  className?: string;
  onAction?: () => void;
};

export function AuthButton({ className, onAction }: AuthButtonProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span className={cn("px-3 py-2 text-sm text-primary/70", className)}>
        Cargando...
      </span>
    );
  }

  const handleClick = () => {
    onAction?.();

    if (session) {
      void signOut({ callbackUrl: "/" });
      return;
    }

    router.push("/login");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        className,
      )}
    >
      {session ? "Cerrar sesion" : "Iniciar sesion"}
    </button>
  );
}
