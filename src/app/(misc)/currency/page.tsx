"use client"

import { useState } from "react"

import PlaceBetComponent from "@/components/game-logic/b"
import AmountMines from "@/components/settings/AmountMines"
import SelectTiles from "@/components/settings/AmountTiles"
import BalanceBetSizeLogic from "@/components/settings/BalanceBetSizeLogic"
import Minesweeper from "@/components/shells/v1"

export default function CurrencyPage() {
  const [bet, setBet] = useState(0)
  return (
    <main className="p-10 text-xl">
      <BalanceBetSizeLogic />
      <SelectTiles />
      {/* <AmountMines/> */}
      {/* <PlaceBetComponent bet={bet} setBet={setBet} /> */}
      {/* <Minesweeper/> */}
    </main>
  )
}
