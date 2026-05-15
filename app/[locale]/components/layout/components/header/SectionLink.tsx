"use client";

import { Link } from "@/i18n/routing";
import { NavLink } from "../../HeaderTypes";

interface SectionLinkProps {
  link: NavLink;
}

export default function SectionLink({ link }: SectionLinkProps) {
  return (
    <Link
      href={link.href}
      className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/60 hover:text-white transition-all duration-300 relative group whitespace-nowrap"
    >
      {link.label}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500/50 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
