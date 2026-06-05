"use client";

import { useTranslations } from "next-intl";
import NebulaGlows from "../shared/NebulaGlows";
import SectionBadge from "../shared/SectionBadge";
import ContactForm from "./footer/ContactForm";
import SocialLinks from "../shared/SocialLinks";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const tContact = useTranslations("contactSection");
  const tFooter = useTranslations("footer");

  return (
    <footer
      id="contacto"
      className="relative w-full overflow-hidden bg-[#050508] border-t border-zinc-900"
    >
      {/* Decorative Nebula Glows */}
      <NebulaGlows opacity="opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left Column: Contact details & Social Links combined */}
          <div className="flex flex-col justify-center">
            <SectionBadge color="red">{tContact("badge")}</SectionBadge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white font-heading tracking-tight mb-6">
              {tContact("title")}
            </h2>
            <p className="text-zinc-400 font-light leading-relaxed mb-8">
              {tContact("description")}
            </p>

            <div className="space-y-6">
              <div className="space-y-4">
                <a
                  href={`mailto:${tContact("email")}`}
                  className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors w-fit"
                >
                  <Mail className="h-5 w-5 text-nasa-red" />
                  <span className="font-mono">{tContact("email")}</span>
                </a>
                <div className="flex items-center gap-3 text-zinc-400">
                  <Phone className="h-5 w-5 text-zinc-600" />
                  <span className="font-mono">{tContact("phone")}</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <MapPin className="h-5 w-5 text-zinc-600" />
                  <span className="font-mono">{tContact("location")}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-900/60">
                <SocialLinks className="flex items-center gap-6" />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="mt-16 pt-8 border-t border-zinc-900/60 text-center">
          <p className=" text-white/30">
            {tFooter("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
