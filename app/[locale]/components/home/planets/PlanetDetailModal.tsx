"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { PlanetItem } from "./PlanetButton";
import InteractiveLink from "../../shared/InteractiveLink";

interface PlanetDetailModalProps {
  /** The selected planet, or null if closed */
  planet: PlanetItem | null;
  /** Close handler */
  onClose: () => void;
  /** Translation function */
  t: (key: string) => string;
}

/**
 * Animated modal showing planet details: image, name, description, and link.
 */
export default function PlanetDetailModal({
  planet,
  onClose,
  t,
}: PlanetDetailModalProps) {
  return (
    <AnimatePresence>
      {planet && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#0d0d12]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-8">
              <div className="flex items-center gap-6 mb-6">
                <div className="relative h-24 w-24 rounded-full overflow-hidden ring-4 ring-offset-4 ring-offset-[#0d0d12] ring-blue-500/20">
                  <Image
                    src={planet.image}
                    alt={t(planet.key)}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">
                    {t(planet.key)}
                  </h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-blue-400 ">
                    {t("planetType")}
                  </span>
                </div>
              </div>

              <p className="text-white/60 mb-8 leading-relaxed">
                {t(`${planet.key}ShortDesc`)}
              </p>

              <InteractiveLink href={`/sistema-solar/${planet.key}`}>
                {t("knowMore")}
              </InteractiveLink>
            </div>

            <div className={`h-1.5 w-full bg-gradient-to-r ${planet.color}`} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

