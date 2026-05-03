import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const cardData = [
  { key: "sky", backgroundImage: "https://i.ibb.co/twvGpSm8/Captura-de-pantalla-2025-12-23-181022.png", href: "/explorar/cielo" },
  { key: "argentina", backgroundImage: "https://i.ibb.co/9H2VGdrm/Captura-de-pantalla-2025-12-23-180706.png", href: "/explorar/argentina-espacio" },
  { key: "learn", backgroundImage: "https://i.ibb.co/bRDx88B7/stsci-01gk2kmys6hads6nd8nrhg53rp.webp", href: "/explorar/aprender" },
  { key: "olympics", backgroundImage: "https://i.ibb.co/TDqySwcs/Hubble-ultra-deep-field.jpg", href: "/explorar/olimpiadas" },
] as const;

export default function ExploreMoreCards() {
  const t = useTranslations("explore");

  return (
    <section id="explorar" className="py-20 lg:py-28 px-4 lg:px-8 max-w-7xl mx-auto">
      <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-white/40 font-medium mb-2">
        {t("moreInfo")}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
        {t("keepExploring")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="group relative overflow-hidden rounded-2xl border border-white/5 h-[480px] flex items-end"
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url('${card.backgroundImage}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="relative p-6 flex items-center gap-3 w-full">
              <h3 className="text-lg sm:text-xl font-bold text-white flex-1">
                {t(card.key)}
              </h3>
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
