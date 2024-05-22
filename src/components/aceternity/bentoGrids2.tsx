import image from "/public/images/medium-shot-people-looking-laptop.jpg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-2 ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  href: string;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between rounded-xl border border-transparent bg-white p-2 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-primary-orange-light dark:shadow-none",
        className
      )}
    >
      <Image
        src={image}
        alt="image"
        sizes="sm"
        className="w-full h-60 bg-red-400"
        width={1000}
        height={1000}
      />
      {/* {header} */}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200 flex items-center justify-between p-4">
          {title}
          <Link
            href={href}
            className="rounded-md bg-primary-orange-light px-4 py-2 text-white"
          >
            Login
          </Link>
        </div>
        {/* <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div> */}
      </div>
    </div>
  );
};
