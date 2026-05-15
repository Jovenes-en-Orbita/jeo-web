"use client";

import LogoButton from "./LogoButton";

interface CenterSideProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function CenterSide({ isOpen, onClick }: CenterSideProps) {
  return (
    <div className="relative">
      <LogoButton isOpen={isOpen} onClick={onClick} />
    </div>
  );
}
