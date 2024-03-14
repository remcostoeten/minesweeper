import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../styles/app.scss';
import { Toaster } from "sonner";
import ConvexClientProvider from "./ConvexClientProvider";
import Image from "next/image";

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
      <body className={`${inter.className} min-h-screen bg-body text-white`}>
        <Toaster />
        <ConvexClientProvider>
          <aside className='w-[40%] bg-card border-outline rounded-sm'>
            {selectMode()}
          </aside>
          <section>
            {/* {children} */}
          </section>
        </ConvexClientProvider>
      </body>
    </html>
  );
}



const selectMode = () => {
  return (
    <div className="p-2 m-8 flex items-center justify-center bg-card-inner">
      <div className="flex gap-8 items-center justify-center w-full">
        <div className="w-1/2">
          <button className="bg-[#16171D] text-white w-full h-16 p-2 rounded-md border-white/90 bordder">Manual</button>
        </div>
        <div className="w-1/2">
        <button className="bg-transparent text-white w-full h-16 p-2 rounded-md border-outline/40">Automatic</button>
        </div>
      </div>
    </div>
  );
}
