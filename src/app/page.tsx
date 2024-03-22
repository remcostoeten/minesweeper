'use client'
import { useState } from "react";

import PlaceBetComponent from "@/components/game-logic/b";
import Minesweeper from "@/components/shells/v1";

export default function page() {
  const [bet, setBet] = useState(0);
  return (
    <>
    <PlaceBetComponent bet={bet} setBet={setBet} />
      <Minesweeper />
    </>
  )
}
