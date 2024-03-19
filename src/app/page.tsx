import React from "react"

import PlaceBetComponent from "@/components/game-logic/b"
import Minesweeper from "@/components/shells/v1"

export default function page() {
  return (
    <>
      <PlaceBetComponent />
      <Minesweeper />
    </>
  )
}
