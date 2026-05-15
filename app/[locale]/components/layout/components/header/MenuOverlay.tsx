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
      className="fixed inset-0 z-100 flex items-center justify-center p-6 cursor-pointer pointer-events-auto"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-2xl" />

      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-8 right-8 z-50 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group"
      >
        <X className="h-6 w-6 text-white/50 group-hover:text-white group-hover:rotate-90 transition-all duration-500" />
      </button>

      {/* Grid Menu */}
      <motion.nav
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {links.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="group block p-6 rounded-3xl bg-white/2 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all duration-500 cursor-default"
          >
            <span className="text-[10px] font-mono text-blue-500/40 mb-4 block">
              EXPLORE 0{i + 1}
            </span>
            <h3 className="text-2xl font-bold text-white/80 group-hover:text-white transition-colors">
              {link.label}
            </h3>
            <div className="mt-4 h-0.5 w-0 bg-blue-500/50 transition-all duration-500 group-hover:w-full" />
          </Link>
        ))}
      </motion.nav>
    </motion.div>
  );
}
