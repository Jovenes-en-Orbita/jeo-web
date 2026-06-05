import { setRequestLocale } from "next-intl/server";
import HeroSlider from "./components/home/HeroSlider";
import NewsSection from "./components/home/NewsSection";
import WelcomePopup from "./components/home/WelcomePopup";
import PhotoGallerySection from "./components/home/PhotoGallerySection";
import AboutSection from "./components/home/AboutSection";
import ArgentinaSpaceSection from "./components/home/ArgentinaSpaceSection";
import SectionBadge from "./components/shared/SectionBadge";
import ContactForm from "./components/layout/footer/ContactForm";
import HomepageNewsletter from "./components/home/HomepageNewsletter";
import { Landmark, Mail, Phone, MapPin } from "lucide-react";

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
      <ArgentinaSpaceSection />

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
