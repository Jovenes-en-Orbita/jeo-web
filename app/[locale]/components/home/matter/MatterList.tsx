import SectionBadge from "@/app/[locale]/components/shared/SectionBadge";
import MatterListItem from "./MatterListItem";
import type { MatterItem } from "./MatterListItem";

interface MatterListProps {
  /** Array of matter items to display */
  items: MatterItem[];
  /** Handler when a matter item is selected */
  onSelect: (matter: MatterItem) => void;
  /** Translation function */
  t: (key: string) => string;
}

/**
 * Left column of the Matter section: badge, title, and list of matter items.
 */
export default function MatterList({ items, onSelect, t }: MatterListProps) {
  return (
    <div>
      <SectionBadge color="purple">{t("badge")}</SectionBadge>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        {t("title")}
      </h2>

      <div className="space-y-4">
        {items.map((matter, i) => (
          <MatterListItem
            key={matter.key}
            matter={matter}
            onClick={() => onSelect(matter)}
            index={i}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
