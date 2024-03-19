'use client';
import { Inter } from "next/font/google";
import '../styles/app.scss';
import { Toaster } from "sonner";
import ConvexClientProvider from "./ConvexClientProvider";
import Block from "@/components/Block";
import BalanceBetSize from "@/components/settings/BalanceBetSize";
import AmountTileShell from "@/components/settings/AmountTileShell";
import { useState } from "react";
import Flexer from "@/components/core/Flexer";
import { TailwindIndicator } from "@/components/core/TailwindIndicator";

const inter = Inter({ subsets: ["latin"] });

// ToDo: Extract the layout to a separate file

export default function SettingsSidebar({}) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [bombs, setBombs] = useState(1);
  return (

        <Block
  padding="4"
  className='gap-2 flex flex-col'
>            {selectMode()}
            <BalanceBetSize />
            <AmountTileShell
              rows={rows}
              cols={cols}
              bombs={bombs}
              setRows={setRows}
              setCols={setCols}
              setBombs={setBombs} />
          </Block>

  );
}


type BtnProps = {
  text: string;
  onClick?: () => void;
  bg?: string;
  border?: boolean; // Added 'border' property to the BtnProps type
};

const selectMode = () => {
  const Button = ({ text, onClick, bg = 'red-400' }: BtnProps) => { // Removed 'border' property from the Button component
    return (
      <button
        onClick={onClick}
        className={`bg-${bg} text-white w-full h-12 p-2 rounded-md`}
      >
        {text}
      </button>
    );
  };
  return (
    <><div className="p-2 flex items-center justify-center bg-card-inner">
      <Flexer direction="column" align="center">
        <div className="w-1/2 bg-[#161821]">
          <Button text="Manual" />
        </div>
        <div className="w-1/2">
          <Button bg="transparent" text="Easy" /> {/* Removed 'border' prop */}
        </div>
      </Flexer>
    </div><TailwindIndicator /></>
  );
};
