"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const t = useTranslations("nav");

  const navLinks = [
    { label: t("universe"), href: "/universo" as const },
    {
      label: t("varied"),
      href: "/" as const,
      subLinks: [
        { label: t("matter"), href: "/#materia" as const },
        { label: t("spectrum"), href: "/#materia" as const },
        { label: t("argentinaSpace"), href: "/explorar/argentina-espacio" as const },
        { label: t("observeSky"), href: "/explorar/cielo" as const },
      ],
    },
    { label: t("structures"), href: "/estructuras" as const },
    { label: t("solarSystem"), href: "/#sistema-solar" as const },
    { label: t("moons"), href: "/#lunas" as const },
    { label: t("constellations"), href: "/#constelaciones" as const },
    { label: t("newsletter"), href: "/#newsletter" as const },
    { label: t("astronomicalData"), href: "/dato-astronomico" as const },
    { label: t("photoGallery"), href: "/#galeria" as const },
    { label: t("aboutUs"), href: "/#quienes-somos" as const },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-blue-500/40 transition-all duration-300">
            <Image
              src="https://i.ibb.co/ZYgsQbN/Logo-Moda-Femenina-Minimalista-Negro-y-Rosa-2.png"
              alt="Jovenes en Orbita"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <span className="hidden sm:block text-sm font-semibold tracking-widest uppercase text-white/80 group-hover:text-white transition-colors">
            JEO
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-1"
          role="navigation"
          aria-label={t("mainNav")}
        >
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() =>
                "subLinks" in link &&
                link.subLinks &&
                setOpenDropdown(link.label)
              }
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1 px-4 py-2 text-xs font-medium tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors duration-200"
              >
                {link.label}
                {"subLinks" in link && link.subLinks && (
                  <ChevronDown className="h-3 w-3" />
                )}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {"subLinks" in link &&
                  link.subLinks &&
                  openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-64 rounded-xl bg-[#141420]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
                    >
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          ))}

          {/* Search Box (Desktop) */}
          <div className="relative ml-4 hidden xl:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-blue-500/50 w-48 transition-all"
            />
          </div>

          {/* Language Switcher (Desktop) */}
          <LanguageSwitcher />
        </nav>

        {/* Mobile: Search + Language + Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button className="p-2 rounded-lg text-white/40 hover:text-white transition-colors">
            <Search className="h-4 w-4" />
          </button>
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-white/5 bg-[#0a0a0f]/95 backdrop-blur-xl"
            role="navigation"
            aria-label={t("mobileNav")}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() =>
                      !("subLinks" in link && link.subLinks) &&
                      setMobileOpen(false)
                    }
                    className="block px-4 py-3 text-sm font-medium tracking-wider uppercase text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                  {"subLinks" in link && link.subLinks && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm text-white/40 hover:text-white/80 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
