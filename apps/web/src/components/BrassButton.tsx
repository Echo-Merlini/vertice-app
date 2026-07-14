import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

type BrassButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "ghost";
  className?: string;
  external?: boolean;
};

/**
 * The single brass CTA — pill with a trailing circular arrow. Restraint: one per
 * view. `solid` = brass fill; `ghost` = hairline outline for secondary actions.
 */
export function BrassButton({ children, href = "#contact", variant = "solid", className = "", external = false }: BrassButtonProps) {
  const solid = variant === "solid";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-sm font-medium tracking-tight transition-colors duration-200 ${
        solid
          ? "bg-brass text-paper hover:bg-brassLight hover:text-deepink"
          : "border border-white/15 text-paper hover:border-brassLight/60"
      } ${className}`}
    >
      {children}
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-200 group-hover:rotate-45 ${
          solid ? "bg-paper/15" : "bg-white/10"
        }`}
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  );
}
