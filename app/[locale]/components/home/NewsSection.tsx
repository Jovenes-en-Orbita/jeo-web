"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Calendar, Tag, ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: "1",
    date: "2024-03-15",
    image: "https://i.ibb.co/TDqySwcs/Hubble-ultra-deep-field.jpg",
  },
  {
    id: "2",
    date: "2024-03-10",
    image: "https://i.ibb.co/bRDx88B7/stsci-01gk2kmys6hads6nd8nrhg53rp.webp",
  },
  {
    id: "3",
    date: "2024-03-05",
    image: "https://i.postimg.cc/w3Ks1ZdH/Merging-black-holes-pillars.jpg",
  },
];

export default function NewsSection() {
  const t = useTranslations("news");

  return (
    <section id="noticias" className="py-24 lg:py-32 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-block text-[10px] lg:text-base tracking-[0.3em] uppercase text-[#e30613] font-bold mb-4">
              {t("badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase font-heading">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/noticias"
            className="group flex items-center gap-2 text-xs lg:text-base font-bold tracking-widest uppercase text-white/50 hover:text-white transition-colors"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => {
            const title = t(`items.${item.id}.title`);
            const slug = t(`items.${item.id}.slug`);
            const category = t(`items.${item.id}.category`);
            
            return (
              <Link
                key={item.id}
                href={`/noticias/${slug}`}
                className="group flex flex-col h-full bg-zinc-950/40 border border-zinc-800 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/85 backdrop-blur-sm border border-zinc-800 text-[10px] lg:text-base font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Tag className="h-3 w-3 text-[#e30613]" />
                      {category}
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex items-center gap-2 text-zinc-500 text-[10px] lg:text-base font-bold uppercase tracking-wider mb-3">
                    <Calendar className="h-3.5 w-3.5 text-zinc-600" />
                    {item.date}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#e30613] transition-colors mb-4 line-clamp-2 font-heading leading-snug">
                    {title}
                  </h3>
                  <div className="mt-auto flex items-center gap-2 text-xs lg:text-base font-bold text-[#e30613] uppercase tracking-wider opacity-90 transition-all">
                    {t("readMore")}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
