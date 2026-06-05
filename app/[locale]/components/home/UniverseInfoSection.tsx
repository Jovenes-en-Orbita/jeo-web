import GlowImage from "@/app/[locale]/components/shared/GlowImage";
import SectionBadge from "@/app/[locale]/components/shared/SectionBadge";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function UniverseInfoSection() {
  const t = useTranslations("universe");

  return (
    <section
      id="info-universo"
      className="relative py-24 lg:py-32 px-4 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text */}
        <div className="animate-fade-in-up">
          <SectionBadge color="blue">{t("badge")}</SectionBadge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {t("title")}
            <br />
            {t("titleBreak")}
          </h2>
          <h3 className="mt-4 text-lg text-white/50 font-light">
            {t("subtitle")}
          </h3>
          <p className="mt-6 text-white/60 leading-relaxed">
            {t("description")}
          </p>
          <Link
            href="/universo"
            className="inline-flex items-center gap-2 mt-8 text-sm  text-blue-400 hover:text-blue-300 group transition-colors"
          >
            {t("discoverMore")}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Image */}
        <GlowImage
          src="https://i.ibb.co/LrShG6B/desktop-wallpaper-stars-in-space-background-real-space.jpg"
          alt={t("imageAlt")}
          width={650}
          height={450}
        />
      </div>
    </section>
  );
}
