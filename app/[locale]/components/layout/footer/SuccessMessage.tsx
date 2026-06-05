"use client";

import { Send } from "lucide-react";

interface SuccessMessageProps {
  title: string;
  subtext: string;
}

export default function SuccessMessage({ title, subtext }: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
      <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
        <Send className="h-7 w-7 text-green-400" />
      </div>
      <p className="text-green-400 ">{title}</p>
      <p className="text-white/40 text-sm mt-1">{subtext}</p>
    </div>
  );
}
