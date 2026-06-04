"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/routing";

export interface DropdownItem {
  label: string;
  href: string;
  desc?: string;
  isHash?: boolean;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
  onNavigate?: () => void;
}

export default function DropdownMenu({ title, items, onNavigate }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  function handleItemClick() {
    setIsOpen(false);
    onNavigate?.();
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-200 border cursor-pointer ${
          isOpen
            ? "text-white bg-white/10 border-white/20"
            : "text-white/60 hover:text-white bg-transparent border-white/10 hover:border-white/20 hover:bg-white/5"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {title}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-72 bg-zinc-950/98 border border-zinc-800 shadow-2xl shadow-black/60 backdrop-blur-xl z-[100] overflow-hidden"
          >
            {/* Red accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-[#e30613] via-[#e30613]/60 to-transparent" />

            <div className="p-2">
              {items.map((item, i) => {
                const content = (
                  <div className="group block px-3 py-2.5 hover:bg-white/5 transition-all duration-200 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 group-hover:text-[#e30613] transition-colors">
                        {item.label}
                      </span>
                      <span className="text-zinc-700 group-hover:text-[#e30613] transition-all transform group-hover:translate-x-0.5 duration-200 text-xs">
                        →
                      </span>
                    </div>
                    {item.desc && (
                      <p className="text-[10px] text-zinc-500 mt-0.5 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </div>
                );

                if (item.isHash) {
                  return (
                    <a key={i} href={item.href} onClick={handleItemClick}>
                      {content}
                    </a>
                  );
                }

                return (
                  <Link key={i} href={item.href} onClick={handleItemClick}>
                    {content}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
