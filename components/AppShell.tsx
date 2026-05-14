"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isInventory = pathname.startsWith("/inventario");

  return (
    <>
      {!isInventory && <Navbar />}
      <main className="flex-1 bg-background">{children}</main>
      {!isInventory && <Footer />}
    </>
  );
}
