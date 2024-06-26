"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Dashboard() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex h-screen flex-col items-center justify-center bg-white py-12 text-black">
        <div className="mx-auto grid w-full gap-6 p-5 md:w-[450px]">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              Nominated Field Officer Signup
            </h1>
            <p className="text-muted-foreground text-balance">
              Enter your details below to create your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/field-officers/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/apply/openings/field-officer/application"
              className="underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block"></div>
    </div>
  );
}
