import type { ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

interface InteractiveLinkProps {
  /** Target URL path */
  href: string;
  /** Inner content/label */
  children: ReactNode;
  /** Optional click handler */
  onClick?: () => void;
  /** Custom/Additional CSS classes */
  className?: string;
  /** Whether to show the animated ArrowRight icon at the end. Defaults to true. */
  showArrow?: boolean;
  /** Optional icon to display before the text */
  icon?: ReactNode;
}

/**
 * A highly interactive, stylish link button that supports custom icons,
 * micro-animations, and acts as a Next.js localized Link.
 *
 * @example
 * ```tsx
 * <InteractiveLink href="/sistema-solar/earth">
 *   {t("knowMore")}
 * </InteractiveLink>
 * ```
 */
export default function InteractiveLink({
  href,
  children,
  onClick,
  className = "",
  showArrow = true,
  icon,
}: InteractiveLinkProps) {
  const baseClasses = "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white  hover:bg-white/10 transition-all group";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
      )}
    </Link>
  );
}
