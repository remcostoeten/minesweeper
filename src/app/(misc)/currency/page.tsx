"use client"

import { useState } from "react"

import PlaceBetComponent from "@/components/game-logic/b"
import Minesweeper from "@/components/shells/V2"
import BalanceBetSizeLogic from "@/components/settings/BalanceBetSizeLogic"

export default function CurrencyPage() {
  const [bet, setBet] = useState(0)
  return (
    <main className="p-10 text-xl">
      <BalanceBetSizeLogic/>
      {/* <PlaceBetComponent bet={bet} setBet={setBet} /> */}
      {/* <Minesweeper/> */}
    </main>
  )
}
