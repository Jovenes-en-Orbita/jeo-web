"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import PlanetLogo from "./PlanetLogo";

interface LogoButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function LogoButton({ isOpen, onClick }: LogoButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center focus:outline-none"
    >
      <motion.div
        animate={isOpen ? { scale: 0.95 } : { scale: 1 }}
        className="relative h-11 w-11 rounded-full p-0.5 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 border border-white/10 shadow-lg transition-all duration-500 group-hover:border-white/30"
      >
        <div className="h-full w-full rounded-full overflow-visible relative bg-[#0a0a0f]">
          <PlanetLogo isOpen={isOpen} isHovered={isHovered} />
        </div>

        {/* Mini Toggle Indicator */}
        <div className="absolute -right-1 -bottom-1 bg-blue-500 rounded-full p-0.5 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
          {isOpen ? (
            <X className="h-2.5 w-2.5 text-white" />
          ) : (
            <Menu className="h-2.5 w-2.5 text-white" />
          )}
        </div>
      </motion.div>
    </button>
  );
}
