"use client"
import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export function Header() {
  return (
      <header className="sticky top-0 flex h-18 justify-between items-center gap-10 border-b bg-gray-950 px-4 md:px-6 text-white">
        <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Image src="/images/e-logo.png" alt="logo" width={100} height={100} className="w-10 h-10" />
                <span className="text-medium">Enetworksjobs</span>
              </Link>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-medium lg:gap-6">
        <Link
                href="/apply/openings"
                className="text-muted-foreground hover:text-foreground bg-primary-orange-light p-3 rounded-full"
              >
                APPLY NOW
              </Link>
              <Link href="#" className="hover:text-foreground bg-primary-orange-light p-3 rounded-full">
                LOGIN
              </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden text-black"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Image src="/images/e-logo.png" alt="logo" width={100} height={100} className="w-10 h-10" />
                <span className="text-sm">Enetworksjobs</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Apply
              </Link>
              <Link href="#" className="hover:text-foreground">
                Login
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
  )
}