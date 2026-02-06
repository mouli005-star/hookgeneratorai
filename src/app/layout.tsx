import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HookMaster AI - Viral Content Generator",
  description: "Turn ordinary content into viral hooks. AI-powered tool to generate engaging hooks, hashtags, and rewrites for Instagram, YouTube, and Twitter/X in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} font-inter antialiased tracking-tight`}
      >
        {children}
      </body>
    </html>
  );
}
