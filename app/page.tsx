import HeroSlider from "./components/home/HeroSlider";
import UniverseInfoSection from "./components/home/UniverseInfoSection";
import MatterCards from "./components/home/MatterCards";
import PlanetGrid from "./components/home/PlanetGrid";
import MoonLayout from "./components/home/MoonLayout";
import ConstellationSection from "./components/home/ConstellationSection";
import AstronomicalFactCard from "./components/home/AstronomicalFactCard";
import PhotoGallerySection from "./components/home/PhotoGallerySection";
import ExploreMoreCards from "./components/home/ExploreMoreCards";

export default function Home() {
  return (
    <>
      <HeroSlider />

      <UniverseInfoSection />
      <MatterCards />
      <PlanetGrid />
      <MoonLayout />
      <ConstellationSection />
      {/* TODO: Hacer una sección de newsletter */}
      <AstronomicalFactCard />
      <PhotoGallerySection />
      <ExploreMoreCards />
    </>
  );
}
