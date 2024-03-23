"use client"

import { useState } from "react"

import BalanceBetSizeLogic from "@/components/settings/BalanceBetSizeLogic"

export default function CurrencyPage() {
  const [bet, setBet] = useState(0)
  return (
    <main className="p-10 text-xl">
      <BalanceBetSizeLogic/>
      <hr/>
      <hr/>
      {/* <PlaceBetComponent bet={bet} setBet={setBet} /> */}
      {/* <Minesweeper/> */}

    </main>
  )
}
