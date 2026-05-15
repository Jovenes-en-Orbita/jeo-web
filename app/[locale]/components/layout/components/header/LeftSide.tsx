"use client";

import SectionLink from "./SectionLink";
import { NavLink } from "../../HeaderTypes";

export default function LeftSide({ sections }: { sections: NavLink[] }) {
  return (
    <div className="hidden lg:flex flex-1 justify-end items-center gap-6 pr-6">
      {sections.map((link) => (
        <SectionLink key={link.label} link={link} />
      ))}
    </div>
  );
}
