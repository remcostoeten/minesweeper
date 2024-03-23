import { Button } from "@/components/ui/button"

import SettingsShell from "./SettingsShell"

type AmountMinesProps = {
  value: number
  onPlus: () => void
  onMinus: () => void
}

export default function AmountMines({
  value,
  onPlus,
  onMinus,
}: AmountMinesProps) {
  return (
    <SettingsShell title="Amount of mines">
      <div className="flex h-10 items-center border-outline p-2 rounded-md">
        <span>💣</span>
        <input
          className="bg-transparent text-white h-10o text-center w-12 outline-none"
          id="mines"
          type="text"
          value={value}
          placeholder="3"
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
            onClick={onPlus}
          >
            <MinusIcon className="text-white/60" />
          </Button>
        </div>
      </div>
    </SettingsShell>
  )
}

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}

function MouseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="7" />
      <path d="M12 6v4" />
    </svg>
  )
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
