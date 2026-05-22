import type { ReactNode } from "react";

/**
 * Map of supported color names to their Tailwind class triplet:
 * [text color, border color, background color]
 */
const colorMap: Record<string, [string, string, string]> = {
  blue:   ["text-blue-400",   "border-blue-500/20",   "bg-blue-500/5"],
  purple: ["text-purple-400", "border-purple-500/20", "bg-purple-500/5"],
  white:  ["text-white/40",   "border-white/10",      "bg-white/5"],
  green:  ["text-green-400",  "border-green-500/20",  "bg-green-500/5"],
  red:    ["text-red-400",    "border-red-500/20",    "bg-red-500/5"],
  yellow: ["text-yellow-400", "border-yellow-500/20", "bg-yellow-500/5"],
  cyan:   ["text-cyan-400",   "border-cyan-500/20",   "bg-cyan-500/5"],
};

interface SectionBadgeProps {
  /** The color theme for the badge */
  color?: keyof typeof colorMap;
  /** Content of the badge */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A small uppercase pill badge used as a section label.
 *
 * @example
 * ```tsx
 * <SectionBadge color="purple">{t("badge")}</SectionBadge>
 * ```
 */
export default function SectionBadge({
  color = "blue",
  children,
  className = "",
}: SectionBadgeProps) {
  const [textColor, borderColor, bgColor] = colorMap[color] ?? colorMap.blue;

  return (
    <span
      className={`inline-block text-[10px] tracking-[0.3em] uppercase font-medium mb-4 px-3 py-1 rounded-full border ${textColor} ${borderColor} ${bgColor} ${className}`}
    >
      {children}
    </span>
  );
}
