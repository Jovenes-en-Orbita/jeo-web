import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Rocket, Satellite, Factory, Landmark } from "lucide-react";

import NebulaGlows from "../../components/shared/NebulaGlows";

export default async function ArgentinaSpacePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ArgentinaSpaceContent />;
}

function ArgentinaSpaceContent() {
  const t = useTranslations("argentinaSpacePage");

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">

        {/* Nebula Glows */}
        <NebulaGlows opacity="opacity-50" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050508] z-[1]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Link
            href="/#explorar"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-indigo-200">
            {t("title")}
          </h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Main Sections */}
      <section className="max-w-6xl mx-auto px-4 py-24 space-y-24">
        {/* History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Landmark className="h-6 w-6 text-blue-400" />
              <h2 className="text-3xl font-bold">{t("historyTitle")}</h2>
            </div>
            <p className="text-white/60 leading-relaxed text-lg mb-6">
              {t("historyContent")}
            </p>
          </div>
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10">
            <Image
              src="https://i.postimg.cc/pX1SPqD0/Optimismo-moderado-en-la-astronomia-espanola.jpg"
              alt="History"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Satellites & Missions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
            <Satellite className="h-10 w-10 text-blue-400 mb-6" />
            <h3 className="text-xl font-bold mb-4">{t("satellitesTitle")}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{t("satellitesContent")}</p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
            <Rocket className="h-10 w-10 text-purple-400 mb-6" />
            <h3 className="text-xl font-bold mb-4">{t("launchersTitle")}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{t("launchersContent")}</p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
            <Factory className="h-10 w-10 text-green-400 mb-6" />
            <h3 className="text-xl font-bold mb-4">{t("companiesTitle")}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{t("companiesContent")}</p>
          </div>
        </div>

        {/* Future Projects */}
        <div className="relative p-12 rounded-[3rem] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/5 overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-bold mb-6">{t("futureTitle")}</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              {t("futureContent")}
            </p>
          </div>
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Rocket className="h-48 w-48" />
          </div>
        </div>
      </section>
    </div>
  );
}
