"use client"

import { toast } from "sonner"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import Wrapper from "../shells/Wrapper"
import Block from "../Block"
import SettingsShell from "./SettingsShell"

type AmountTileShellProps = {
  rows: number
  cols: number
  bombs: number
  setRows: (value: number) => void
  setCols: (value: number) => void
  setBombs: (value: number) => void
}

export default function AmountTileShell({
  rows,
  cols,
  bombs,
  setRows,
  setCols,
  setBombs,
}: AmountTileShellProps) {
  const handleGridSizeChange = (value: string) => {
    const [rows, cols] = value.split("x").map(Number)
    setRows(rows)
    setCols(cols)
    toast("Grid size changed to " + value)
  }

  return (
    <SettingsShell title="Grid Size">
      <Select value={`${rows}x${cols}`} onValueChange={handleGridSizeChange}>
        <SelectTrigger className="w-">
          <SelectValue placeholder="Grid Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="3x3">3x3</SelectItem>
          <SelectItem value="5x5">5x5</SelectItem>
          <SelectItem value="7x7">7x7</SelectItem>
          <SelectItem value="9x9">9x9</SelectItem>
        </SelectContent>
      </Select>
    </SettingsShell>
  )
}
