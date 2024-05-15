import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TextsProvider } from "@/translation";
import { MainNav } from "./(admin)/dashboard/components/main-nav";
import { UserNav } from "./(admin)/admin/dashboard/components/user-nav";

const texts = TextsProvider.get();

const inter = Inter({
  display: "swap",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({
  display: "swap",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  title: "E-networks Jobs",
  description: texts.DESCRIPTION,
  openGraph: {
    title: "Cloud Boost",
    description: texts.DESCRIPTION,
    url: "",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} bg-[#fff] text-[#459dc5]`}
    >
      <body>
        <div className="fixed z-[995] flex h-16 w-full items-center border-b border-black bg-white px-4 text-black">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
