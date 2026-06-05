"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const constellationItems = [
  { name: "Orion", image: "https://i.ibb.co/hR8f5XgZ/Orion-Constellation.jpg" },
  { name: "Ursa Major", image: "https://i.ibb.co/C5fL365m/Ursa-Major.jpg" },
  { name: "Cassiopeia", image: "https://i.ibb.co/6R2M3kXG/Cassiopeia.jpg" },
  { name: "Cygnus", image: "https://i.ibb.co/M5mDqQvG/Cygnus.jpg" },
  { name: "Scorpius", image: "https://i.ibb.co/8L3q3L2M/Scorpius.jpg" },
  { name: "Leo", image: "https://i.ibb.co/wZ9m0k7D/Leo.jpg" },
];

export default function ConstellationSection() {
  const t = useTranslations("constellationSection");
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  return (
    <section id="constelaciones" className="relative py-24 lg:py-32 overflow-hidden bg-[#050508]">
      {/* Background with texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 mb-16 text-center lg:text-left">
        <Link href="/constelaciones">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white hover:text-cyan-300 transition-colors mb-6">
            {t("title")}
          </h2>
        </Link>
        <p className="text-white/60 max-w-3xl leading-relaxed text-base sm:text-lg mb-10 mx-auto lg:mx-0">
          {t("description")}
        </p>
      </div>

      {/* Carousel */}
      <div className="relative px-4 lg:px-0">
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6 px-4">
            {constellationItems.map((item, index) => (
              <div
                key={index}
                className="flex-[0_0_280px] sm:flex-[0_0_350px] min-w-0"
              >
                <div className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-cyan-500/30">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover brightness-75 group-hover:brightness-90 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
                      {item.name}
                    </h3>
                    <div className="h-1 w-0 bg-cyan-500 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-12 flex justify-center lg:justify-start">
        <Link
          href="/constelaciones"
          className="inline-flex items-center gap-2 text-sm  text-cyan-400 hover:text-cyan-300 group transition-colors"
        >
          {t("explore")}
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
