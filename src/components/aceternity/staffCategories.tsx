import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bentoGrids";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
} from "@tabler/icons-react";

export function StaffCategories() {
  return (
    <BentoGrid className="mx-auto w-full rounded-lg p-2 md:max-w-4xl md:auto-rows-[22rem]">
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
  <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full   flex-1 rounded-xl border  border-transparent [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] "></div>
);
const items = [
  {
    title: "State Office Buisness Position",
    description: "Apply to be an official Enetworks staff",
    header: <Skeleton />,
    className: "md:col-span-1 border border-black",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    href: "/apply/openings/staff/categories/state-govt-office",
  },
  {
    title: "State N.G.O Desk Office Position",
    description:
      "Where you nominated as a field officer for Enetworks? Apply here?",
    header: <Skeleton />,
    className: "md:col-span-1 border border-black",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    href: "/apply/openings/staff/categories/state-ngo-desk",
  },
  {
    title: "Local Govt. Business Office Positions",
    description: "Apply to be a field officer for Enetworks",
    header: <Skeleton />,
    className: "md:col-span-1 border border-black",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    href: "/apply/openings/staff/categories/local-govt-office",
  },
  {
    title: "Local Govt. N.G.O Desk Office Postions",
    description: "Apply to be a field officer for Enetworks",
    header: <Skeleton />,
    className: "md:col-span-1 border border-black",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    href: "/apply/openings/staff/categories/local-ngo-desk",
  },
];
