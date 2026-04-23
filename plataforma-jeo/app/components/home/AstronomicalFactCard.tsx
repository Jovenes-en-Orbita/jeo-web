import Image from "next/image";
import Link from "next/link";

export default function AstronomicalFactCard() {
  return (
    <section className="py-20 lg:py-28 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Category tags */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-4 w-0.5 bg-yellow-400 rounded-full" />
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/50">
          Ciencia
        </span>
        <div className="h-4 w-0.5 bg-yellow-400 rounded-full" />
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/50">
          Astronomía
        </span>
        <div className="h-4 w-0.5 bg-yellow-400 rounded-full" />
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/50">
          Curiosidades
        </span>
      </div>

      <Link href="/dato-astronomico">
        <h2 className="text-3xl sm:text-4xl font-bold text-white hover:text-yellow-300 transition-colors mb-12">
          Dato Astronómico de la Semana
        </h2>
      </Link>

      {/* Card layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image card */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
          <Image
            src="https://i.postimg.cc/23RvZtZL/110899742-pia23645-hires-1.jpg"
            alt="Imagen de la Tierra capturada a 6.000 millones de kilómetros de distancia"
            width={480}
            height={450}
            className="w-full h-auto object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="p-5 bg-gradient-to-b from-transparent to-black/40">
            <h3 className="text-lg font-bold text-white leading-tight">
              Imagen de la Tierra capturada a 6.000 millones de kilómetros de
              distancia
            </h3>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center">
          <p className="text-white/60 leading-relaxed text-sm sm:text-base">
            El ser humano es muy curioso; es parte de nuestra naturaleza, y en
            gran medida esta curiosidad nos ha hecho llegar hasta donde estamos
            hoy. Los científicos de todo el mundo trabajan con empeño para
            comprender los fenómenos que nos rodean en el Universo, y es por ello
            que constantemente surgen nuevos avances y descubrimientos destacados
            en el ámbito de la astronomía.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link
              href="/dato-astronomico"
              className="text-sm font-medium text-yellow-400 hover:text-yellow-300 underline underline-offset-4 decoration-yellow-400/30 hover:decoration-yellow-400 transition-all"
            >
              Más información
            </Link>
            <span className="text-xs text-white/30 italic">
              Fecha de publicación: 6/2/2024
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
