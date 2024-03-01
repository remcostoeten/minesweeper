import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import NoticeToFinishCursus from "../Notice"
import { Toaster } from "../components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minesweeper",
  description: "By Remco Stoeten",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-white`}>{children}<NoticeToFinishCursus /><Toaster invert/> </body>
    </html>
  );
}
