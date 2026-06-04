import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import ImageOverlayCard from "../components/shared/ImageOverlayCard";
import SectionBadge from "../components/shared/SectionBadge";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default async function TemasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TemasContent />;
}

function TemasContent() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Header section inspired by NASA portal */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 text-xs font-bold uppercase tracking-widest group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Volver al Inicio
        </Link>

        <div className="border-l-4 border-[#e30613] pl-6 py-2">
          <span className="text-[10px] tracking-[0.3em] font-bold text-[#e30613] uppercase block mb-2">
            DIVULGACIÓN CIENTÍFICA
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-tight font-heading">
            Temas de Investigación
          </h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 font-light max-w-3xl leading-relaxed">
            Explora las misiones científicas y áreas de investigación prioritarias del cosmos.
          </p>
        </div>
      </div>

      {/* Topics Directory */}
      <section className="py-12 bg-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Topic 1: El Universo */}
            <div className="group flex flex-col bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-colors">
              <div className="relative aspect-video">
                <ImageOverlayCard
                  src="https://i.ibb.co/LrShG6B/desktop-wallpaper-stars-in-space-background-real-space.jpg"
                  alt="El Universo"
                  className="h-full w-full"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-3 group-hover:text-nasa-red transition-colors font-heading">
                    El Universo
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-6">
                    Descubre el origen del cosmos, la materia oscura, la energía oscura, la antimateria y la naturaleza de la luz.
                  </p>
                </div>
                <Link
                  href="/universo"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-nasa-red hover:text-white transition-colors"
                >
                  Explorar Universo
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Topic 2: Sistema Solar */}
            <div className="group flex flex-col bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-colors">
              <div className="relative aspect-video">
                <ImageOverlayCard
                  src="https://i.ibb.co/bRDx88B7/stsci-01gk2kmys6hads6nd8nrhg53rp.webp"
                  alt="Sistema Solar"
                  className="h-full w-full"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-3 group-hover:text-nasa-red transition-colors font-heading">
                    Sistema Solar
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-6">
                    Explora los ocho planetas que orbitan nuestra estrella y los fascinantes satélites naturales que los acompañan.
                  </p>
                </div>
                <Link
                  href="/sistema-solar"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-nasa-red hover:text-white transition-colors"
                >
                  Explorar Sistema Solar
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Topic 3: Constelaciones */}
            <div className="group flex flex-col bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-colors">
              <div className="relative aspect-video">
                <ImageOverlayCard
                  src="https://i.postimg.cc/qMZBG7wk/25400.png"
                  alt="Constelaciones"
                  className="h-full w-full"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-3 group-hover:text-nasa-red transition-colors font-heading">
                    Constelaciones
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light mb-6">
                    Descubre la historia de los mapas estelares y aprende a identificar los dibujos mitológicos en la bóveda celeste.
                  </p>
                </div>
                <Link
                  href="/constelaciones"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-nasa-red hover:text-white transition-colors"
                >
                  Explorar Constelaciones
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
