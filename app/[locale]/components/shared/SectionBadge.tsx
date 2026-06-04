import type { ReactNode } from "react";

/**
 * Map of supported color names to their Tailwind class triplet:
 * [text color, border color, background color]
 */
const colorMap: Record<string, [string, string, string]> = {
  blue:   ["text-nasa-red",   "border-nasa-red/25",   "bg-nasa-red/5"],
  purple: ["text-nasa-red",   "border-nasa-red/25",   "bg-nasa-red/5"],
  white:  ["text-white/60",   "border-white/15",      "bg-white/5"],
  green:  ["text-emerald-400",  "border-emerald-500/20",  "bg-emerald-500/5"],
  red:    ["text-nasa-red",    "border-nasa-red/20",    "bg-nasa-red/5"],
  yellow: ["text-amber-400",  "border-amber-500/20",  "bg-amber-500/5"],
  cyan:   ["text-nasa-red",   "border-nasa-red/20",   "bg-nasa-red/5"],
};

interface SectionBadgeProps {
  /** The color theme for the badge */
  color?: keyof typeof colorMap;
  /** Content of the badge */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export default function SectionBadge({
  color = "blue",
  children,
  className = "",
}: SectionBadgeProps) {
  const [textColor, borderColor, bgColor] = colorMap[color] ?? colorMap.blue;

  return (
    <span
      className={`inline-block text-[9px] tracking-[0.35em] uppercase font-bold mb-4 px-3 py-1 border ${textColor} ${borderColor} ${bgColor} ${className}`}
    >
      {children}
    </span>
  );
}
