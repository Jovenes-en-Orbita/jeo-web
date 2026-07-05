"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname, Link, useRouter } from "@/i18n/routing";
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import LanguageSwitcher from "./components/LanguageSwitcher";
import SearchBar from "./components/header/SearchBar";
import DropdownMenu from "./components/header/DropdownMenu";
import type { DropdownItem } from "./components/header/DropdownMenu";
import MobileMenu from "./components/header/MobileMenu";
import { LogoLetras } from "../shared/Icons";
import LoginModal from "../shared/LoginModal";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();

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

  // Fetch session on load and route changes
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth check failed", err);
        setUser(null);
      }
    };
    checkAuth();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setUserMenuOpen(false);
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

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
    <>
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

            {/* User Menu / Login Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950/40 text-sm font-medium text-white hover:bg-zinc-900/60 transition-colors focus:outline-none cursor-pointer"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-950/60 border border-red-905/40 text-red-500">
                    <UserIcon className="h-3.5 w-3.5" />
                  </div>
                  <span className="hidden sm:inline max-w-[120px] truncate text-white">
                    {user.name || user.email}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {userMenuOpen && (
                  <>
                    {/* Dropdown Backdrop */}
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-zinc-850 bg-[#0c0d12] p-2 shadow-2xl z-20 backdrop-blur-md">
                      <div className="px-3 py-2 text-xs border-b border-zinc-900 mb-1">
                        <p className="font-semibold text-white truncate">{user.name || "Usuario JEO"}</p>
                        <p className="text-zinc-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-950/60 border border-red-900/40 text-red-400 uppercase">
                          {user.role === "ADMIN" ? "Admin" : user.department || "Personal"}
                        </span>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4 text-zinc-400" />
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="px-4 py-2 rounded-lg text-sm font-semibold border border-white/10 hover:border-red-600 bg-zinc-950/40 hover:bg-red-600/10 text-white transition-all cursor-pointer"
              >
                Iniciar Sesión
              </button>
            )}

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

      {/* Login Modal */}
      <AnimatePresence>
        {loginModalOpen && (
          <LoginModal
            isOpen={loginModalOpen}
            onClose={() => setLoginModalOpen(false)}
            onLoginSuccess={(userData) => setUser(userData)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
