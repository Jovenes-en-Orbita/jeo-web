"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { NavLink } from "../../HeaderTypes";

interface MenuOverlayProps {
  links: NavLink[];
  onClose: () => void;
}

export default function MenuOverlay({ links, onClose }: MenuOverlayProps) {
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
        className="absolute top-8 right-8 z-50 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group"
      >
        <X className="h-6 w-6 text-white/50 group-hover:text-[#e30613] group-hover:rotate-90 transition-all duration-500" />
      </button>

      {/* Grid Menu */}
      <motion.nav
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[80vh] overflow-y-auto p-4 scrollbar-none"
      >
        {links.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="group block p-6 rounded-none bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-zinc-800 transition-all duration-500 cursor-default"
          >
            <span className="text-[10px] font-mono text-[#e30613]/80 mb-4 block tracking-widest font-bold">
              EXPLORE {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-xl font-bold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors font-heading">
              {link.label}
            </h3>
            <div className="mt-4 h-0.5 w-0 bg-[#e30613] transition-all duration-500 group-hover:w-full" />
          </Link>
        ))}
      </motion.nav>
    </motion.div>
  );
}
