"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { heroImages } from "@/app/data/home";

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden">
      {/* Slider */}
      <div ref={emblaRef} className="h-full">
        <div className="flex h-full">
          {heroImages.map((src, i) => (
            <div
              key={i}
              className="relative flex-[0_0_100%] min-w-0 h-full"
            >
              <Image
                src={src}
                alt={`Vista del cosmos ${i + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
            </div>
          ))}
        </div>
      </div>

      {/* Title overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white text-center leading-none">
          <span className="block">UNIVERSO</span>
          <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            PARA TODOS
          </span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-white/60 max-w-xl text-center animate-fade-in-up">
          Explorá los misterios del cosmos, desde las partículas más pequeñas
          hasta las estructuras más grandes del universo.
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto">
          <a
            href="#info-universo"
            className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Descubrir</span>
            <div className="h-10 w-6 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
              <div className="h-2 w-1 rounded-full bg-white/50 animate-bounce" />
            </div>
          </a>
        </div>
      </div>

      {/* Nav arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
        aria-label="Siguiente"
      >
        ›
      </button>
    </section>
  );
}
