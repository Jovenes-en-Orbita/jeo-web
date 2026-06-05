"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const otherLocale = locale === "es" ? "en" : "es";
  const label = locale === "es" ? "EN" : "ES";

  function handleSwitch() {
    router.replace(pathname, { locale: otherLocale });
  }

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-1.5 px-4 py-2 rounded-full  font-bold tracking-wider uppercase text-white/60 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200"
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
      title={locale === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <Globe className="h-4 w-4" />
      {label}
    </button>
  );
}
