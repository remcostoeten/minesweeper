"use client"

import React, { useState } from "react" // Import React and useState

import PlaceBetComponent from "@/components/game-logic/b"

// Rename the function to start with an uppercase letter (conventional for React components)
export default function TodoCurrencyPage() {
  const [bet, setBet] = useState(0) // Use useState hook
  return (
    <main className="p-10 text-xl">
      <PlaceBetComponent bet={bet} setBet={setBet} />
      <hr />
    </main>
  )
}
