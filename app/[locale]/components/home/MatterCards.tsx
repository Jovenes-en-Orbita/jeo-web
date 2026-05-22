"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Sparkles, Zap, Waves, Microscope } from "lucide-react";
import MatterList from "./matter/MatterList";
import type { MatterItem } from "./matter/MatterListItem";
import MatterSidebar from "./matter/MatterSidebar";
import MatterDetailModal from "./matter/MatterDetailModal";

const matterKeys: MatterItem[] = [
  { key: "darkEnergy", icon: Sparkles, color: "text-purple-400" },
  { key: "darkMatter", icon: Microscope, color: "text-blue-400" },
  { key: "antimatter", icon: Zap, color: "text-red-400" },
  { key: "baryonic", icon: Waves, color: "text-green-400" },
  { key: "light", icon: Sparkles, color: "text-yellow-400" },
];

const spectrumKeys = [
  { key: "radio", color: "bg-red-600" },
  { key: "microwave", color: "bg-orange-500" },
  { key: "infrared", color: "bg-red-400" },
  { key: "visibleLight", color: "bg-gradient-to-r from-red-500 via-green-500 to-blue-500" },
  { key: "ultraviolet", color: "bg-purple-500" },
  { key: "xRays", color: "bg-blue-500" },
  { key: "gammaRays", color: "bg-blue-800" },
] as const;

export default function MatterCards() {
  const [selectedMatter, setSelectedMatter] = useState<MatterItem | null>(null);
  const t = useTranslations("matter");

  return (
    <section id="materia" className="relative py-20 lg:py-28 bg-[#0a0a0f]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Matter Cards */}
          <MatterList items={matterKeys} onSelect={setSelectedMatter} t={t} />

          {/* Right: Structures & Spectrum */}
          <MatterSidebar spectrumItems={spectrumKeys} t={t} />
        </div>
      </div>

      <MatterDetailModal
        matter={selectedMatter}
        onClose={() => setSelectedMatter(null)}
        t={t}
      />
    </section>
  );
}
