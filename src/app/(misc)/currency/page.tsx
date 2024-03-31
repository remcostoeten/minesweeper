"use client"

import AmountBombs from "@/components/settings/AmountBombs"
import SelectTiles from "@/components/settings/AmountTiles"
import BalanceBetSizeLogic from "@/components/settings/(balance)/BalanceBetSizeLogic"

export default function CurrencyPage() {
  return (
    <main className="p-10 text-xl">
      <BalanceBetSizeLogic />
      <AmountBombs />
      <SelectTiles />
    </main>
  )
}
