import Image from "next/image";
import Link from "next/link";
import { moons } from "@/app/data/home";

export default function MoonLayout() {
  const centerMoon = moons.find((m) => m.name === "La Luna")!;
  const leftMoons = moons.filter((m) => m.rank === 1 || m.rank === 3);
  const rightMoons = moons.filter((m) => m.rank === 2 || m.rank === 4);

  return (
    <section id="lunas" className="py-24 lg:py-32 px-4 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
        Las 5 Lunas más grandes del Sistema Solar
      </h2>
      <p className="text-white/40 max-w-2xl mb-16">
        Satélites naturales fascinantes que orbitan los gigantes gaseosos y nuestro
        propio planeta.
      </p>

      {/* Moon layout: Left – Center – Right */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
        {/* Left moons */}
        <div className="flex flex-row lg:flex-col gap-4">
          {leftMoons.map((moon) => (
            <Link key={moon.name} href={moon.href} className="group">
              <div className="relative h-36 w-36 sm:h-44 sm:w-44 rounded-2xl overflow-hidden border border-white/5 group-hover:border-purple-500/30 transition-all duration-300">
                <Image
                  src={moon.image}
                  alt={moon.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="176px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="text-[10px] text-white/40">{moon.rank}.</span>
                  <p className="text-sm font-medium text-white">{moon.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Center moon (La Luna) */}
        <Link href={centerMoon.href} className="group">
          <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96 rounded-2xl overflow-hidden border border-white/10 group-hover:border-cyan-500/30 transition-all duration-300 animate-pulse-glow">
            <Image
              src={centerMoon.image}
              alt={centerMoon.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="384px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <span className="text-xs text-white/40">{centerMoon.rank}.</span>
              <p className="text-xl font-bold text-white">{centerMoon.name}</p>
            </div>
          </div>
        </Link>

        {/* Right moons */}
        <div className="flex flex-row lg:flex-col gap-4">
          {rightMoons.map((moon) => (
            <Link key={moon.name} href={moon.href} className="group">
              <div className="relative h-36 w-36 sm:h-44 sm:w-44 rounded-2xl overflow-hidden border border-white/5 group-hover:border-purple-500/30 transition-all duration-300">
                <Image
                  src={moon.image}
                  alt={moon.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="176px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="text-[10px] text-white/40">{moon.rank}.</span>
                  <p className="text-sm font-medium text-white">{moon.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
