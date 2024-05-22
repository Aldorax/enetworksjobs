import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bentoGrids2";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
} from "@tabler/icons-react";

export function BentoGridSecondDemo3() {
  return (
    <BentoGrid className="mx-auto w-full rounded-lg bg-white p-2 md:max-w-4xl md:auto-rows-[22rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
          href={item.href}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full   flex-1 rounded-xl border  border-transparent bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] dark:bg-black"></div>
);
const items = [
  {
    title: "Enetworks Staff",
    description: "Login to your official Enetworks staff back office",
    header: <Skeleton />,
    className: "md:col-span-1 border border-black",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    href: "/login/staff",
  },
  {
    title: "Nominated Field Officer Position",
    description: "Login to your official referred field officer back office",
    header: <Skeleton />,
    className: "md:col-span-1 border border-black",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    href: "/login/referred-field-officer",
  },
  {
    title: "Field Officer Position",
    description: "Login to your official field officer back office",
    header: <Skeleton />,
    className: "md:col-span-2 border border-black",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    href: "/login/field-officer",
  },
];
