import Image from "next/image";
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
          <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-blue-400 font-medium mb-4 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5">
            {t("badge")}
          </span>
          <Link href="/universo">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight hover:text-blue-300 transition-colors">
              {t("title")}
              <br />
              {t("titleBreak")}
            </h2>
          </Link>
          <h3 className="mt-4 text-lg text-white/50 font-light">
            {t("subtitle")}
          </h3>
          <p className="mt-6 text-white/60 leading-relaxed">
            {t("description")}
          </p>
          <Link
            href="/universo"
            className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-blue-400 hover:text-blue-300 group transition-colors"
          >
            {t("discoverMore")}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Image */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="https://i.ibb.co/LrShG6B/desktop-wallpaper-stars-in-space-background-real-space.jpg"
              alt={t("imageAlt")}
              width={650}
              height={450}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
