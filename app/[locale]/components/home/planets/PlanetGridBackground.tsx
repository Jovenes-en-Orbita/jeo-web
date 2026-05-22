"use client";

/**
 * PlanetGridBackground component that renders the dark space background
 * with linear gradient overlay and inset shadow effect.
 */
export default function PlanetGridBackground() {
  return (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('https://i.ibb.co/7rQYXVX/zyro-image.jpg')",
        }}
      />
      <div className="absolute inset-0 shadow-[inset_0_0_120px_60px_rgba(0,0,0,0.9)]" />
    </>
  );
}
