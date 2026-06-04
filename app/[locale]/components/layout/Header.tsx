"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./components/LanguageSwitcher";
import MenuOverlay from "./components/header/MenuOverlay";

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

  // Determine local section links based on the active page
  const activeSectionLinks = useMemo(() => {
    if (pathname === "/" || pathname === "") {
      return [
        { label: t("aboutUs"), href: "#quienes-somos" },
        { label: "Argentina", href: "#argentina-espacio" },
        { label: "Galería", href: "#galeria" },
        { label: t("newsletter"), href: "#newsletter-seccion" },
        { label: "Contacto", href: "#contacto-seccion" },
      ];
    }
    if (pathname === "/universo") {
      return [
        { label: "Origen", href: "#origen" },
        { label: "Desarrollo", href: "#desarrollo" },
        { label: "Composición", href: "#composicion" },
        { label: "Materia", href: "#materia" },
        { label: "Características", href: "#caracteristicas" },
      ];
    }
    if (pathname === "/sistema-solar") {
      return [
        { label: t("solarSystem"), href: "#sistema-solar" },
        { label: t("moons"), href: "#lunas" },
      ];
    }
    if (pathname === "/constelaciones") {
      return [
        { label: t("constellations"), href: "#constelaciones" },
      ];
    }
    return [];
  }, [pathname, t]);

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
        {/* Left Side: Brand Logo Text (de-implemented planet logo as requested) */}
        <Link href="/" className="flex flex-col group focus:outline-none">
          <span className="text-sm font-black tracking-[0.25em] text-white uppercase font-heading group-hover:text-zinc-200 transition-colors">
            JÓVENES EN ÓRBITA
          </span>
          <span className="text-[9px] font-bold tracking-[0.4em] text-[#e30613] uppercase -mt-0.5">
            DIVULGACIÓN CIENTÍFICA
          </span>
        </Link>

        {/* Center: Active Page Local Section Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          {activeSectionLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-bold tracking-widest uppercase text-white/80 hover:text-white transition-colors relative py-2 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e30613] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Side: Actions (Desktop/Mobile) */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          {/* Toggle Menu Button (Hamburguesa) - Opens full platform sub-pages */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all text-white focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Global Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <MenuOverlay onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}
