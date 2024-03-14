'use client';
import { Inter } from "next/font/google";
import '@/styles/app.scss';
import { Toaster } from "sonner";
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <NextUIProvider>
    <html lang="en">
      <body className={`${inter.className} bg-body text-white`}><Toaster/>{children}</body>
    </html>

    </NextUIProvider>
);
}
