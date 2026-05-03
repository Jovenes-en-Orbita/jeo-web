import Image from "next/image";
import { Link } from "@/i18n/routing";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "datoPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function DatoAstronomicoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("datoPage");

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
      {/* Navigation */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors mb-8"
      >
        {t("backHome")}
      </Link>

      {/* Badge */}
      <div className="mb-8">
        <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-white/70 border-2 border-white/10 rounded-full">
          {t("galleryBadge")}
        </span>
      </div>

      {/* Category tags */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-3.5 w-0.5 bg-white/30 rounded-full" />
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/50">
          {t("science")}
        </span>
        <div className="h-3.5 w-0.5 bg-white/30 rounded-full" />
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/50">
          {t("astronomy")}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
        {t("title")}
      </h1>

      <p className="text-lg text-white/50 mb-2 max-w-2xl">
        {t("intro")}
      </p>
      <p className="text-sm text-white/30 italic text-right mb-12">
        {t("quoteAuthor")}
      </p>

      {/* Main image */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 mb-16">
        <Image
          src="https://i.postimg.cc/1tfrNtB8/cluster-1.png"
          alt={t("mainImageAlt")}
          width={1000}
          height={600}
          className="w-full h-auto object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
          priority
        />
      </div>

      {/* Article #1 */}
      <article className="border-t border-white/5 pt-12">
        <span className="text-sm font-mono text-white/20">1/20</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-4 leading-tight">
          {t("articleTitle")}
        </h2>
        <p className="text-base text-white/40 italic mb-8">
          {t("articleSubtitle")}
        </p>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 mb-8">
          <Image
            src="https://i.postimg.cc/23RvZtZL/110899742-pia23645-hires-1.jpg"
            alt={t("articleImageAlt")}
            width={800}
            height={400}
            className="w-full h-auto object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        <div className="prose prose-invert prose-sm max-w-none">
          <p className="text-white/50 leading-relaxed text-justify">
            {t("articleBody")}
          </p>
        </div>
      </article>
    </div>
  );
}
