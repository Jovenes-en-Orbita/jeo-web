"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

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
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-white text-center leading-[0.9] perspective-1000">
          <span className="block opacity-90 mb-4">{title1 || t("title1")}</span>
          <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(129,140,248,0.3)]">
            {title2 || t("title2")}
          </span>
        </h1>
        <p className="mt-10 text-lg sm:text-xl lg:text-2xl text-white/70 max-w-2xl text-center font-light tracking-wide leading-relaxed">
          {subtitle || t("subtitle")}
        </p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 pointer-events-auto"
      >
        <a
          href={scrollId}
          className="group flex flex-col items-center gap-3 text-white/40 hover:text-white transition-all duration-300"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase font-medium">{discoverText || t("discover")}</span>
          <div className="relative h-12 w-7 rounded-full border-2 border-white/10 flex items-start justify-center pt-2 overflow-hidden">
            <motion.div 
              animate={{ 
                y: [0, 16, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-2 w-1.5 rounded-full bg-blue-400" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </a>
      </motion.div>
    </div>
  );
}
