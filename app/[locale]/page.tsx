import { setRequestLocale } from "next-intl/server";
import HeroSlider from "./components/home/HeroSlider";
import NewsSection from "./components/home/NewsSection";
import WelcomePopup from "./components/home/WelcomePopup";
import PhotoGallerySection from "./components/home/PhotoGallerySection";
import AboutSection from "./components/home/AboutSection";
import ArgentinaSpaceSection from "./components/home/ArgentinaSpaceSection";
import HomepageNewsletter from "./components/home/HomepageNewsletter";

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
    </>
  );
}
