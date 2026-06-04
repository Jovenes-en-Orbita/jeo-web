"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionBadge from "../shared/SectionBadge";

export default function HomepageNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = useTranslations("newsletter");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="newsletter-seccion" className="py-24 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-nasa-red/5 blur-[120px]" />
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <SectionBadge color="red">NEWSLETTER</SectionBadge>
        <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading tracking-tight mb-4">
          {t("welcomeTitle")}
        </h2>
        <p className="text-zinc-400 text-sm font-light max-w-xl mx-auto mb-10 leading-relaxed">
          {t("welcomeDescription")}
        </p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 max-w-md mx-auto rounded-none bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold uppercase tracking-wider"
          >
            {t("success")}
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="w-full pl-12 pr-4 py-4 rounded-none bg-black/60 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-nasa-red focus:border-nasa-red transition"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 rounded-none bg-nasa-red hover:bg-red-700 text-white font-bold uppercase text-xs tracking-widest transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {status === "loading" ? t("subscribing") : t("subscribe")}
            </button>
            {status === "error" && (
              <p className="text-xs text-red-500 font-bold mt-2 uppercase tracking-wide">
                {t("error")}
              </p>
            )}
            <p className="text-[10px] text-zinc-500 text-center uppercase tracking-widest font-mono">
              {t("noSpam")}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
