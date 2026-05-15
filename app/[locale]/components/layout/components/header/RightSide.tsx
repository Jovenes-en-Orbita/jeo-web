"use client";

import SectionLink from "./SectionLink";
import LanguageSwitcher from "../LanguageSwitcher";
import { NavLink } from "../../HeaderTypes";

export default function RightSide({ sections }: { sections: NavLink[] }) {
  return (
    <div className="flex-1 flex items-center">
      <div className="hidden lg:flex flex-1 justify-start items-center gap-6 pl-6">
        {sections.map((link) => (
          <SectionLink key={link.label} link={link} />
        ))}
      </div>

      <div className="flex-none pr-2">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
