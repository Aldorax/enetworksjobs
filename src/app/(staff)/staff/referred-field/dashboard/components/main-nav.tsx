import Link from "next/link";

import { cn } from "@/lib/utils";
import Image from "next/image";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-2 lg:space-x-6", className)}
      {...props}
    >
      <Link href="#" className="flex items-center gap-2 font-medium">
        <Image
          src="/images/e-logo.png"
          alt="logo"
          width={100}
          height={100}
          className="h-6 w-6"
        />
        <span className="text-medium">Enetworksjobs</span>
      </Link>
    </nav>
  );
}
