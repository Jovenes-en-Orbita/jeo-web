"use client";

/**
 * Animated CSS orbs representing different types of matter/energy.
 * Each matter key gets a unique visual with gradients, shadows, and animations.
 * No external dependencies — pure CSS.
 */

/** Visual config per matter type */
const orbStyles: Record<string, {
  gradient: string;
  shadow: string;
  animation: string;
  innerEffect?: string;
}> = {
  darkEnergy: {
    gradient: "radial-gradient(circle at 30% 30%, #7c3aed 0%, #4c1d95 40%, #1e1b4b 70%, #0c0a1e 100%)",
    shadow: "0 0 30px rgba(139,92,246,0.5), 0 0 60px rgba(139,92,246,0.2), inset 0 0 20px rgba(167,139,250,0.3)",
    animation: "matter-pulse 4s ease-in-out infinite, matter-float 6s ease-in-out infinite",
    innerEffect: "radial-gradient(circle at 60% 60%, rgba(167,139,250,0.4) 0%, transparent 50%)",
  },
  darkMatter: {
    gradient: "radial-gradient(circle at 40% 40%, #1e3a5f 0%, #0f172a 40%, #020617 70%, #000 100%)",
    shadow: "0 0 30px rgba(59,130,246,0.3), 0 0 60px rgba(59,130,246,0.1), inset 0 0 30px rgba(30,58,138,0.5)",
    animation: "matter-distort 8s ease-in-out infinite, matter-float 7s ease-in-out infinite reverse",
    innerEffect: "conic-gradient(from 0deg, transparent 0%, rgba(96,165,250,0.15) 25%, transparent 50%, rgba(59,130,246,0.1) 75%, transparent 100%)",
  },
  antimatter: {
    gradient: "radial-gradient(circle at 50% 50%, #fbbf24 0%, #f59e0b 15%, #ef4444 40%, #7f1d1d 70%, #1c0505 100%)",
    shadow: "0 0 25px rgba(239,68,68,0.6), 0 0 50px rgba(239,68,68,0.3), 0 0 80px rgba(251,191,36,0.15), inset 0 0 15px rgba(251,191,36,0.4)",
    animation: "matter-glow 2s ease-in-out infinite, matter-float 5s ease-in-out infinite",
    innerEffect: "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.3) 0%, transparent 30%)",
  },
  baryonic: {
    gradient: "radial-gradient(circle at 35% 35%, #34d399 0%, #059669 30%, #064e3b 60%, #022c22 100%)",
    shadow: "0 0 25px rgba(52,211,153,0.4), 0 0 50px rgba(16,185,129,0.2), inset 0 0 20px rgba(110,231,183,0.3)",
    animation: "matter-orbit 10s linear infinite, matter-float 8s ease-in-out infinite",
    innerEffect: "radial-gradient(circle at 60% 30%, rgba(167,243,208,0.3) 0%, transparent 40%)",
  },
  light: {
    gradient: "radial-gradient(circle at 50% 50%, #fff 0%, #fef08a 10%, #fbbf24 30%, #f59e0b 50%, #b45309 70%, #451a03 100%)",
    shadow: "0 0 35px rgba(251,191,36,0.7), 0 0 70px rgba(245,158,11,0.4), 0 0 100px rgba(251,191,36,0.15), inset 0 0 15px rgba(255,255,255,0.5)",
    animation: "matter-radiate 3s ease-in-out infinite, matter-float 6s ease-in-out infinite",
    innerEffect: "radial-gradient(circle at 45% 40%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 20%, transparent 40%)",
  },
};

interface MatterOrbProps {
  /** The matter key to determine visual style */
  matterKey: string;
  /** Size in pixels */
  size?: number;
  /** Additional CSS classes for the container */
  className?: string;
}

export default function MatterOrb({
  matterKey,
  size = 64,
  className = "",
}: MatterOrbProps) {
  const style = orbStyles[matterKey] ?? orbStyles.light;

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full opacity-60"
        style={{
          background: style.gradient,
          filter: "blur(8px)",
          transform: "scale(1.15)",
        }}
      />

      {/* Main orb */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: style.gradient,
          boxShadow: style.shadow,
          animation: style.animation,
        }}
      />

      {/* Inner highlight / effect */}
      {style.innerEffect && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: style.innerEffect,
            animation: matterKey === "darkMatter"
              ? "matter-spin 12s linear infinite"
              : undefined,
          }}
        />
      )}

      {/* Glass reflection */}
      <div
        className="absolute rounded-full"
        style={{
          top: "8%",
          left: "15%",
          width: "35%",
          height: "25%",
          background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%)",
          borderRadius: "50%",
          filter: "blur(1px)",
        }}
      />

      {/* Inline keyframes */}
      <style jsx>{`
        @keyframes matter-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.9; }
        }
        @keyframes matter-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes matter-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }
        @keyframes matter-distort {
          0%, 100% { border-radius: 50%; }
          25% { border-radius: 48% 52% 50% 50%; }
          50% { border-radius: 50% 48% 52% 50%; }
          75% { border-radius: 52% 50% 48% 52%; }
        }
        @keyframes matter-orbit {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes matter-radiate {
          0%, 100% { box-shadow: ${style.shadow}; }
          50% { box-shadow: ${style.shadow.replace(/[\d.]+px/g, (m) => `${parseFloat(m) * 1.3}px`)}; }
        }
        @keyframes matter-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
