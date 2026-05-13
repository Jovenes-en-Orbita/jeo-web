"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Calendar, Tag, ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: "1",
    slug: "descubrimiento-exoplaneta-habitable",
    title: "Descubren exoplaneta en zona habitable",
    date: "2024-03-15",
    category: "Exoplanetas",
    image: "https://i.ibb.co/TDqySwcs/Hubble-ultra-deep-field.jpg",
  },
  {
    id: "2",
    slug: "mision-artemis-luna",
    title: "Misión Artemis: Próximo paso hacia la Luna",
    date: "2024-03-10",
    category: "Exploración",
    image: "https://i.ibb.co/bRDx88B7/stsci-01gk2kmys6hads6nd8nrhg53rp.webp",
  },
  {
    id: "3",
    slug: "agujero-negro-centro-galactico",
    title: "Nuevas imágenes del agujero negro central",
    date: "2024-03-05",
    category: "Astrofísica",
    image: "https://i.postimg.cc/w3Ks1ZdH/Merging-black-holes-pillars.jpg",
  },
];

export default function NewsSection() {
  const t = useTranslations("news");

  return (
    <section id="noticias" className="py-24 lg:py-32 bg-[#050508]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-blue-400 font-medium mb-4">
              {t("badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/noticias"
            className="group flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white transition-colors"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href={`/noticias/${item.slug}`}
              className="group flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Tag className="h-3 w-3 text-blue-400" />
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="flex-1 p-8 flex flex-col">
                <div className="flex items-center gap-2 text-white/30 text-[10px] font-medium uppercase tracking-widest mb-4">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.date}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-4 line-clamp-2">
                  {item.title}
                </h3>
                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                  {t("readMore")}
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
