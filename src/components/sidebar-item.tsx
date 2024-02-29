"use client";

import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  active?: boolean;
};

function SidebarItem({ Icon, text, active }: Props) {
  const router = useRouter();
  return (
    <div
      className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${
        active && "font-bold"
      }`}
      onClick={() => active && router.push("/")}
    >
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
}

export default SidebarItem;
