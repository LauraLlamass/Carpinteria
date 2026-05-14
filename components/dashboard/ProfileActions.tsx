"use client";

import Link from "next/link";
import { LogOut, MessageSquareText, PackageSearch } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button, buttonVariants } from "@/components/ui/button";

export function ProfileActions({ isOwner }: { isOwner: boolean }) {
  return (
    <div className={`mt-6 grid gap-3 ${isOwner ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
      {isOwner ? (
        <Link
          href="/inventario"
          className={buttonVariants({
            size: "lg",
            className:
              "gap-2 rounded-full bg-primary px-6 !text-secondary hover:bg-accent hover:!text-surface",
          })}
        >
          <PackageSearch />
          Inventario
        </Link>
      ) : null}

      <Link
        href="/mensajes"
        className={buttonVariants({
          size: "lg",
          className:
            "gap-2 rounded-full bg-primary px-6 !text-secondary hover:bg-accent hover:!text-surface",
        })}
      >
        <MessageSquareText />
        Mensajes
      </Link>

      <Button
        type="button"
        size="lg"
        className="gap-2 rounded-full bg-secondary px-6 !text-primary hover:bg-accent hover:!text-surface"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <LogOut />
        Cerrar sesion
      </Button>
    </div>
  );
}
