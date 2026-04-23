import Image from "next/image";
import Link from "next/link";
import { matterTypes } from "@/app/data/home";

export default function MatterCards() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#0a0a0f]">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Matter Cards */}
          <div>
            <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-purple-400 font-medium mb-4 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5">
              Composición
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              ¿De qué está hecho el Universo?
            </h2>

            <div className="space-y-4">
              {matterTypes.map((matter, i) => (
                <Link
                  key={matter.title}
                  href={matter.href}
                  className="group flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/5 group-hover:ring-purple-500/30 transition-all">
                    <Image
                      src={matter.image}
                      alt={matter.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white/90 group-hover:text-purple-300 transition-colors">
                      {matter.title}
                    </h4>
                    <p className="mt-1 text-xs text-white/40 leading-relaxed line-clamp-2">
                      {matter.description}
                    </p>
                  </div>
                  <span className="text-white/20 group-hover:text-white/50 transition-colors text-lg flex-shrink-0 mt-2">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Structures & Spectrum */}
          <div className="space-y-6">
            {/* Structures card */}
            <Link href="/estructuras" className="group block relative overflow-hidden rounded-2xl border border-white/5">
              <Image
                src="https://i.postimg.cc/pX1SPqD0/Optimismo-moderado-en-la-astronomia-espanola.jpg"
                alt="Estructuras en el Universo"
                width={600}
                height={340}
                className="w-full h-56 object-cover brightness-50 group-hover:brightness-60 group-hover:scale-105 transition-all duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex items-end p-6">
                <h3 className="text-xl font-bold text-white tracking-wide uppercase">
                  Estructuras en el Universo
                </h3>
              </div>
            </Link>

            {/* Spectrum */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Espectro Electromagnético
              </h3>
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src="https://i.ibb.co/WWbfRKYH/Captura-de-pantalla-2025-12-23-014856.png"
                  alt="Espectro electromagnético"
                  width={600}
                  height={120}
                  className="w-full h-auto brightness-90"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {["Radio", "Microondas", "Infrarrojo", "Luz Visible", "Ultravioleta", "Rayos X", "Rayos Gamma"].map(
                  (type) => (
                    <span
                      key={type}
                      className="px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-300/80 hover:bg-yellow-500/10 hover:text-yellow-200 cursor-pointer transition-colors"
                    >
                      {type}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Gravitational waves card */}
            <Link href="/ondas-gravitacionales" className="group block relative overflow-hidden rounded-2xl border border-white/5">
              <Image
                src="https://i.postimg.cc/w3Ks1ZdH/Merging-black-holes-pillars.jpg"
                alt="Ondas Gravitacionales"
                width={600}
                height={340}
                className="w-full h-48 object-cover brightness-50 group-hover:brightness-60 group-hover:scale-105 transition-all duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex items-end p-6">
                <h3 className="text-xl font-bold text-white tracking-wide uppercase">
                  Ondas Gravitacionales
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
