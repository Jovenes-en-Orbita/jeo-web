"use client";

import PlanetButton from "./PlanetButton";
import type { PlanetItem } from "./PlanetButton";

interface PlanetGridContentProps {
  /** The collection of planets to render */
  planetData: PlanetItem[];
  /** Callback fired when a planet is selected */
  onPlanetSelect: (planet: PlanetItem) => void;
  /** Translation function */
  t: (key: string) => string;
}

/**
 * PlanetGridContent component that renders the title, subtitle,
 * and the grid of planet buttons.
 */
export default function PlanetGridContent({
  planetData,
  onPlanetSelect,
  t,
}: PlanetGridContentProps) {
  return (
    <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white/80 hover:text-white transition-colors mb-4">
        {t("title")}
      </h2>
      <p className="text-white/40 max-w-2xl mb-12">
        {t("subtitle")}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
        {planetData.map((planet) => (
          <PlanetButton
            key={planet.key}
            planet={planet}
            onClick={() => onPlanetSelect(planet)}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
