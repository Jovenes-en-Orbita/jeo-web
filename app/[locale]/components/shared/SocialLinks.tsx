"use client";

import { Instagram, Facebook, Youtube, Twitter, LucideIcon, Github, Linkedin } from "lucide-react";

interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

const defaultLinks: SocialLink[] = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

interface SocialLinksProps {
  links?: SocialLink[];
  className?: string;
  iconClassName?: string;
}

export default function SocialLinks({ 
  links = defaultLinks, 
  className = "flex items-center justify-center gap-6",
  iconClassName = "h-5 w-5"
}: SocialLinksProps) {
  return (
    <div className={className}>
      {links.map((link, index) => {
        const Icon = link.icon;
        return (
          <a
            key={index}
            href={link.href}
            aria-label={link.label}
            className="text-white/20 hover:text-white transition-all duration-300 hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className={iconClassName} />
          </a>
        );
      })}
    </div>
  );
}
