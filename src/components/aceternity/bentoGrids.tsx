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

// Define the interface for the image properties
interface ImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
  image, // Now using the ImageProps interface
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  href: string;
  image: ImageProps | string; // Accepting both ImageProps object and string
}) => {
  const renderImage = () => {
    if (typeof image === "string") {
      // If image is a string, treat it as a URL
      return <img src={image} alt="" className="w-full h-60 object-cover" />;
    } else if (image && typeof image.src === "string") {
      // If image is an object with a string src, render using Next.js Image component
      return (
        <Image
          src={image.src}
          alt={image.alt || ""}
          width={image.width || 1000} // Default width
          height={image.height || 1000} // Default height
          className="w-full h-60 object-cover" // Ensure image covers the div
        />
      );
    }
    // Fallback case if no valid image source is found
    return null;
  };

  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between rounded-xl border border-transparent bg-white p-2 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-primary-orange-light dark:shadow-none",
        className
      )}
    >
      {renderImage()}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200 flex items-center justify-between p-4">
          {title}
          <Link
            href={href}
            className="rounded-md bg-primary-orange-light px-4 py-2 text-white"
          >
            Apply
          </Link>
        </div>
      </div>
    </div>
  );
};
