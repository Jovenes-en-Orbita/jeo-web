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
      className="w-full text-left group flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-16 w-16 rounded-full flex-shrink-0 ring-2 ring-white/5 group-hover:ring-purple-500/30 transition-all overflow-hidden">
        <MatterOrb matterKey={matter.key} size={64} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white/90 group-hover:text-purple-300 transition-colors">
          {t(`${matter.key}Title`)}
        </h4>
        <p className="mt-1 text-xs text-white/40 leading-relaxed line-clamp-2">
          {t(`${matter.key}Desc`)}
        </p>
      </div>
      <span className="text-white/20 group-hover:text-white/50 transition-colors text-lg flex-shrink-0 mt-2">
        →
      </span>
    </button>
  );
}
