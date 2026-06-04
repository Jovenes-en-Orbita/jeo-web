import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import PlanetGrid from "../components/home/PlanetGrid";
import MoonLayout from "../components/home/MoonLayout";

export default async function SolarSystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SolarSystemContent />;
}

function SolarSystemContent() {
  const t = useTranslations("planets");

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Header section inspired by NASA missions portal */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 text-xs font-bold uppercase tracking-widest group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          {/* Using custom back translation or static */}
          Volver al Inicio
        </Link>

        <div className="border-l-4 border-[#e30613] pl-6 py-2">
          <span className="text-[10px] tracking-[0.3em] font-bold text-[#e30613] uppercase block mb-2">
            EXPLORACIÓN ESPACIAL
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-tight font-heading">
            {t("title")}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light max-w-3xl leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Renders the rich planet grid component */}
      <div className="border-t border-zinc-900 bg-zinc-950/20">
        <PlanetGrid />
      </div>

      {/* Renders the rich moon layout component */}
      <div className="border-t border-zinc-900 bg-black">
        <MoonLayout />
      </div>

      {/* TODO: Implementar sección de órbitas dinámicas y parámetros físicos planetarios en el futuro */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 border-t border-zinc-900">
        <div className="p-8 border border-dashed border-zinc-800 bg-zinc-950/40 text-center">
          <p className="text-xs text-zinc-500 font-mono tracking-wider">
            [TODO: Implementar simulación interactiva de órbitas Keplerianas y tablas físicas detalladas (masa, gravedad, atmósfera)]
          </p>
        </div>
      </div>
    </div>
  );
}
