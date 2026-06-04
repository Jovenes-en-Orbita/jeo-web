"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";
import { Menu, X, Globe } from "lucide-react";
import PlanetLogo from "./components/header/PlanetLogo";
import LanguageSwitcher from "./components/LanguageSwitcher";
import MenuOverlay from "./components/header/MenuOverlay";
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
    [t]
  );

  // Filter links for desktop horizontal header
  const mainLinks = useMemo(() => {
    return allLinks.filter((link) => !link.isHash);
  }, [allLinks]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#08090b]/95 backdrop-blur-md shadow-lg border-b border-zinc-800/80"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Red NASA line decoration at top */}
      <div className="h-[3px] w-full bg-[#e30613]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="h-10 w-10 flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
            <PlanetLogo isOpen={menuOpen} isHovered={false} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-[0.25em] text-white uppercase font-heading group-hover:text-zinc-200 transition-colors">
              JÓVENES EN ÓRBITA
            </span>
            <span className="text-[9px] font-bold tracking-[0.4em] text-[#e30613] uppercase -mt-0.5">
              DIVULGACIÓN CIENTÍFICA
            </span>
          </div>
        </Link>

        {/* Center: Main Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-bold tracking-widest uppercase text-white/80 hover:text-white transition-colors relative py-2 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e30613] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right Side: Actions (Desktop/Mobile) */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          {/* Toggle Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Global Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <MenuOverlay links={allLinks} onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}
