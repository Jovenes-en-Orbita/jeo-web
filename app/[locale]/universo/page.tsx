import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Sparkles, Clock, Zap } from "lucide-react";

import NebulaGlows from "../components/shared/NebulaGlows";
import MatterCards from "../components/home/MatterCards";

export default async function UniversePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <UniverseContent />;
}

function UniverseContent() {
  const t = useTranslations("universePage");

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        
        {/* Nebula Glows */}
        <NebulaGlows opacity="opacity-50" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050508]/50 to-[#050508] z-[1]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {t("backHome")}
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
            {t("title")}
          </h1>
          <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-5xl mx-auto px-4 py-20 space-y-32">
        {/* Origin */}
        <div id="origen" className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">
                <Zap className="h-6 w-6 text-orange-400" />
              </div>
              <h2 className="text-3xl font-bold">{t("originTitle")}</h2>
            </div>
            <p className="text-white/60 leading-relaxed text-lg">
              {t("originContent")}
            </p>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10">
            <Image
              src="https://i.postimg.cc/qMZBG7wk/25400.png"
              alt="Origin"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Development */}
        <div id="desarrollo" className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative aspect-video rounded-3xl overflow-hidden border border-white/10">
            <Image
              src="https://i.ibb.co/LrShG6B/desktop-wallpaper-stars-in-space-background-real-space.jpg"
              alt="Evolution"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold">{t("evolutionTitle")}</h2>
            </div>
            <p className="text-white/60 leading-relaxed text-lg">
              {t("evolutionContent")}
            </p>
          </div>
        </div>

        {/* Composition */}
        <div id="composicion" className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Sparkles className="h-32 w-32" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl font-bold mb-8">{t("compositionTitle")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <span className="block text-4xl font-bold text-purple-400 mb-2">68%</span>
                <span className="text-sm uppercase tracking-widest text-white/40">{t("darkEnergy")}</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-blue-400 mb-2">27%</span>
                <span className="text-sm uppercase tracking-widest text-white/40">{t("darkMatter")}</span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-green-400 mb-2">5%</span>
                <span className="text-sm uppercase tracking-widest text-white/40">{t("baryonicMatter")}</span>
              </div>
            </div>
            <p className="mt-10 text-white/60 leading-relaxed">
              {t("compositionContent")}
            </p>
          </div>
        </div>

        {/* Matter detail cards */}
        <div id="materia" className="border-t border-b border-zinc-900 my-16 py-8">
          <h3 className="text-xl font-bold uppercase tracking-widest text-center text-[#e30613] mb-8 font-heading">
            Componentes e Interacciones de la Materia
          </h3>
          <MatterCards />
        </div>

        {/* Characteristics */}
        <div id="caracteristicas" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors">
              <h4 className="text-xl font-bold mb-4">{t(`charTitle${i}`)}</h4>
              <p className="text-sm text-white/50 leading-relaxed">
                {t(`charDesc${i}`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="py-32 px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">{t("ctaTitle")}</h2>
        <Link
          href="/estructuras"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-xl shadow-blue-600/20"
        >
          {t("ctaButton")}
          <Sparkles className="h-5 w-5" />
        </Link>
      </section>
    </div>
  );
}
