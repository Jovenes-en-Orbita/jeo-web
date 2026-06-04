"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

interface HeroContentProps {
  namespace?: string;
  title1?: string;
  title2?: string;
  subtitle?: string;
  discoverText?: string;
  scrollId?: string;
}

export default function HeroContent({
  namespace = "hero",
  title1,
  title2,
  subtitle,
  discoverText,
  scrollId = "#info-universo"
}: HeroContentProps) {
  const t = useTranslations(namespace);

  return (
    <div className="absolute inset-0 flex items-end justify-start z-10 pointer-events-none px-4 sm:px-8 lg:px-16 pb-20 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto max-w-xl sm:max-w-2xl bg-black/75 backdrop-blur-md border-l-4 border-[#e30613] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <span className="inline-block text-[10px] tracking-[0.3em] font-bold text-[#e30613] uppercase mb-4">
          MISIÓN DESTACADA
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight font-heading">
          {title1 || t("title1")}{" "}
          <span className="text-white block sm:inline">
            {title2 || t("title2")}
          </span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-zinc-300 font-light tracking-wide leading-relaxed">
          {subtitle || t("subtitle")}
        </p>
        <div className="mt-8">
          <a
            href={scrollId}
            className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 hover:border-white bg-transparent hover:bg-white text-white hover:text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 group"
          >
            {discoverText || t("discover")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 right-8 sm:right-16 pointer-events-auto hidden sm:block"
      >
        <a
          href={scrollId}
          className="group flex items-center gap-3 text-white/40 hover:text-white transition-all duration-300"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase font-medium">{discoverText || t("discover")}</span>
          <div className="relative h-10 w-6 rounded-full border border-white/20 flex items-start justify-center pt-1.5 overflow-hidden">
            <motion.div 
              animate={{ 
                y: [0, 14, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-1.5 w-1.5 rounded-full bg-[#e30613]" 
            />
          </div>
        </a>
      </motion.div>
    </div>
  );
}
