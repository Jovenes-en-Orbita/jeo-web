import Image from "next/image";
import type { ReactNode, ElementType } from "react";

interface ImageOverlayCardProps {
  /** Image source URL */
  src: string;
  /** Alt text for the image */
  alt: string;
  /** Text label rendered over the gradient overlay */
  label?: string;
  /** Optional children rendered inside the overlay (replaces label) */
  children?: ReactNode;
  /** Wrapper element type — use a Link component for navigation cards */
  as?: ElementType;
  /** Props forwarded to the wrapper element (e.g. `href` for Link) */
  wrapperProps?: Record<string, unknown>;
  /** Additional class for the outer container */
  className?: string;
  /** Full Tailwind class string for the image (brightness, filters, etc.) */
  imageClassName?: string;
  /** Gradient overlay classes */
  overlayGradient?: string;
  /** Image sizes attribute for performance optimization */
  sizes?: string;
}

/**
 * A card with a background image, gradient overlay, and content on top.
 * Supports hover zoom on the image and can render as any element (div, Link, a).
 *
 * @example
 * ```tsx
 * // Simple label card
 * <ImageOverlayCard
 *   src="/structures.jpg"
 *   alt="Structures"
 *   label="COSMIC STRUCTURES"
 * />
 *
 * // As a Link with custom content
 * <ImageOverlayCard
 *   src="/sky.jpg"
 *   alt="Sky"
 *   as={Link}
 *   wrapperProps={{ href: "/explorar/cielo" }}
 *   className="h-[480px]"
 * >
 *   <h3>Explore the Sky</h3>
 * </ImageOverlayCard>
 * ```
 */
export default function ImageOverlayCard({
  src,
  alt,
  label,
  children,
  as: Wrapper = "div",
  wrapperProps = {},
  className = "",
  imageClassName = "brightness-50 group-hover:brightness-[0.6]",
  overlayGradient = "bg-gradient-to-t from-black/90 to-transparent",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: ImageOverlayCardProps) {
  return (
    <Wrapper
      className={`group relative overflow-hidden rounded-none border border-zinc-800 hover:border-zinc-700 transition-colors duration-300 ${className}`}
      {...wrapperProps}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover group-hover:scale-105 transition-all duration-700 ${imageClassName}`}
      />
      <div className={`absolute inset-0 ${overlayGradient}`} />

      {/* Content layer */}
      {children ? (
        <div className="relative h-full">{children}</div>
      ) : label ? (
        <div className="absolute inset-0 flex items-end p-6">
          <h3 className="text-xs font-bold text-white tracking-widest uppercase border-l-2 border-nasa-red pl-2.5">
             {label}
          </h3>
        </div>
      ) : null}
    </Wrapper>
  );
}
