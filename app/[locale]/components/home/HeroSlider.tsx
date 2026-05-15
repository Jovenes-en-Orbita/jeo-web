"use client";

import SpaceBackground from "../shared/SpaceBackground";
import HeroContent from "../shared/HeroContent";
import NebulaGlows from "../shared/NebulaGlows";

export default function HeroSlider() {
  return (
    <section className="relative w-full h-svh overflow-hidden bg-[#050508]">
      {/* Space Background Effect */}
      <SpaceBackground />

      {/* Content Overlay */}
      <HeroContent />

      {/* Decorative Nebula Glows */}
      <NebulaGlows />
    </section>
  );
}
