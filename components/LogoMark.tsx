import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  priority?: boolean;
  variant?: "dark" | "light";
};

export function LogoMark({
  className,
  priority = false,
  variant = "dark",
}: LogoMarkProps) {
  return (
    <span aria-hidden="true" className={cn("relative inline-flex shrink-0", className)}>
      <Image
        src={variant === "light" ? "/images/logo-claro.png" : "/images/logo-oscuro.png"}
        alt=""
        fill
        sizes="64px"
        className="object-contain"
        priority={priority}
      />
    </span>
  );
}
