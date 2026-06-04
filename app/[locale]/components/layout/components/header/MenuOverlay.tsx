"use client";

import { motion } from "framer-motion";
import { X, Compass, Globe } from "lucide-react";
import { Link } from "@/i18n/routing";

interface MenuOverlayProps {
  onClose: () => void;
}

export default function MenuOverlay({ onClose }: MenuOverlayProps) {
  // Categorized pages of the platform
  const categories = [
    {
      title: "Investigación y Cosmos",
      color: "text-[#e30613]",
      links: [
        { label: "Temas de Investigación", href: "/temas", desc: "Listado de misiones científicas y divulgación" },
        { label: "El Universo", href: "/universo", desc: "El origen del cosmos, materia oscura y luz" },
        { label: "Sistema Solar", href: "/sistema-solar", desc: "Exploración de planetas y satélites naturales" },
        { label: "Constelaciones", href: "/constelaciones", desc: "Guía de mapas estelares y mitología celeste" },
        { label: "Estructuras Cósmicas", href: "/estructuras", desc: "Supercúmulos, galaxias y agujeros negros" },
      ],
    },
    {
      title: "Comunidad y Divulgación",
      color: "text-white",
      links: [
        { label: "Inicio / Portada", href: "/", desc: "Página principal de Jóvenes en Órbita" },
        { label: "Argentina en el Espacio", href: "/explorar/argentina-espacio", desc: "Historia aeroespacial nacional" },
        { label: "Observar el Cielo", href: "/explorar/cielo", desc: "Guía práctica de astroturismo y mapas" },
        { label: "Galería de Fotos", href: "/galeria", desc: "Imágenes de alta resolución del cosmos" },
        { label: "Últimas Noticias", href: "/noticias", desc: "Descubrimientos y comunicados de prensa" },
      ],
    },
  ];

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
        {/* Cartel informativo para ver más páginas de la plataforma */}
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
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className={`text-xs font-bold uppercase tracking-widest font-heading border-l-2 border-[#e30613] pl-3 ${cat.color}`}>
                {cat.title}
              </h3>
              
              <div className="space-y-4">
                {cat.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    onClick={onClose}
                    className="group block p-4 bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold uppercase tracking-wider text-white/90 group-hover:text-[#e30613] transition-colors font-heading">
                        {link.label}
                      </span>
                      <span className="text-zinc-600 group-hover:text-[#e30613] transition-all transform group-hover:translate-x-1 duration-300 font-bold text-sm">
                        →
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1 font-light leading-relaxed">
                      {link.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
