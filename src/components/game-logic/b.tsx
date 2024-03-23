"use client"

import { usePlaceBet } from "@/core/base-game-logic/place-bet"

import { Input } from "../ui/input"

function PlaceBetComponent({ bet, setBet }) {
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

export default PlaceBetComponent
