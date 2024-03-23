'use client'
import { useState } from "react";

import PlaceBetComponent from "@/components/game-logic/b";
import Minesweeper from "@/components/shells/v1";
import StartGame from "@/components/settings/StartGame";
import useGameLogic from "@/core/base-game-logic/OLD_start-game";

export default function page() {
  const [bet, setBet] = useState(0);
  const { gameStarted, gameOver, profitTaken, startGame, takeProfit, startNewGame } = useGameLogic();
  return (
    <>

    <PlaceBetComponent bet={bet} setBet={setBet} />
      <Minesweeper />
    </>
  )
}
