// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage
// } from "@/registry/new-york/ui/avatar";
// import { Button } from "@/registry/new-york/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger
// } from "@/registry/new-york/ui/dropdown-menu";

// export function UserNav() {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//           <Avatar className="h-8 w-8">
//             <AvatarImage src="/avatars/01.png" alt="@shadcn" />
//             <AvatarFallback>SC</AvatarFallback>
//           </Avatar>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         className="z-[999] w-56 bg-white text-black"
//         align="end"
//         forceMount
//       >
//         <DropdownMenuLabel className="font-normal">
//           <div className="flex flex-col space-y-1">
//             <p className="text-sm font-medium leading-none">shadcn</p>
//             <p className="text-muted-foreground text-xs leading-none">
//               m@example.com
//             </p>
//           </div>
//         </DropdownMenuLabel>
//         <DropdownMenuSeparator className="bg-black" />
//         <DropdownMenuGroup>
//           <DropdownMenuItem className="cursor-pointer hover:bg-gray-600">
//             Profile
//           </DropdownMenuItem>
//           <DropdownMenuItem className="cursor-pointer hover:bg-gray-600">
//             Billing
//           </DropdownMenuItem>
//           <DropdownMenuItem className="cursor-pointer hover:bg-gray-600">
//             Settings
//           </DropdownMenuItem>
//           <DropdownMenuItem className="cursor-pointer hover:bg-gray-600">
//             New Team
//           </DropdownMenuItem>
//         </DropdownMenuGroup>
//         <DropdownMenuSeparator className="bg-black" />
//         <DropdownMenuItem className="cursor-pointer hover:bg-gray-600">
//           Log out
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

import * as React from "react";
import Link from "next/link";

export function UserNav() {
  return (
    <div className="flex w-full items-center gap-3 ">
      <Link href="/apply/openings" className="rounded-md p-2 hover:bg-gray-100">
        Apply
      </Link>

      <Link
        href="/login"
        className="rounded-md bg-primary-orange-light p-2 text-white"
      >
        Log In
      </Link>
    </div>
  );
}
