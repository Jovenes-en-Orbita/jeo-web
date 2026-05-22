import ImageOverlayCard from "@/app/[locale]/components/shared/ImageOverlayCard";
import SpectrumBar from "./SpectrumBar";

interface SpectrumItem {
  key: string;
  color: string;
}

interface MatterSidebarProps {
  /** Spectrum band items */
  spectrumItems: readonly SpectrumItem[];
  /** Translation function */
  t: (key: string) => string;
}

/**
 * Right column of the Matter section: spectrum bar + two overlay image cards.
 */
export default function MatterSidebar({ spectrumItems, t }: MatterSidebarProps) {
  return (
    <div className="space-y-6">
      <SpectrumBar items={spectrumItems} t={t} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ImageOverlayCard
          src="https://i.postimg.cc/pX1SPqD0/Optimismo-moderado-en-la-astronomia-espanola.jpg"
          alt={t("structuresTitle")}
          label={t("structuresTitle")}
          className="aspect-square sm:aspect-auto sm:h-48"
        />
        <ImageOverlayCard
          src="https://i.postimg.cc/w3Ks1ZdH/Merging-black-holes-pillars.jpg"
          alt={t("gravitationalWaves")}
          label={t("gravitationalWaves")}
          className="aspect-square sm:aspect-auto sm:h-48"
        />
      </div>
    </div>
  );
}
