"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { MatterItem } from "./MatterListItem";
import MatterOrb from "./MatterOrb";

interface MatterDetailModalProps {
  /** The selected matter item, or null if closed */
  matter: MatterItem | null;
  /** Close handler */
  onClose: () => void;
  /** Translation function */
  t: (key: string) => string;
}

/**
 * Animated full-screen modal showing matter details with image, icon, and stats.
 */
export default function MatterDetailModal({
  matter,
  onClose,
  t,
}: MatterDetailModalProps) {
  return (
    <AnimatePresence>
      {matter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#0d0d12] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col md:flex-row h-full">
              <div className="relative w-full md:w-2/5 h-64 md:h-auto flex items-center justify-center bg-black/30">
                <MatterOrb matterKey={matter.key} size={200} />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0d0d12] via-transparent to-transparent" />
              </div>

              <div className="flex-1 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <matter.icon className={`h-6 w-6 ${matter.color}`} />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-semibold">
                    {t("matterComponent")}
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-white mb-6">
                  {t(`${matter.key}Title`)}
                </h3>

                <p className="text-white/60 leading-relaxed text-lg mb-8">
                  {t(`${matter.key}FullDesc`) || t(`${matter.key}Desc`)}
                </p>

                <div className="flex flex-wrap gap-4 pt-6 border-t border-white/5">
                  <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                    <span className="block text-[10px] uppercase text-white/30 mb-1">
                      {t("composition")}
                    </span>
                    <span className="text-sm text-white font-medium">
                      {t(`${matter.key}Percent`)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
