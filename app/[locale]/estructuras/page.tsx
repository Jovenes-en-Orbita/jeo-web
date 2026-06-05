import Image from "next/image";
import { Link } from "@/i18n/routing";
import { structures } from "@/app/data/structures";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

const structureKeys = [
  "superclusters",
  "galaxyClusters",
  "galaxies",
  "nebulae",
  "starClusters",
  "stars",
  "neutronStars",
  "blackHoles",
  "planetarySystems",
  "planets",
  "asteroids",
  "comets",
  "meteoroids",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "structuresPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function EstructurasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("structuresPage");

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
      {/* Header */}
      <div className="mb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors mb-8"
        >
          {t("backHome")}
        </Link>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          {t("title")}
        </h1>
        <p className="mt-4 text-white/50 max-w-2xl leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      {/* Structure list */}
      <div className="space-y-6">
        {structures.map((structure, i) => (
          <Link
            key={structure.slug}
            href={`/estructuras/${structure.slug}`}
            className="group flex flex-col sm:flex-row items-start gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative w-full sm:w-48 h-36 flex-shrink-0 rounded-xl overflow-hidden">
              <Image
                src={structure.image}
                alt={structureKeys[i] ? t(`items.${structureKeys[i]}.title` as const) : structure.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 192px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent sm:bg-none" />
            </div>

            {/* Separator (desktop) */}
            <div className="hidden sm:block w-px h-28 self-center bg-gradient-to-b from-transparent via-white/10 to-transparent flex-shrink-0" />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-mono text-white/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {structureKeys[i] ? t(`items.${structureKeys[i]}.title` as const) : structure.title}
                </h2>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                {structureKeys[i] ? t(`items.${structureKeys[i]}.description` as const) : structure.description}
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs  text-blue-400/60 group-hover:text-blue-400 transition-colors">
                {t("readMore")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
