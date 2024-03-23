"use client"

import { useState } from "react"

import PlaceBetComponent from "@/components/game-logic/b"

export default function CurrencyPage() {
  const [bet, setBet] = useState(0)
  return (
    <main className="p-10 text-xl">
      <PlaceBetComponent bet={bet} setBet={setBet} />
    </main>
  )
}
