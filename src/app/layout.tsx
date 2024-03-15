'use client';
import { Inter } from "next/font/google";
import '../styles/app.scss';
import { Toaster } from "sonner";
import ConvexClientProvider from "./ConvexClientProvider";
import Block from "@/components/Block";
import BalanceBetSize from "@/components/settings/BalanceBetSize";
import AmountTileShell from "@/components/settings/AmountTileShell";
import { useState } from "react";
import { Yt } from "@/components/settings/Icon";

const inter = Inter({ subsets: ["latin"] });

// ToDo: Extract the layout to a separate file

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [bombs, setBombs] = useState(1);
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-body text-white`}>
        <Toaster />
        <ConvexClientProvider>
          <Block padding="4" className='w-[30%] gap-2 flex flex-col'>
            {selectMode()}
            <BalanceBetSize />
            <AmountTileShell
              rows={rows}
              cols={cols}
              bombs={bombs}
              setRows={setRows}
              setCols={setCols}
              setBombs={setBombs} />
            <Yt className={undefined} color='red' />

          </Block>
          <section>
            {children}
          </section>
        </ConvexClientProvider>
      </body>
    </html>
  );
}


type BtnProps = {
  text: string;
  onClick?: () => void;
  bg?: string;
};

const selectMode = () => {
  const Button = ({ text, onClick, bg = 'red-400' }: BtnProps) => {
    return (
      <button
        onClick={onClick}
        className={`bg-${bg} text-white w-full h-12 p-2 rounded-md border-outline`}
      >
        {text}
      </button>
    );
  };
  return (
    <div className="p-2 flex items-center justify-center bg-card-inner">
      <div className="flex gap-8 items-center justify-center w-full">
        <div className="w-1/2 bg-[#161821]">
          <Button text="Manual" />
        </div>
        <div className="w-1/2">
          <Button bg="transparent" text="Easy" />

        </div>
      </div>
    </div>
  );
};

