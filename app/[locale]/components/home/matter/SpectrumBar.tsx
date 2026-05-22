import { Sparkles } from "lucide-react";

interface SpectrumItem {
  key: string;
  color: string;
}

interface SpectrumBarProps {
  /** Array of spectrum band items */
  items: readonly SpectrumItem[];
  /** Translation function for labels */
  t: (key: string) => string;
}

/**
 * Electromagnetic spectrum visualization: a color bar + label chips.
 */
export default function SpectrumBar({ items, t }: SpectrumBarProps) {
  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 hover:bg-white/[0.04] transition-colors group">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-yellow-400" />
        {t("spectrum")}
      </h3>

      {/* Color bar */}
      <div className="relative h-12 w-full rounded-lg overflow-hidden flex mb-6">
        {items.map((item) => (
          <div
            key={item.key}
            className={`h-full flex-1 ${item.color} relative group/item`}
          >
            <div className="absolute inset-0 bg-black/20 group-hover/item:bg-transparent transition-colors" />
          </div>
        ))}
      </div>

      {/* Label chips */}
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item.key}
            className="px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border border-white/5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
          >
            {t(item.key)}
          </span>
        ))}
      </div>
    </div>
  );
}
