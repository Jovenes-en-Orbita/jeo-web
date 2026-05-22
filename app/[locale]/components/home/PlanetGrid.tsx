"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { PlanetItem } from "./planets/PlanetButton";
import PlanetDetailModal from "./planets/PlanetDetailModal";
import PlanetGridBackground from "./planets/PlanetGridBackground";
import PlanetGridContent from "./planets/PlanetGridContent";

const planetData: PlanetItem[] = [
  { key: "mercury", image: "https://i.ibb.co/wg3z6D5/mercurio.jpg", color: "from-gray-400 to-gray-600" },
  { key: "venus", image: "https://i.ibb.co/PcyGKXz/venuss-1.png", color: "from-orange-300 to-orange-500" },
  { key: "earth", image: "https://i.ibb.co/74S6B6v/tierra.jpg", color: "from-blue-400 to-blue-600" },
  { key: "mars", image: "https://www.nasa.gov/wp-content/uploads/2025/02/37983-mars-globe-valles-marineris-enhanced.jpg", color: "from-red-400 to-red-600" },
  { key: "jupiter", image: "https://i.ibb.co/jRbhbY0/jupiter.jpg", color: "from-orange-200 to-orange-400" },
  { key: "saturn", image: "https://i.ibb.co/G94Z59D/saturnon.jpg", color: "from-yellow-200 to-yellow-400" },
  { key: "uranus", image: "https://i.ibb.co/c1Pqq7n/urano.jpg", color: "from-cyan-300 to-cyan-500" },
  { key: "neptune", image: "https://i.ibb.co/z7GPnDY/neptuno-1.jpg", color: "from-blue-500 to-blue-700" },
];

export default function PlanetGrid() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetItem | null>(null);
  const t = useTranslations("planets");

  return (
    <section id="sistema-solar" className="relative py-24 lg:py-32 overflow-hidden">
      <PlanetGridBackground />

      <PlanetGridContent
        planetData={planetData}
        onPlanetSelect={setSelectedPlanet}
        t={t}
      />

      <PlanetDetailModal
        planet={selectedPlanet}
        onClose={() => setSelectedPlanet(null)}
        t={t}
      />
    </section>
  );
}

