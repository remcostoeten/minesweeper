import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../styles/app.scss'
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minesweeper Game",
  description: "A classic Minesweeper game built with Next.js and React",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-body text-white`}><Toaster/>{children}</body>
    </html>
  );
}
