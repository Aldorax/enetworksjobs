"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserNav } from "@/app/(admin)/admin/dashboard/components/user-nav";
import { MainNav } from "@/app/(admin)/admin/dashboard/components/main-nav";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://enetworks-tovimikailu.koyeb.app/login/staff",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        // Throw an error with the error message received from the server
        throw new Error(errorData.message || "Failed to sign in");
      }

      const responseData = await response.json();
      const { access_token } = responseData;
      console.log(access_token);
      localStorage.setItem("access_token", access_token);
      router.push("/staff/normal/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="w-full">
      <div className="fixed z-[995] flex h-16 w-full items-center border-b border-black bg-white px-4 text-black">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-white py-12 text-black">
        <div className="mx-auto grid w-full gap-6 p-5 md:w-[450px]">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Staff Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <Button type="submit" className="w-full mt-2">
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:block"></div>
    </div>
  );
}
