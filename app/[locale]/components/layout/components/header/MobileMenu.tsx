"use client";

import { motion } from "framer-motion";
import { X, Rocket, Sparkles, Radio } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import type { DropdownItem } from "./DropdownMenu";

interface MobileMenuProps {
  onClose: () => void;
  cosmosItems: DropdownItem[];
  multimediaItems: DropdownItem[];
}

export default function MobileMenu({ onClose, cosmosItems, multimediaItems }: MobileMenuProps) {
  const t = useTranslations("nav");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-6 cursor-pointer pointer-events-auto"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-8 right-8 z-50 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group cursor-pointer"
      >
        <X className="h-6 w-6 text-white/50 group-hover:text-[#e30613] group-hover:rotate-90 transition-all duration-500" />
      </button>

      {/* Content Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-zinc-950/80 border border-zinc-800 p-8 sm:p-12 max-h-[85vh] overflow-y-auto scrollbar-none"
      >
        {/* Header */}
        <div className="border-b border-zinc-800 pb-6 mb-8 text-center sm:text-left">
          <span className="inline-block text-[10px] tracking-[0.35em] font-bold text-[#e30613] uppercase mb-2">
            MAPA DEL SITIO
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-white font-heading tracking-tight">
            Explora más páginas de la plataforma web JEO
          </h2>
          <p className="text-xs text-zinc-400 mt-2">
            Navega de forma directa por todos los contenidos y sub-páginas disponibles dentro de Jóvenes en Órbita.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Cosmos Section */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest font-heading border-l-2 border-[#e30613] pl-3 text-[#e30613] flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              {t("cosmos")}
            </h3>
            <div className="space-y-4">
              {cosmosItems.map((item, i) => {
                if (item.isHash) {
                  return (
                    <a
                      key={i}
                      href={item.href}
                      onClick={onClose}
                      className="group block p-4 bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold uppercase tracking-wider text-white/90 group-hover:text-[#e30613] transition-colors font-heading">
                          {item.label}
                        </span>
                        <span className="text-zinc-600 group-hover:text-[#e30613] transition-all transform group-hover:translate-x-1 duration-300 font-bold text-sm">
                          →
                        </span>
                      </div>
                      {item.desc && (
                        <p className="text-[11px] text-zinc-500 mt-1 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      )}
                    </a>
                  );
                }
                return (
                  <Link
                    key={i}
                    href={item.href}
                    onClick={onClose}
                    className="group block p-4 bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold uppercase tracking-wider text-white/90 group-hover:text-[#e30613] transition-colors font-heading">
                        {item.label}
                      </span>
                      <span className="text-zinc-600 group-hover:text-[#e30613] transition-all transform group-hover:translate-x-1 duration-300 font-bold text-sm">
                        →
                      </span>
                    </div>
                    {item.desc && (
                      <p className="text-[11px] text-zinc-500 mt-1 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Multimedia Section */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest font-heading border-l-2 border-[#e30613] pl-3 text-white flex items-center gap-2">
              <Radio className="h-3.5 w-3.5" />
              {t("multimedia")}
            </h3>
            <div className="space-y-4">
              {multimediaItems.map((item, i) => {
                if (item.isHash) {
                  return (
                    <a
                      key={i}
                      href={item.href}
                      onClick={onClose}
                      className="group block p-4 bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold uppercase tracking-wider text-white/90 group-hover:text-[#e30613] transition-colors font-heading">
                          {item.label}
                        </span>
                        <span className="text-zinc-600 group-hover:text-[#e30613] transition-all transform group-hover:translate-x-1 duration-300 font-bold text-sm">
                          →
                        </span>
                      </div>
                      {item.desc && (
                        <p className="text-[11px] text-zinc-500 mt-1 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      )}
                    </a>
                  );
                }
                return (
                  <Link
                    key={i}
                    href={item.href}
                    onClick={onClose}
                    className="group block p-4 bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold uppercase tracking-wider text-white/90 group-hover:text-[#e30613] transition-colors font-heading">
                        {item.label}
                      </span>
                      <span className="text-zinc-600 group-hover:text-[#e30613] transition-all transform group-hover:translate-x-1 duration-300 font-bold text-sm">
                        →
                      </span>
                    </div>
                    {item.desc && (
                      <p className="text-[11px] text-zinc-500 mt-1 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
