"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroImages } from "@/app/data/home";
import { useTranslations } from "next-intl";

export default function HeroSlider() {
  const t = useTranslations("hero");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-black">
      {/* Slider */}
      <div ref={emblaRef} className="h-full">
        <div className="flex h-full">
          {heroImages.map((src, i) => (
            <div
              key={i}
              className="relative flex-[0_0_100%] min-w-0 h-full overflow-hidden"
            >
              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: selectedIndex === i ? 1 : 1.1 }}
                transition={{ duration: 10, ease: "linear" }}
                className="relative w-full h-full"
              >
                <Image
                  src={src}
                  alt={`${t("cosmosView")} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={i === 0}
                />
              </motion.div>
              {/* Refined overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight text-white text-center leading-[0.9] perspective-1000">
              <span className="block opacity-90">{t("title1")}</span>
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(129,140,248,0.3)]">
                {t("title2")}
              </span>
            </h1>
            <p className="mt-8 text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl text-center font-light tracking-wide">
              {t("subtitle")}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Action Button (Optional, can be added if needed) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 pointer-events-auto"
        >
          {/* Add a CTA if appropriate for the "jeo" platform */}
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center gap-8 px-8 pointer-events-none">
        {/* Pagination Dots */}
        <div className="flex items-center gap-3 pointer-events-auto bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-2xl">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`group relative h-1.5 transition-all duration-500 rounded-full ${
                selectedIndex === i ? "w-8 bg-blue-400" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            >
              <span className="absolute -inset-2" />
            </button>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="pointer-events-auto"
        >
          <a
            href="#info-universo"
            className="group flex flex-col items-center gap-3 text-white/40 hover:text-white transition-all duration-300"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase font-medium">{t("discover")}</span>
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

      {/* Side Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 z-20 pointer-events-none">
        <button
          onClick={scrollPrev}
          className="group pointer-events-auto h-14 w-14 rounded-full bg-black/20 backdrop-blur-xl border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl overflow-hidden"
          aria-label={t("previous")}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <ChevronLeft className="w-6 h-6 relative z-10 group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={scrollNext}
          className="group pointer-events-auto h-14 w-14 rounded-full bg-black/20 backdrop-blur-xl border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl overflow-hidden"
          aria-label={t("next")}
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <ChevronRight className="w-6 h-6 relative z-10 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>
    </section>
  );
}

