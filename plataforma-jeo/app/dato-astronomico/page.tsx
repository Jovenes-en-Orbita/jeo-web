import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dato Astronómico de la Semana",
  description:
    "Datos, curiosidades y descubrimientos astronómicos del último siglo. Información fascinante sobre el cosmos actualizada semanalmente.",
};

export default function DatoAstronomicoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
      {/* Navigation */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors mb-8"
      >
        ← Volver al inicio
      </Link>

      {/* Badge */}
      <div className="mb-8">
        <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-white/70 border-2 border-white/10 rounded-full">
          Galería
        </span>
      </div>

      {/* Category tags */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-3.5 w-0.5 bg-white/30 rounded-full" />
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/50">
          Ciencia
        </span>
        <div className="h-3.5 w-0.5 bg-white/30 rounded-full" />
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/50">
          Astronomía
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
        Datos y descubrimientos astronómicos del último siglo
      </h1>

      <p className="text-lg text-white/50 mb-2 max-w-2xl">
        El ser humano es muy curioso; es parte de nuestra naturaleza, y en gran
        medida esta curiosidad nos ha hecho llegar hasta donde estamos hoy. Sea
        como sea, aquí disponemos de algunas respuestas a las grandes preguntas...
      </p>
      <p className="text-sm text-white/30 italic text-right mb-12">
        &quot;Doctor Fisión&quot;
      </p>

      {/* Main image */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 mb-16">
        <Image
          src="https://i.postimg.cc/1tfrNtB8/cluster-1.png"
          alt="Cúmulo de galaxias"
          width={1000}
          height={600}
          className="w-full h-auto object-cover"
          sizes="(max-width: 896px) 100vw, 896px"
          priority
        />
      </div>

      {/* Article #1 */}
      <article className="border-t border-white/5 pt-12">
        <span className="text-sm font-mono text-white/20">1/20</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-4 leading-tight">
          Un centenar de exoplanetas flotan libremente en la Vía Láctea
        </h2>
        <p className="text-base text-white/40 italic mb-8">
          Científicos del Centro de Astrobiología (CSIC-INTA) han observado que
          en una de las regiones de formación estelar más cercanas, Upper
          Scorpius, se encuentra una de las mayores poblaciones de planetas
          errantes descubierta hasta la fecha. No orbitan estrellas, si no que
          vagan por esa zona de la Vía Láctea.
        </p>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 mb-8">
          <Image
            src="https://i.postimg.cc/23RvZtZL/110899742-pia23645-hires-1.jpg"
            alt="Pale Blue Dot - La Tierra vista desde 6.000 millones de km"
            width={800}
            height={400}
            className="w-full h-auto object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        <div className="prose prose-invert prose-sm max-w-none">
          <p className="text-white/50 leading-relaxed text-justify">
            Y es que el Universo puede resultar un lugar tremendamente amenazante
            si tenemos en cuenta la fragilidad de nuestro frágil y solitario
            mundo azul. Agujeros negros, explosiones de supernovas, estallidos de
            rayos Gamma, asteroides o nuestra propia estrella, el Sol, son solo
            algunas de las amenazas que podrían borrar de un plumazo y para
            siempre el rastro de nuestra especie. Cada nuevo descubrimiento que
            realizamos sobre el cosmos nos pone en una mejor situación de
            comprender nuestro lugar en él. Los científicos de todo el mundo
            trabajan con empeño para comprender los fenómenos que nos rodean en el
            Universo, y es por ello que aquí mostramos algunos de los avances más
            destacados realizados en el ámbito de la astronomía.
          </p>
        </div>
      </article>
    </div>
  );
}
