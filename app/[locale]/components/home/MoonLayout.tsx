"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Compass } from "lucide-react";

const moonData = [
  { key: "ganymede", rank: 1, image: "https://i.postimg.cc/65BzYHbL/Captura-2.png", planet: "jupiter" },
  { key: "titan", rank: 2, image: "https://i.postimg.cc/QtHV8rMk/Tit-Tan-1.png", planet: "saturn" },
  { key: "callisto", rank: 3, image: "https://i.ibb.co/ynGTyY4/2due.png", planet: "jupiter" },
  { key: "io", rank: 4, image: "https://i.postimg.cc/8czJrrwW/ioNN-1.png", planet: "jupiter" },
  { key: "theMoon", rank: 5, image: "https://i.postimg.cc/FRDX1f72/Captura-1.png", planet: "earth" },
] as const;

export default function MoonLayout() {
  const [selectedMoon, setSelectedMoon] = useState<typeof moonData[number] | null>(null);
  const t = useTranslations("moonSection");

  const centerMoon = moonData.find((m) => m.key === "theMoon")!;
  const leftMoons = moonData.filter((m) => m.rank === 1 || m.rank === 3);
  const rightMoons = moonData.filter((m) => m.rank === 2 || m.rank === 4);

  return (
    <section id="lunas" className="py-24 lg:py-32 px-4 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
        {t("title")}
      </h2>
      <p className="text-white/40 max-w-2xl mb-16">
        {t("subtitle")}
      </p>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
        {/* Left moons */}
        <div className="flex flex-row lg:flex-col gap-4">
          {leftMoons.map((moon) => (
            <button key={moon.key} onClick={() => setSelectedMoon(moon)} className="group text-left">
              <div className="relative h-36 w-36 sm:h-44 sm:w-44 rounded-2xl overflow-hidden border border-white/5 group-hover:border-purple-500/30 transition-all duration-300">
                <Image
                  src={moon.image}
                  alt={t(moon.key)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="176px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="text-[10px] text-white/40">{moon.rank}.</span>
                  <p className="text-sm font-medium text-white">{t(moon.key)}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Center moon (La Luna) */}
        <button onClick={() => setSelectedMoon(centerMoon)} className="group text-center">
          <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96 rounded-2xl overflow-hidden border border-white/10 group-hover:border-cyan-500/30 transition-all duration-300">
            <Image
              src={centerMoon.image}
              alt={t(centerMoon.key)}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="384px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-xs text-white/40">{centerMoon.rank}.</span>
              <p className="text-xl font-bold text-white">{t(centerMoon.key)}</p>
            </div>
          </div>
        </button>

        {/* Right moons */}
        <div className="flex flex-row lg:flex-col gap-4">
          {rightMoons.map((moon) => (
            <button key={moon.key} onClick={() => setSelectedMoon(moon)} className="group text-left">
              <div className="relative h-36 w-36 sm:h-44 sm:w-44 rounded-2xl overflow-hidden border border-white/5 group-hover:border-purple-500/30 transition-all duration-300">
                <Image
                  src={moon.image}
                  alt={t(moon.key)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="176px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="text-[10px] text-white/40">{moon.rank}.</span>
                  <p className="text-sm font-medium text-white">{t(moon.key)}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMoon && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedMoon(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/40 hover:text-white transition-all z-10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden ring-4 ring-white/5">
                    <Image
                      src={selectedMoon.image}
                      alt={t(selectedMoon.key)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-semibold block mb-1">
                      {t("rank")} {selectedMoon.rank}
                    </span>
                    <h3 className="text-4xl font-bold text-white">
                      {t(selectedMoon.key)}
                    </h3>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <p className="text-white/60 leading-relaxed text-lg">
                    {t(`${selectedMoon.key}History`)}
                  </p>
                </div>

                <Link
                  href={`/#sistema-solar`}
                  onClick={() => setSelectedMoon(null)}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all group w-full justify-center"
                >
                  <Compass className="h-5 w-5 text-blue-400" />
                  {t("gotoPlanet", { planet: t(`planets:${selectedMoon.planet}`) })}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
