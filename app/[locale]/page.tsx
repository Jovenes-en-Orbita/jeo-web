import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import HeroSlider from "./components/home/HeroSlider";
import NewsSection from "./components/home/NewsSection";
import WelcomePopup from "./components/home/WelcomePopup";
import PhotoGallerySection from "./components/home/PhotoGallerySection";
import AboutSection from "./components/home/AboutSection";
import ImageOverlayCard from "./components/shared/ImageOverlayCard";
import SectionBadge from "./components/shared/SectionBadge";
import ContactForm from "./components/layout/footer/ContactForm";
import HomepageNewsletter from "./components/home/HomepageNewsletter";
import { ArrowRight, Landmark, Mail, Phone, MapPin } from "lucide-react";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <WelcomePopup />
      <HeroSlider />

      {/* Quiénes Somos Section: Información breve institucional */}
      <AboutSection />

      {/* Argentina en el Espacio Section: Información breve con enlace */}
      <section id="argentina-espacio" className="py-24 bg-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-video border border-zinc-800 bg-zinc-950">
              <ImageOverlayCard
                src="https://i.ibb.co/9H2VGdrm/Captura-de-pantalla-2025-12-23-180706.png"
                alt="Argentina en el Espacio"
                className="h-full w-full"
              />
            </div>
            <div>
              <SectionBadge color="red">DESARROLLO NACIONAL</SectionBadge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-heading tracking-tight mb-6">
                Argentina en el Espacio
              </h2>
              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-8">
                Desde la creación de la CONAE hasta las misiones SAOCOM y el proyecto del lanzador Tronador. Conoce la historia, el presente y el futuro del desarrollo tecnológico aeroespacial argentino.
              </p>
              <Link
                href="/explorar/argentina-espacio"
                className="inline-flex items-center gap-3 px-6 py-3 border border-zinc-800 hover:border-white bg-transparent hover:bg-white text-white hover:text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 group"
              >
                Ver Misiones Argentinas
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Fotos Section: Vista breve en la homepage */}
      <PhotoGallerySection />

      {/* News/Noticias */}
      <NewsSection />

      {/* Newsletter Section: Suscripción en la página principal con breve info */}
      <HomepageNewsletter />

      {/* Contacto Section: Información breve de contacto y formulario */}
      <section id="contacto-seccion" className="py-24 bg-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="flex flex-col justify-center">
              <SectionBadge color="red">CONTACTO</SectionBadge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-heading tracking-tight mb-6">
                Ponte en Órbita
              </h2>
              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-8">
                ¿Tienes consultas sobre nuestras olimpiadas astronómicas, talleres de divulgación o reportes del sitio? Ponte en contacto con el equipo de Jóvenes en Órbita.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                  <Mail className="h-5 w-5 text-nasa-red" />
                  <span className="text-xs font-mono">contacto@jovenesenorbita.com</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <Phone className="h-5 w-5 text-zinc-600" />
                  <span className="text-xs font-mono">+54 (11) 5555-0199</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <MapPin className="h-5 w-5 text-zinc-600" />
                  <span className="text-xs font-mono">Buenos Aires, Argentina</span>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
