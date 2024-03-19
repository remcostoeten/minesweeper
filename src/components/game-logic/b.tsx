"use client"

import { useState } from "react"
import { useMutation } from "convex/react"

import { api } from "../../../convex/_generated/api"

function PlaceBetComponent() {
  const setBetAmount = useMutation(api.bet.createBet)
  const [bet, setBet] = useState(0)

  const handlePlaceBet = async () => {
    await setBetAmount({ amount: bet })
    console.log(`Bet of ${bet} placed.`)
  }

  return (
    <div>
      <input
        type="number"
        value={bet}
        onChange={(e) => setBet(Number(e.target.value))}
      />
      <button onClick={handlePlaceBet}>Place Bet</button>
    </div>
  )
}

export default PlaceBetComponent
