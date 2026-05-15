"use client";

interface NebulaGlowsProps {
  opacity?: string;
}

export default function NebulaGlows({ opacity = "opacity-100" }: NebulaGlowsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen ${opacity}`}>
      <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[100px]" />
    </div>
  );
}
