import Image from "next/image";
import Link from "next/link";
import { telescopeImages } from "@/app/data/home";

export default function PhotoGallerySection() {
  return (
    <section
      id="galeria"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.65)), url('https://i.postimg.cc/dVYKfcgx/milky-way-74005-1280.jpg')",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <Link href="/galeria">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white hover:text-cyan-300 transition-colors leading-tight">
                Galería fotos astronómicas
              </h2>
            </Link>
            <p className="mt-6 text-white/50 leading-relaxed text-sm sm:text-base">
              Grandes agencias espaciales como la NASA y ESA, con el apoyo de
              cientos e incluso miles de personas e instituciones alrededor del
              mundo, han logrado crear enormes y poderosos telescopios, siendo
              actualmente &quot;James Webb&quot; el más potente jamás creado. Los
              cuales nos sorprenden con espectaculares imágenes de alta resolución
              de diversas estructuras presentes en el cosmos.
            </p>
            <Link
              href="/galeria"
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-cyan-400 hover:text-cyan-300 group transition-colors"
            >
              Ver galería completa
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* Telescope images */}
          <div className="rounded-2xl bg-black/60 backdrop-blur-sm border border-white/5 p-4 space-y-4">
            {telescopeImages.map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl border border-white/5 group"
              >
                <Image
                  src={src}
                  alt={`Telescopio espacial ${i + 1}`}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
