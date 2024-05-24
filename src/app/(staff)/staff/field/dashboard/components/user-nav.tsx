"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";
import { Button } from "@/registry/new-york/ui/button";
import useSWR from "swr";
import { fetcher } from "@/utils/apiUtils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";

interface StaffData {
  full_name: string;
  agent_email: string;
}

export function UserNav() {
  const {
    data: staff,
    error: staffError,
    isValidating: isStaffValidating,
  } = useSWR<StaffData>(
    "https://enetworks-tovimikailu.koyeb.app/field/dashboard",
    fetcher
  );

  if (staffError) {
    return <div>{staffError.message}</div>;
  }

  if (!staff) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>EN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="z-[999] w-56 bg-white text-black"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {staff.full_name}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {staff.agent_email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-black" />
        <DropdownMenuItem className="cursor-pointer hover:bg-gray-600">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
