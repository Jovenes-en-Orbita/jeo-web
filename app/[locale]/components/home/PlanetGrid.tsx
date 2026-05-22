"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

const planetData = [
  { key: "mercury", image: "https://i.ibb.co/wg3z6D5/mercurio.jpg", color: "from-gray-400 to-gray-600" },
  { key: "venus", image: "https://i.ibb.co/PcyGKXz/venuss-1.png", color: "from-orange-300 to-orange-500" },
  { key: "earth", image: "https://i.ibb.co/74S6B6v/tierra.jpg", color: "from-blue-400 to-blue-600" },
  { key: "mars", image: "https://www.nasa.gov/wp-content/uploads/2025/02/37983-mars-globe-valles-marineris-enhanced.jpg", color: "from-red-400 to-red-600" },
  { key: "jupiter", image: "https://i.ibb.co/jRbhbY0/jupiter.jpg", color: "from-orange-200 to-orange-400" },
  { key: "saturn", image: "https://i.ibb.co/G94Z59D/saturnon.jpg", color: "from-yellow-200 to-yellow-400" },
  { key: "uranus", image: "https://i.ibb.co/c1Pqq7n/urano.jpg", color: "from-cyan-300 to-cyan-500" },
  { key: "neptune", image: "https://i.ibb.co/z7GPnDY/neptuno-1.jpg", color: "from-blue-500 to-blue-700" },
] as const;

export default function PlanetGrid() {
  const [selectedPlanet, setSelectedPlanet] = useState<typeof planetData[number] | null>(null);
  const t = useTranslations("planets");

  return (
    <section id="sistema-solar" className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('https://i.ibb.co/7rQYXVX/zyro-image.jpg')",
        }}
      />
      <div className="absolute inset-0 shadow-[inset_0_0_120px_60px_rgba(0,0,0,0.9)]" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <Link href="/sistema-solar">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white/80 hover:text-white transition-colors mb-4">
            {t("title")}
          </h2>
        </Link>
        <p className="text-white/40 max-w-2xl mb-12">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
          {planetData.map((planet) => (
            <button
              key={planet.key}
              onClick={() => setSelectedPlanet(planet)}
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
              <span className="text-xs sm:text-sm font-medium text-white/50 group-hover:text-white transition-colors tracking-wide">
                {t(planet.key)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPlanet && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md" onClick={() => setSelectedPlanet(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-[#0d0d12]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedPlanet(null)}
                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8">
                <div className="flex items-center gap-6 mb-6">
                  <div className={`relative h-24 w-24 rounded-full overflow-hidden ring-4 ring-offset-4 ring-offset-[#0d0d12] ring-blue-500/20`}>
                    <Image
                      src={selectedPlanet.image}
                      alt={t(selectedPlanet.key)}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-1">
                      {t(selectedPlanet.key)}
                    </h3>
                    <span className="text-xs uppercase tracking-[0.2em] text-blue-400 font-medium">
                      {t("planetType")}
                    </span>
                  </div>
                </div>

                <p className="text-white/60 mb-8 leading-relaxed">
                  {t(`${selectedPlanet.key}ShortDesc`)}
                </p>

                <Link
                  href={`/sistema-solar/${selectedPlanet.key}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all group"
                >
                  {t("knowMore")}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className={`h-1.5 w-full bg-gradient-to-r ${selectedPlanet.color}`} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
