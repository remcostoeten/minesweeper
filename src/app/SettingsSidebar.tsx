'use client';
import Block from "@/components/Block";
import Flexer from "@/components/core/Flexer";
import AmountMines from "@/components/settings/AmountMines";
import BalanceBetSize from "@/components/settings/BalanceBetSize";
import AmountTileShell from "@/components/shells/AmountTilesShell";
import { useState } from "react";
import { toast} from 'sonner'
export default function SettingsSidebar({}) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [bombs, setBombs] = useState(1);
  const [mines, setMines] = useState(3);

  const totalTilesAvailable = rows * cols - 1;

  const handlePlus = () => {
    setMines(prevMines => {
      if (prevMines < totalTilesAvailable) {
        return prevMines + 1;
      } else {
        return prevMines;
      }
    });
  };

  const handleMinus = () => {
    setMines(prevMines => {
      if (prevMines > 1) {
        return prevMines - 1;
      } else {
        toast('You cannot have less than 1 mine');
        return prevMines;
      }
    });
  };

  return (
    <Block padding="4" className='gap-2 flex flex-col'>
      {selectMode()}
      <BalanceBetSize />
      <AmountTileShell
        rows={rows}
        cols={cols}
        bombs={bombs}
        setRows={setRows}
        setCols={setCols}
        setBombs={setBombs}
      />
      <AmountMines
        value={mines}
        onPlus={handlePlus}
        onMinus={handleMinus}
      />
    </Block>
  );
}
type BtnProps = {
  text: string;
  onClick?: () => void;
  bg?: string;
  border?: boolean;
};

const selectMode = () => {
  const Button = ({ text, onClick, bg = 'red-400', border = false }: BtnProps) => { // Added 'border' property with default value of false
    return (
      <button
        onClick={onClick}
        className={`bg-${bg} text-white w-full h-12 ${border ? 'border-outline' : ''} p-2 rounded-md`}
      >
        {text}
      </button>
    );
  };

  return (
    <>
      <div className="p-2 flex items-center justify-center bg-card-inner">
        <Flexer direction="column" align="center">
          <div className="w-1/2 bg-[#161821]">
            <Button border text="Manual" />
          </div>
          <div className="w-1/2">
            <Button bg="transparent" text="Easy" />
          </div>
        </Flexer>
      </div>
    </>
  );
};
