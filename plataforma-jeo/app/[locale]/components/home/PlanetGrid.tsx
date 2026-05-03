import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const planetData = [
  { key: "mercury", image: "https://i.ibb.co/wg3z6D5/mercurio.jpg", href: "/sistema-solar/mercurio" },
  { key: "venus", image: "https://i.ibb.co/PcyGKXz/venuss-1.png", href: "/sistema-solar/venus" },
  { key: "earth", image: "https://i.ibb.co/74S6B6v/tierra.jpg", href: "/sistema-solar/tierra" },
  { key: "mars", image: "https://www.nasa.gov/wp-content/uploads/2025/02/37983-mars-globe-valles-marineris-enhanced.jpg", href: "/sistema-solar/marte" },
  { key: "jupiter", image: "https://i.ibb.co/jRbhbY0/jupiter.jpg", href: "/sistema-solar/jupiter" },
  { key: "saturn", image: "https://i.ibb.co/G94Z59D/saturnon.jpg", href: "/sistema-solar/saturno" },
  { key: "uranus", image: "https://i.ibb.co/c1Pqq7n/urano.jpg", href: "/sistema-solar/urano" },
  { key: "neptune", image: "https://i.ibb.co/z7GPnDY/neptuno-1.jpg", href: "/sistema-solar/neptuno" },
] as const;

export default function PlanetGrid() {
  const t = useTranslations("planets");

  return (
    <section
      id="sistema-solar"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('https://i.ibb.co/7rQYXVX/zyro-image.jpg')",
        }}
      />
      <div className="absolute inset-0 shadow-[inset_0_0_120px_60px_rgba(0,0,0,0.9)]" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <Link href="/sistema-solar">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white/80 hover:text-white transition-colors mb-4">
            {t("title")}
          </h2>
        </Link>
        <p className="text-white/40 max-w-2xl mb-12">
          {t("subtitle")}
        </p>

        {/* Planet grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
          {planetData.map((planet) => (
            <Link
              key={planet.key}
              href={planet.href}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 rounded-full overflow-hidden ring-2 ring-white/5 group-hover:ring-blue-500/30 transition-all duration-300 group-hover:scale-110">
                <Image
                  src={planet.image}
                  alt={t(planet.key)}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/50 group-hover:text-white transition-colors tracking-wide">
                {t(planet.key)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
