import { setRequestLocale } from "next-intl/server";
import HeroSlider from "./components/home/HeroSlider";
import UniverseInfoSection from "./components/home/UniverseInfoSection";
import MatterCards from "./components/home/MatterCards";
import PlanetGrid from "./components/home/PlanetGrid";
import MoonLayout from "./components/home/MoonLayout";
import ConstellationSection from "./components/home/ConstellationSection";
import AstronomicalFactCard from "./components/home/AstronomicalFactCard";
import PhotoGallerySection from "./components/home/PhotoGallerySection";
import ExploreMoreCards from "./components/home/ExploreMoreCards";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSlider />
      <UniverseInfoSection />
      <MatterCards />
      <PlanetGrid />
      <MoonLayout />
      <ConstellationSection />
      <AstronomicalFactCard />
      <PhotoGallerySection />
      <ExploreMoreCards />
    </>
  );
}
