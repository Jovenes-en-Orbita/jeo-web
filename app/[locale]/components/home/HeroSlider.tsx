"use client";

import HeroContent from "../shared/HeroContent";
import NebulaGlows from "../shared/NebulaGlows";

export default function HeroSlider() {
  return (
    <section className="relative w-full h-svh overflow-hidden bg-[#050508]">
      <HeroContent />
      <NebulaGlows />
    </section>
  );
}
