import type { LucideIcon } from "lucide-react";
import MatterOrb from "./MatterOrb";

export interface MatterItem {
  key: string;
  icon: LucideIcon;
  color: string;
}

interface MatterListItemProps {
  /** The matter data item */
  matter: MatterItem;
  /** Click handler to select this item */
  onClick: () => void;
  /** Index for staggered animation delay */
  index: number;
  /** Translation function – receives translation keys like `${key}Title` */
  t: (key: string) => string;
}

/**
 * A single row in the matter list: animated orb, title, description, and arrow.
 */
export default function MatterListItem({
  matter,
  onClick,
  index,
  t,
}: MatterListItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left group flex items-start gap-4 p-4 rounded-none bg-zinc-950/50 border border-zinc-800 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-300 cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-16 w-16 rounded-full flex-shrink-0 ring-2 ring-zinc-800 group-hover:ring-nasa-red/50 transition-all overflow-hidden bg-black">
        <MatterOrb matterKey={matter.key} size={64} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold uppercase tracking-wider text-white/90 group-hover:text-nasa-red transition-colors font-heading">
          {t(`${matter.key}Title`)}
        </h4>
        <p className="mt-1 text-xs text-zinc-400 leading-relaxed line-clamp-2">
          {t(`${matter.key}Desc`)}
        </p>
      </div>
      <span className="text-zinc-600 group-hover:text-nasa-red transition-colors text-lg flex-shrink-0 mt-2 font-bold group-hover:translate-x-1 duration-300 transform">
        →
      </span>
    </button>
  );
}
