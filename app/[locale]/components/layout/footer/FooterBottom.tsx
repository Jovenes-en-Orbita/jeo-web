"use client";

import { useTranslations } from "next-intl";
import SocialLinks from "../../shared/SocialLinks";

export default function FooterBottom() {
  const t = useTranslations("footer");

  return (
    <div className="mt-16 pt-8 border-t border-white/5 text-center">
      <p className="text-xs text-white/30">
        {t("copyright", { year: new Date().getFullYear() })}
      </p>
      <SocialLinks className="flex items-center justify-center gap-6 mt-6" />
    </div>
  );
}
