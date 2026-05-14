"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";

interface SubLink {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: any;
  subLinks?: SubLink[];
  isHash?: boolean;
}

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

  const allLinks: NavLink[] = useMemo(() => [
    { label: t("universe"), href: "/universo" as const },
    { label: t("structures"), href: "/estructuras" as const },
    { label: t("astronomicalData"), href: "/dato-astronomico" as const },
    { label: t("argentinaSpace"), href: "/explorar/argentina-espacio" as const },
    { label: t("observeSky"), href: "/explorar/cielo" as const },
    { label: t("matter"), href: "/#materia" as const, isHash: true },
    { label: t("spectrum"), href: "/#materia" as const, isHash: true },
    { label: t("solarSystem"), href: "/#sistema-solar" as const, isHash: true },
    { label: t("moons"), href: "/#lunas" as const, isHash: true },
    { label: t("constellations"), href: "/#constelaciones" as const, isHash: true },
    { label: t("newsletter"), href: "/#newsletter" as const, isHash: true },
    { label: t("photoGallery"), href: "/#galeria" as const, isHash: true },
    { label: t("aboutUs"), href: "/#quienes-somos" as const, isHash: true },
  ], [t]);

  // Sections for the current page (anchor links)
  const currentSections = useMemo(() => {
    return allLinks.filter(link => link.isHash);
  }, [allLinks]);

  // Global pages for the logo menu
  const globalPages = useMemo(() => {
    return allLinks.filter(link => !link.isHash);
  }, [allLinks]);

  // Split sections for flanking (fewer links for the capsule look)
  const leftSections = currentSections.slice(0, 3);
  const rightSections = currentSections.slice(3, 6);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`pointer-events-auto relative flex items-center justify-between px-2 py-1.5 rounded-full border border-white/10 bg-[#0a0a0f]/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 ${
          isScrolled ? "scale-95 max-w-4xl" : "max-w-5xl"
        } w-full`}
      >
        {/* Left Side: Contextual Links */}
        <div className="hidden lg:flex flex-1 justify-end items-center gap-6 pr-6">
          {leftSections.map((link) => (
            <SectionLink key={link.label} link={link} />
          ))}
        </div>

        {/* Center: Logo Button */}
        <div className="relative">
          <LogoButton isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        </div>

        {/* Right Side: Contextual Links + Language Switcher */}
        <div className="flex-1 flex items-center">
          <div className="hidden lg:flex flex-1 justify-start items-center gap-6 pl-6">
            {rightSections.map((link) => (
              <SectionLink key={link.label} link={link} />
            ))}
          </div>
          
          <div className="flex-none pr-2">
            <LanguageSwitcher />
          </div>
        </div>
      </motion.div>

      {/* Global Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <MenuOverlay 
            links={globalPages} 
            onClose={() => setMenuOpen(false)} 
          />
        )}
      </AnimatePresence>
    </header>
  );
}

function SectionLink({ link }: { link: NavLink }) {
  return (
    <Link
      href={link.href}
      className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/60 hover:text-white transition-all duration-300 relative group whitespace-nowrap"
    >
      {link.label}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500/50 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

function LogoButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center focus:outline-none"
    >
      <motion.div 
        animate={isOpen ? { scale: 0.9 } : { scale: 1 }}
        className="relative h-11 w-11 rounded-full p-0.5 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 border border-white/10 shadow-lg transition-all duration-500 group-hover:border-white/30"
      >
        <div className="h-full w-full rounded-full overflow-hidden relative bg-[#0a0a0f]">
          <Image
            src="https://i.ibb.co/ZYgsQbN/Logo-Moda-Femenina-Minimalista-Negro-y-Rosa-2.png"
            alt="JEO Menu"
            fill
            className="object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
            sizes="44px"
          />
        </div>
        
        {/* Mini Toggle Indicator */}
        <div className="absolute -right-1 -bottom-1 bg-blue-500 rounded-full p-0.5 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
          {isOpen ? <X className="h-2.5 w-2.5 text-white" /> : <Menu className="h-2.5 w-2.5 text-white" />}
        </div>
      </motion.div>
    </button>
  );
}

function MenuOverlay({ links, onClose }: { links: NavLink[]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[55] flex items-center justify-center p-6 cursor-pointer"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0a0a0f]/80 backdrop-blur-2xl" />

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
            className="group block p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 cursor-default"
          >
            <span className="text-[10px] font-mono text-blue-500/40 mb-4 block">EXPLORE 0{i+1}</span>
            <h3 className="text-2xl font-bold text-white/80 group-hover:text-white transition-colors">{link.label}</h3>
            <div className="mt-4 h-0.5 w-0 bg-blue-500/50 transition-all duration-500 group-hover:w-full" />
          </Link>
        ))}
      </motion.nav>
    </motion.div>
  );
}
