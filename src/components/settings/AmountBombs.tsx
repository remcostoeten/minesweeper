import { useStore } from "@/core/state/store"
import { Button } from "@ui/index"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select"

import { MinusIcon, PlusIcon } from "../icons"
import SettingsShell from "./SettingsShell"

const GridSizeSelect = ({ onGridSizeChange }) => {
  const { rows, cols } = useStore()
  return (
    <Select value={`${rows}x${cols}`} onValueChange={onGridSizeChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Grid Size" />
      </SelectTrigger>
      <SelectContent>
        {["3x3", "5x5", "7x7", "9x9"].map((size) => (
          <SelectItem key={size} value={size}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default function AmountBombs() {
  const { rows, cols, bombs, setRows, setCols, setBombs } = useStore()
  const onPlus = () => {
    setBombs(bombs + 1)
  }

  const onMinus = () => {
    setBombs(bombs - 1)
  }

  return (
    <SettingsShell title="Amount of bombs">
      <div className="flex  items-center border-outline p-2 rounded-md h-[59px]">
        <span>💣</span>
        <input
          className="bg-transparent text-white h-10 text-center w-12 outline-none text-text"
          type="number"
          value={bombs.toString()}
          onChange={(e) => setBombs(Number(e.target.value))}
        />
        <div className="flex gap-2 items-center ml-auto">
          <Button
            className="bg-main h-7 text-white rounded-md p-1"
            onClick={onPlus}
          >
            <PlusIcon className="text-white/60" />
          </Button>
          <Button
            className="bg-transparent border-outline h-7 text-white rounded-md p-1"
            onClick={onMinus}
          >
            <MinusIcon className="text-white/60" />
          </Button>
        </div>
      </div>
    </SettingsShell>
  )
}
