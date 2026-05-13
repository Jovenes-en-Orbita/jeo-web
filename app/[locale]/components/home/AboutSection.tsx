"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Users, Target, Handshake } from "lucide-react";

export default function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="quienes-somos" className="py-24 lg:py-32 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-blue-400 font-medium mb-4 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5">
              {t("badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
              {t("title")}
            </h2>
            <p className="text-white/60 leading-relaxed text-lg mb-12">
              {t("description")}
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{t("missionTitle")}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{t("missionContent")}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{t("foundersTitle")}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{t("foundersContent")}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Handshake className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{t("partnersTitle")}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{t("partnersContent")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-blue-600/10 to-purple-600/10 blur-2xl" />
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://i.ibb.co/bRDx88B7/stsci-01gk2kmys6hads6nd8nrhg53rp.webp"
                alt="About JEO"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                  <p className="text-white/80 font-medium italic">
                    &quot;{t("quote")}&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
