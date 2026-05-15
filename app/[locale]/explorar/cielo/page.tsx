import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Telescope, Map, Camera, Info } from "lucide-react";

import SpaceBackground from "../../components/shared/SpaceBackground";
import NebulaGlows from "../../components/shared/NebulaGlows";

export default async function SkyObservationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SkyObservationContent />;
}

function SkyObservationContent() {
  const t = useTranslations("skyPage");

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <SpaceBackground />

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
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            {t("title")}
          </h1>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 py-24 space-y-32">
        {/* Astrotourism */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Telescope className="h-6 w-6 text-blue-400" />
              <h2 className="text-3xl font-bold">{t("astrotourismTitle")}</h2>
            </div>
            <p className="text-white/60 leading-relaxed text-lg">
              {t("astrotourismContent")}
            </p>
          </div>
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="https://i.ibb.co/twvGpSm8/Captura-de-pantalla-2025-12-23-181022.png"
              alt="Observation"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Maps and recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
            <Map className="h-10 w-10 text-blue-400 mb-6" />
            <h3 className="text-xl font-bold mb-4">{t("mapsTitle")}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">{t("mapsContent")}</p>
            <button className="text-blue-400 text-sm font-medium hover:underline">{t("downloadMaps")}</button>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
            <Camera className="h-10 w-10 text-purple-400 mb-6" />
            <h3 className="text-xl font-bold mb-4">{t("photographyTitle")}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{t("photographyContent")}</p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
            <Info className="h-10 w-10 text-green-400 mb-6" />
            <h3 className="text-xl font-bold mb-4">{t("tipsTitle")}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{t("tipsContent")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
