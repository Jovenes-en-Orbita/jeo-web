"use client";

import { useTranslations } from "next-intl";
import SectionBadge from "@/app/[locale]/components/shared/SectionBadge";
import ContactForm from "@/app/[locale]/components/layout/footer/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  const t = useTranslations("contactSection");

  return (
    <section id="contacto-seccion" className="py-24 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col justify-center">
            <SectionBadge color="red">{t("badge")}</SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-heading tracking-tight mb-6">
              {t("title")}
            </h2>
            <p className="text-zinc-400 font-light leading-relaxed mb-8">
              {t("description")}
            </p>
            <div className="space-y-4">
              <a
                href={`mailto:${t("email")}`}
                className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors w-fit"
              >
                <Mail className="h-5 w-5 text-nasa-red" />
                <span className="text-xs font-mono">{t("email")}</span>
              </a>
              <div className="flex items-center gap-3 text-zinc-400">
                <Phone className="h-5 w-5 text-zinc-600" />
                <span className="text-xs font-mono">{t("phone")}</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <MapPin className="h-5 w-5 text-zinc-600" />
                <span className="text-xs font-mono">{t("location")}</span>
              </div>
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
