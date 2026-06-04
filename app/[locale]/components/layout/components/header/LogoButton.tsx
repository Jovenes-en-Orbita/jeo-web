"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Rocket } from "lucide-react";

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
        className="relative h-11 w-11 rounded-full p-2 bg-zinc-950 border border-zinc-800 shadow-lg transition-all duration-500 group-hover:border-[#e30613] flex items-center justify-center"
      >
        <Rocket className="h-5 w-5 text-white group-hover:text-[#e30613] transition-colors" />

        {/* Mini Toggle Indicator */}
        <div className="absolute -right-1 -bottom-1 bg-[#e30613] rounded-full p-0.5 shadow-[0_0_10px_rgba(227,6,19,0.5)]">
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
