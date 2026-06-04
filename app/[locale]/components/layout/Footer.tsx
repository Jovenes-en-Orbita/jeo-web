"use client";

import NebulaGlows from "../shared/NebulaGlows";
import FooterAbout from "./footer/FooterAbout";
import ContactForm from "./footer/ContactForm";
import FooterBottom from "./footer/FooterBottom";

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="relative w-full overflow-hidden bg-[#050508]"
    >
      {/* Space Background Effect removed */}

      {/* Decorative Nebula Glows */}
      <NebulaGlows opacity="opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: About Text */}
          <FooterAbout />

          {/* Right: Contact Form */}
          <ContactForm />
        </div>

        {/* Bottom */}
        <FooterBottom />
      </div>
    </footer>
  );
}
