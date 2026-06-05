"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ImageOverlayCard from "@/app/[locale]/components/shared/ImageOverlayCard";
import SectionBadge from "@/app/[locale]/components/shared/SectionBadge";
import { ArrowRight } from "lucide-react";

export default function ArgentinaSpaceSection() {
  const t = useTranslations("homeSpaceSection");

  return (
    <section id="argentina-espacio" className="py-24 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-video border border-zinc-800 bg-zinc-950">
            <ImageOverlayCard
              src="https://i.ibb.co/9H2VGdrm/Captura-de-pantalla-2025-12-23-180706.png"
              alt={t("imageAlt")}
              className="h-full w-full"
            />
          </div>
          <div>
            <SectionBadge color="red">{t("badge")}</SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-heading tracking-tight mb-6">
              {t("title")}
            </h2>
            <p className=" text-zinc-400 font-light leading-relaxed mb-8">
              {t("description")}
            </p>
            <Link
              href="/explorar/argentina-espacio"
              className="inline-flex items-center gap-3 px-6 py-3 border border-zinc-800 hover:border-white bg-transparent hover:bg-white text-white hover:text-black font-bold uppercase tracking-widest transition-all duration-300 group"
            >
              {t("button")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
