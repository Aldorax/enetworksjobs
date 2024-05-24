import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TextsProvider } from "@/translation";
import { MainNav } from "./(admin)/dashboard/components/main-nav";
import { UserNav } from "./(admin)/admin/dashboard/components/user-nav";
import { Toaster } from "@/registry/new-york/ui/toaster";

const texts = TextsProvider.get();

const inter = Inter({
  display: "swap",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  display: "swap",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "E-networks Jobs",
  description: texts.DESCRIPTION,
  openGraph: {
    title: "E-networks Jobs",
    description: texts.DESCRIPTION,
    url: "https://www.enetworksjobs.com.ng",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} bg-[#fff]`}
    >
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
