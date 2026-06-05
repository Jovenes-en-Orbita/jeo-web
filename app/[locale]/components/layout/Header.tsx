"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./components/LanguageSwitcher";
import SearchBar from "./components/header/SearchBar";
import DropdownMenu from "./components/header/DropdownMenu";
import type { DropdownItem } from "./components/header/DropdownMenu";
import MobileMenu from "./components/header/MobileMenu";
import { LogoLetras } from "../shared/Icons";




export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const t = useTranslations("nav");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Cosmos dropdown items
  const cosmosItems: DropdownItem[] = useMemo(
    () => [
      { label: t("researchTopics"), href: "/temas", desc: t("researchTopicsDesc") },
      { label: t("universe"), href: "/universo", desc: t("universeDesc") },
      { label: t("solarSystem"), href: "/sistema-solar", desc: t("solarSystemDesc") },
      { label: t("constellations"), href: "/constelaciones", desc: t("constellationsDesc") },
      { label: t("cosmicStructures"), href: "/estructuras", desc: t("cosmicStructuresDesc") },
    ],
    [t]
  );

  // Multimedia dropdown items
  const multimediaItems: DropdownItem[] = useMemo(
    () => [
      { label: t("newsletter"), href: "#newsletter-seccion", desc: t("newsletterDesc"), isHash: true },
      { label: t("eBooks"), href: "#", desc: t("eBooksDesc"), isHash: true },
      { label: t("socialMedia"), href: "#", desc: t("socialMediaDesc"), isHash: true },
      { label: t("aboutJEO"), href: "#quienes-somos", desc: t("aboutJEODesc"), isHash: true },
    ],
    [t]
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-[#08090b]/95 backdrop-blur-md shadow-lg border-b border-zinc-800/80"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      {/* Red NASA line decoration at top */}
      <div className="h-[3px] w-full bg-[#e30613]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Search */}
        <div className="flex-shrink-0">
          <SearchBar />
        </div>

        {/* Center: Logo */}
        <Link href="/" className="flex items-center group focus:outline-none flex-shrink-0" aria-label="Jóvenes en Órbita">
          <LogoLetras className="h-16 w-auto text-white group-hover:text-zinc-200 transition-all duration-300" />
        </Link>

        {/* Right: Dropdowns + Language */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop dropdown menus */}
          <div className="hidden md:flex items-center gap-2">
            <DropdownMenu title={t("cosmos")} items={cosmosItems} />
            <DropdownMenu title={t("multimedia")} items={multimediaItems} />
          </div>

          {/* Language switcher */}
          <LanguageSwitcher />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all text-white focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            onClose={() => setMobileMenuOpen(false)}
            cosmosItems={cosmosItems}
            multimediaItems={multimediaItems}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
