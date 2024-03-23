"use client"

import { useState } from "react"
import useGameLogic from "@/core/base-game-logic/OLD_start-game"

import PlaceBetComponent from "@/components/game-logic/b"
import StartGame from "@/components/settings/StartGame"
import Minesweeper from "@/components/shells/v1"

export default function Page() {
  const [bet, setBet] = useState(0)
  const {
    gameStarted,
    gameOver,
    profitTaken,
    startGame,
    takeProfit,
    startNewGame,
  } = useGameLogic()
  return (
    <>
      <PlaceBetComponent bet={bet} setBet={setBet} />
      <Minesweeper />
    </>
  )
}
