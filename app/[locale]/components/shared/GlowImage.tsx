import Image, { type ImageProps } from "next/image";

interface GlowImageProps {
  /** Image source URL or static import */
  src: ImageProps["src"];
  /** Accessible alt text */
  alt: string;
  /** Intrinsic width of the image (ignored when fill=true) */
  width?: number;
  /** Intrinsic height of the image (ignored when fill=true) */
  height?: number;
  /** If true, the image fills its parent container instead of using width/height */
  fill?: boolean;
  /** Responsive sizes hint for the browser */
  sizes?: string;
  /** Priority loading (above-the-fold images) */
  priority?: boolean;
  /** Custom CSS gradient for the glow backdrop (applied via inline style) */
  glowGradient?: string;
  /** Border radius class (e.g. "rounded-2xl", "rounded-full") */
  rounded?: string;
  /** Additional class for the outer wrapper */
  className?: string;
  /** Additional class for the `<Image>` element */
  imageClassName?: string;
  /** Object-fit class (e.g. "object-cover", "object-contain") */
  objectFit?: string;
  /** Aspect ratio class (e.g. "aspect-video", "aspect-square") */
  aspectRatio?: string;
}

/**
 * A reusable image card with a hover glow effect, zoom animation,
 * and a subtle border. Fully customizable colors, sizes, and shapes.
 *
 * @example
 * ```tsx
 * <GlowImage
 *   src="/hero.jpg"
 *   alt="Hero"
 *   width={800}
 *   height={500}
 *   glowGradient="linear-gradient(to right, rgba(59,130,246,0.2), rgba(147,51,234,0.2), rgba(6,182,212,0.2))"
 *   rounded="rounded-full"
 * />
 * ```
 */
export default function GlowImage({
  src,
  alt,
  width = 650,
  height = 450,
  fill = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  glowGradient = "linear-gradient(to right, rgba(37,99,235,0.2), rgba(147,51,234,0.2), rgba(6,182,212,0.2))",
  rounded = "rounded-2xl",
  className = "",
  imageClassName = "",
  objectFit = "object-cover",
  aspectRatio = "",
}: GlowImageProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Glow backdrop */}
      <div
        className={`absolute -inset-1 ${rounded} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        style={{ background: glowGradient }}
      />

      {/* Image container */}
      <div
        className={`relative overflow-hidden ${rounded} border border-white/10 ${aspectRatio}`}
      >
        <Image
          src={src}
          alt={alt}
          {...(fill ? { fill: true } : { width, height })}
          sizes={sizes}
          priority={priority}
          className={`w-full h-auto ${objectFit} transition-transform duration-700 group-hover:scale-105 ${fill ? "absolute inset-0 w-full h-full" : ""} ${imageClassName}`}
        />
      </div>
    </div>
  );
}
