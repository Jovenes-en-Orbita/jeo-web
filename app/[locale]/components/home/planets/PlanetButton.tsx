import Image from "next/image";

export interface PlanetItem {
  key: string;
  image: string;
  color: string;
}

interface PlanetButtonProps {
  /** Planet data */
  planet: PlanetItem;
  /** Click handler to select this planet */
  onClick: () => void;
  /** Translation function */
  t: (key: string) => string;
}

/**
 * A circular planet thumbnail button with hover scale and label.
 */
export default function PlanetButton({ planet, onClick, t }: PlanetButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-3 outline-none"
    >
      <div className="relative h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 rounded-full overflow-hidden ring-2 ring-white/5 group-hover:ring-blue-500/30 transition-all duration-300 group-hover:scale-110">
        <Image
          src={planet.image}
          alt={t(planet.key)}
          fill
          className="object-cover"
          sizes="128px"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
      </div>
      <span className="text-xs sm:text-sm  text-white/50 group-hover:text-white transition-colors tracking-wide">
        {t(planet.key)}
      </span>
    </button>
  );
}
