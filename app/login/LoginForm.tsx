"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  return (
    <Button
      type="button"
      onClick={() => signIn("google", { callbackUrl })}
      className="mt-8 h-12 w-full"
    >
      Entrar con Google
    </Button>
  );
}
