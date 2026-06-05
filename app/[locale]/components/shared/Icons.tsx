import React from "react";

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export function LogoLetras({ className, ...props }: IconProps) {
  return (
    <img
      src="/logo JEO con letras.webp"
      alt="Logo Jóvenes en Órbita"
      className={className}
      style={{ objectFit: "contain" }}
      {...props}
    />
  );
}

export function LogoNoLetras({ className, ...props }: IconProps) {
  return (
    <img
      src="/Logo JEO sin letras.webp"
      alt="Isotipo Jóvenes en Órbita"
      className={className}
      style={{ objectFit: "contain" }}
      {...props}
    />
  );
}
