import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function ConstellationSection() {
  const t = useTranslations("constellationSection");

  return (
    <section
      id="constelaciones"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.6)), url('https://i.postimg.cc/zvFFzp9w/istockphoto-499881974-170667a.png')",
        }}
      />
      <div className="absolute inset-0 shadow-[inset_0_0_150px_50px_rgba(15,15,16,1)]" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <Link href="/constelaciones">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white hover:text-cyan-300 transition-colors">
            {t("title")}
          </h2>
        </Link>
        <p className="mt-6 text-white/60 max-w-3xl leading-relaxed text-base sm:text-lg">
          {t("description")}
        </p>
        <Link
          href="/constelaciones"
          className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-cyan-400 hover:text-cyan-300 group transition-colors"
        >
          {t("explore")}
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
