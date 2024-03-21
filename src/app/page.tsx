'use client'
import React, { useState } from "react"

import PlaceBetComponent from "@/components/game-logic/b"
import Minesweeper from "@/components/shells/v1"
import AnimatedTooltio from "@/components/effects/AnimatedTooltio";

export default function page() {
  const [bet, setBet] = useState(0);
  return (
    <>
    <PlaceBetComponent bet={bet} setBet={setBet} />
    <AnimatedTooltio/>
      <Minesweeper />
    </>
  )
}
