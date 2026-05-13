"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Zap, Waves, Microscope } from "lucide-react";

const matterKeys = [
  { key: "darkEnergy", image: "https://i.postimg.cc/qMZBG7wk/25400.png", icon: Sparkles, color: "text-purple-400" },
  { key: "darkMatter", image: "https://i.postimg.cc/XGGzsgbh/ZMXJ3-OYEZRDYTEVV7-OOCWGCOKU.png", icon: Microscope, color: "text-blue-400" },
  { key: "antimatter", image: "https://i.postimg.cc/G2sg6Xw7/Capturaant.png", icon: Zap, color: "text-red-400" },
  { key: "baryonic", image: "https://i.postimg.cc/hvFWkPdP/mbarionica.png", icon: Waves, color: "text-green-400" },
  { key: "light", image: "https://i.postimg.cc/ppq3Xrqs/luz.jpg", icon: Sparkles, color: "text-yellow-400" },
] as const;

const spectrumKeys = [
  { key: "radio", color: "bg-red-600" },
  { key: "microwave", color: "bg-orange-500" },
  { key: "infrared", color: "bg-red-400" },
  { key: "visibleLight", color: "bg-gradient-to-r from-red-500 via-green-500 to-blue-500" },
  { key: "ultraviolet", color: "bg-purple-500" },
  { key: "xRays", color: "bg-blue-500" },
  { key: "gammaRays", color: "bg-blue-800" },
] as const;

export default function MatterCards() {
  const [selectedMatter, setSelectedMatter] = useState<typeof matterKeys[number] | null>(null);
  const t = useTranslations("matter");

  return (
    <section id="materia" className="relative py-20 lg:py-28 bg-[#0a0a0f]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Matter Cards */}
          <div>
            <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-purple-400 font-medium mb-4 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5">
              {t("badge")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              {t("title")}
            </h2>

            <div className="space-y-4">
              {matterKeys.map((matter, i) => (
                <button
                  key={matter.key}
                  onClick={() => setSelectedMatter(matter)}
                  className="w-full text-left group flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/5 group-hover:ring-purple-500/30 transition-all">
                    <Image
                      src={matter.image}
                      alt={t(`${matter.key}Title`)}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
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
              ))}
            </div>
          </div>

          {/* Right: Structures & Spectrum */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 hover:bg-white/[0.04] transition-colors group">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                {t("spectrum")}
              </h3>
              
              {/* Better Spectrum Representation */}
              <div className="relative h-12 w-full rounded-lg overflow-hidden flex mb-6">
                {spectrumKeys.map((item) => (
                  <div 
                    key={item.key} 
                    className={`h-full flex-1 ${item.color} relative group/item`}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover/item:bg-transparent transition-colors" />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {spectrumKeys.map((item) => (
                  <span
                    key={item.key}
                    className="px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border border-white/5 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                  >
                    {t(item.key)}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group relative overflow-hidden rounded-2xl border border-white/5 aspect-square sm:aspect-auto sm:h-48">
                <Image
                  src="https://i.postimg.cc/pX1SPqD0/Optimismo-moderado-en-la-astronomia-espanola.jpg"
                  alt={t("structuresTitle")}
                  fill
                  className="object-cover brightness-50 group-hover:brightness-60 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase">
                    {t("structuresTitle")}
                  </h3>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-white/5 aspect-square sm:aspect-auto sm:h-48">
                <Image
                  src="https://i.postimg.cc/w3Ks1ZdH/Merging-black-holes-pillars.jpg"
                  alt={t("gravitationalWaves")}
                  fill
                  className="object-cover brightness-50 group-hover:brightness-60 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase">
                    {t("gravitationalWaves")}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedMatter && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0d0d12] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedMatter(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all z-10"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                <div className="relative w-full md:w-2/5 h-64 md:h-auto">
                  <Image
                    src={selectedMatter.image}
                    alt={t(`${selectedMatter.key}Title`)}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0d0d12] via-transparent to-transparent" />
                </div>

                <div className="flex-1 p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <selectedMatter.icon className={`h-6 w-6 ${selectedMatter.color}`} />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-semibold">
                      {t("matterComponent")}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-6">
                    {t(`${selectedMatter.key}Title`)}
                  </h3>
                  
                  <p className="text-white/60 leading-relaxed text-lg mb-8">
                    {t(`${selectedMatter.key}FullDesc`) || t(`${selectedMatter.key}Desc`)}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-6 border-t border-white/5">
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                      <span className="block text-[10px] uppercase text-white/30 mb-1">{t("composition")}</span>
                      <span className="text-sm text-white font-medium">{t(`${selectedMatter.key}Percent`)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
