"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";

import MenuOverlay from "./components/header/MenuOverlay";
import LeftSide from "./components/header/LeftSide";
import CenterSide from "./components/header/CenterSide";
import RightSide from "./components/header/RightSide";
import { NavLink } from "./HeaderTypes";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const allLinks: NavLink[] = useMemo(
    () => [
      { label: t("universe"), href: "/universo" as const },
      { label: t("structures"), href: "/estructuras" as const },
      { label: t("astronomicalData"), href: "/dato-astronomico" as const },
      {
        label: t("argentinaSpace"),
        href: "/explorar/argentina-espacio" as const,
      },
      { label: t("observeSky"), href: "/explorar/cielo" as const },
      { label: t("matter"), href: "/#materia" as const, isHash: true },
      { label: t("spectrum"), href: "/#materia" as const, isHash: true },
      {
        label: t("solarSystem"),
        href: "/#sistema-solar" as const,
        isHash: true,
      },
      { label: t("moons"), href: "/#lunas" as const, isHash: true },
      {
        label: t("constellations"),
        href: "/#constelaciones" as const,
        isHash: true,
      },
      { label: t("newsletter"), href: "/#newsletter" as const, isHash: true },
      { label: t("photoGallery"), href: "/#galeria" as const, isHash: true },
      { label: t("aboutUs"), href: "/#quienes-somos" as const, isHash: true },
    ],
    [t],
  );

  // Sections for the current page (anchor links)
  const currentSections = useMemo(() => {
    return allLinks.filter((link) => link.isHash);
  }, [allLinks]);

  // Global pages for the logo menu
  const globalPages = useMemo(() => {
    return allLinks.filter((link) => !link.isHash);
  }, [allLinks]);

  // Split sections for flanking
  const leftSections = currentSections.slice(0, 3);
  const rightSections = currentSections.slice(3, 6);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`pointer-events-auto relative flex items-center justify-between px-2 py-1.5 rounded-full border border-white/10 bg-[#0a0a0f]/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 ${
          isScrolled ? "scale-95 max-w-4xl" : "max-w-5xl"
        } w-full`}
      >
        {/* Left Side: Contextual Links */}
        <LeftSide sections={leftSections} />

        {/* Center: Logo Button */}
        <CenterSide isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />

        {/* Right Side: Contextual Links + Language Switcher */}
        <RightSide sections={rightSections} />
      </motion.div>

      {/* Global Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <MenuOverlay links={globalPages} onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}
