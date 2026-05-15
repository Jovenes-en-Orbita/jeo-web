"use client";

import { motion } from "framer-motion";

interface PlanetLogoProps {
  isOpen: boolean;
  isHovered: boolean;
}

export default function PlanetLogo({ isOpen, isHovered }: PlanetLogoProps) {
  // Atomic orbit parameters
  const rx = 42;
  const ry = 16;
  const tiltAngle = -30;
  const tiltRad = (tiltAngle * Math.PI) / 180;

  // Generate elliptical path keyframes
  const steps = [0, 45, 90, 135, 180, 225, 270, 315, 360];
  const cxValues = steps.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const x = rx * Math.cos(rad);
    const y = ry * Math.sin(rad);
    return 50 + x * Math.cos(tiltRad) - y * Math.sin(tiltRad);
  });

  const cyValues = steps.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const x = rx * Math.cos(rad);
    const y = ry * Math.sin(rad);
    return 50 + x * Math.sin(tiltRad) + y * Math.cos(tiltRad);
  });

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="w-10 h-10 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="planetGradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="40%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </radialGradient>
        </defs>

        {/* Pulsing Atmosphere */}
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          stroke="#3b82f6"
          strokeWidth="0.5"
          strokeOpacity="0.2"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Decorative Atomic Orbits */}
        <g transform="rotate(-30 50 50)">
          <ellipse
            cx="50"
            cy="50"
            rx={rx}
            ry={ry}
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity={isHovered ? 0.2 : 0.05}
            strokeDasharray="2 4"
            className="transition-opacity duration-500"
          />
        </g>
        <g transform="rotate(30 50 50)">
          <ellipse
            cx="50"
            cy="50"
            rx={rx}
            ry={ry}
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity={0.03}
          />
        </g>
        <g transform="rotate(90 50 50)">
          <ellipse
            cx="50"
            cy="50"
            rx={rx}
            ry={ry}
            stroke="white"
            strokeWidth="0.5"
            strokeOpacity={0.03}
          />
        </g>

        {/* The Planet */}
        <motion.circle
          cx="50"
          cy="50"
          r="24"
          fill="url(#planetGradient)"
          animate={
            isOpen ? { scale: 1.1, filter: "brightness(1.2)" } : { scale: 1 }
          }
          className="drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]"
        />

        {/* Satellite - Atomic Motion */}
        <motion.circle
          r="5"
          fill="white"
          animate={{
            cx: cxValues,
            cy: cyValues,
            scale: isOpen ? 1.4 : 1,
            fill: isOpen ? "#60a5fa" : "white",
          }}
          transition={{
            cx: {
              duration: isHovered ? 2.5 : 12,
              repeat: Infinity,
              ease: "linear",
            },
            cy: {
              duration: isHovered ? 2.5 : 12,
              repeat: Infinity,
              ease: "linear",
            },
            scale: { duration: 0.3 },
            fill: { duration: 0.3 },
          }}
          className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        />
      </svg>
    </div>
  );
}
