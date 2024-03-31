"use client"

import { useState } from "react"
import { toast } from "sonner"

import Block from "@/components/Block"
import BalanceBetWrapper from "../settings/(balance)/BalanceBetWrapper"
import SelectMode from "@/components/settings/SelectGameMode"

import BalanceBetSizeLogic from "../settings/(balance)/BalanceBetSizeLogic"
import AmountBombs from "../settings/AmountBombs"
import SelectTiles from "../settings/AmountTiles"

export default function SettingsSidebar({}) {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)
  const [bombs, setBombs] = useState(1)
  const [mines, setMines] = useState(3)

  const totalTilesAvailable = rows * cols - 1

  const handlePlus = () => {
    setMines((prevMines) => {
      if (prevMines < totalTilesAvailable) {
        return prevMines + 1
      } else {
        return prevMines
      }
    })
  }

  const handleMinus = () => {
    setMines((prevMines) => {
      if (prevMines > 1) {
        return prevMines - 1
      } else {
        toast("You cannot have less than 1 mine")
        return prevMines
      }
    })
  }

  return (
    <Block padding="4" className="gap-2 flex flex-col">
      <SelectMode />
      <BalanceBetSizeLogic/>
      <AmountBombs />
      <SelectTiles />
    </Block>
  )
}
type BtnProps = {
  text: string
  onClick?: () => void
  bg?: string
  border?: boolean
  disabled?: boolean
}
