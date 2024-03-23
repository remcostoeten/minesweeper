"use client"

import { useState } from "react"

import BalanceBetSizeLogic from "@/components/settings/BalanceBetSizeLogic"
import PlaceBetComponent from "@/components/game-logic/b"
import SelectTiles from "@/components/settings/AmountTiles"
import Minesweeper from "@/components/shells/v1"
import AmountMines from "@/components/settings/AmountMines"
export default function CurrencyPage() {
  const [bet, setBet] = useState(0)
  return (
    <main className="p-10 text-xl">
      <BalanceBetSizeLogic/>
      <SelectTiles/>
      {/* <AmountMines/> */}
      {/* <PlaceBetComponent bet={bet} setBet={setBet} /> */}
      {/* <Minesweeper/> */}

    </main>
  )
}
