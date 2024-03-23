"use client"

import { usePlaceBet } from "@/core/base-game-logic/place-bet"

import { Input } from "../ui/input"

type PlaceBetProps = {
  bet?: number
  setBet?: (bet: number) => void
}

export default function PlaceBetComponent({ bet, setBet }: PlaceBetProps) {
  const handlePlaceBet = usePlaceBet(bet)

  return (
    <div>
      <Input
        type="number"
        placeholder="Your bet"
        value={bet}
        onChange={(e) => setBet(Number(e.target.value))}
      />
      <button onClick={handlePlaceBet}>Place Bet</button>
    </div>
  )
}

