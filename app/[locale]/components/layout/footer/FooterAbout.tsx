"use client";

import { useTranslations } from "next-intl";

export default function FooterAbout() {
  const t = useTranslations("footer");

  return (
    <div>
      <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2">
        JEO
      </h2>
      <div className="h-px w-full bg-linear-to-r from-blue-500/50 via-purple-500/50 to-transparent mb-8" />

      <div className="space-y-4 text-sm leading-relaxed text-white/60">
        <p>{t("aboutText1")}</p>
        <p>{t("aboutText2")}</p>
        <p className="text-white/40 text-xs italic">{t("weeklyNote")}</p>
      </div>
    </div>
  );
}
