"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface SearchItem {
  titleKey: string;
  descKey: string;
  href: string;
  category: string;
  isHash?: boolean;
}

// Static index of all searchable content
const SEARCH_INDEX: SearchItem[] = [
  // Cosmos
  { titleKey: "home", descKey: "homeDesc", href: "/", category: "cosmos" },
  { titleKey: "researchTopics", descKey: "researchTopicsDesc", href: "/temas", category: "cosmos" },
  { titleKey: "universe", descKey: "universeDesc", href: "/universo", category: "cosmos" },
  { titleKey: "solarSystem", descKey: "solarSystemDesc", href: "/sistema-solar", category: "cosmos" },
  { titleKey: "constellations", descKey: "constellationsDesc", href: "/constelaciones", category: "cosmos" },
  { titleKey: "cosmicStructures", descKey: "cosmicStructuresDesc", href: "/estructuras", category: "cosmos" },
  // Multimedia
  { titleKey: "newsletter", descKey: "newsletterDesc", href: "#newsletter-seccion", category: "multimedia", isHash: true },
  { titleKey: "eBooks", descKey: "eBooksDesc", href: "#", category: "multimedia", isHash: true },
  { titleKey: "socialMedia", descKey: "socialMediaDesc", href: "#", category: "multimedia", isHash: true },
  { titleKey: "aboutJEO", descKey: "aboutJEODesc", href: "#quienes-somos", category: "multimedia", isHash: true },
  // Extra pages
  { titleKey: "photoGallery", descKey: "galleryDesc", href: "/galeria", category: "general" },
  { titleKey: "argentinaSpace", descKey: "argentineSpaceDesc", href: "/explorar/argentina-espacio", category: "general" },
  { titleKey: "observeSky", descKey: "observeSkyDesc", href: "/explorar/cielo", category: "general" },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("nav");

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
        setIsMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsFocused(false);
        setIsMobileOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Filter results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return SEARCH_INDEX.filter((item) => {
      const title = t(item.titleKey).toLowerCase();
      const desc = t(item.descKey).toLowerCase();
      return title.includes(q) || desc.includes(q);
    });
  }, [query, t]);

  const showResults = isFocused && query.trim().length > 0;

  function handleResultClick() {
    setQuery("");
    setIsFocused(false);
    setIsMobileOpen(false);
  }

  function handleMobileToggle() {
    setIsMobileOpen(!isMobileOpen);
    if (!isMobileOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop search input */}
      <div className="hidden md:flex items-center relative">
        <Search className="absolute left-3.5 h-4 w-4 text-zinc-500 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={t("searchPlaceholder")}
          className="w-48 lg:w-56 pl-10 pr-8 py-2 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/25 focus:bg-white/8 transition-all duration-200"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="absolute right-3 p-0.5 text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Mobile search toggle */}
      <button
        onClick={handleMobileToggle}
        className="md:hidden p-2 rounded-full text-white/60 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
        aria-label={t("searchPlaceholder")}
      >
        {isMobileOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
      </button>

      {/* Mobile expanded search */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "calc(100vw - 2rem)" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 mt-2 z-[100]"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                placeholder={t("searchPlaceholder")}
                className="w-full pl-9 pr-8 py-2.5 bg-zinc-950 border border-zinc-800  text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/25 transition-all duration-200"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search results dropdown */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-80 max-h-80 overflow-y-auto bg-zinc-950/98 border border-zinc-800 shadow-2xl shadow-black/60 backdrop-blur-xl z-[100]"
          >
            {/* Red accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-[#e30613] via-[#e30613]/60 to-transparent" />

            {results.length > 0 ? (
              <div className="p-2">
                <span className="block px-3 py-1.5  font-bold tracking-[0.3em] uppercase text-zinc-600">
                  {t("searchResults")} ({results.length})
                </span>
                {results.map((item, i) => {
                  const content = (
                    <div className="group block px-3 py-2.5 hover:bg-white/5 transition-all duration-200 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="font-bold uppercase tracking-wider text-white/90 group-hover:text-[#e30613] transition-colors">
                          {t(item.titleKey)}
                        </span>
                        <span className=" font-bold tracking-wider uppercase text-zinc-700 px-1.5 py-0.5 border border-zinc-800 rounded">
                          {item.category === "cosmos" ? t("cosmos") : item.category === "multimedia" ? t("multimedia") : "General"}
                        </span>
                      </div>
                      <p className=" text-zinc-500 mt-0.5 font-light leading-relaxed">
                        {t(item.descKey)}
                      </p>
                    </div>
                  );

                  if (item.isHash) {
                    return (
                      <a key={i} href={item.href} onClick={handleResultClick}>
                        {content}
                      </a>
                    );
                  }

                  return (
                    <Link key={i} href={item.href} onClick={handleResultClick}>
                      {content}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-xs text-zinc-500">{t("noResults")}</p>
                <p className="text-[10px] text-zinc-700 mt-1">&ldquo;{query}&rdquo;</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
