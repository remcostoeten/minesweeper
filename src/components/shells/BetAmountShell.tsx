import React, { ChangeEvent } from "react"

import { Button } from "../ui"

interface BetAmountShellProps {
  showCustomInput: boolean
  customValue: string
  handleCustomButtonClick: () => void
  handleCustomInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleCustomInputBlur: () => void
}

export default function BetAmountShell({
  showCustomInput,
  customValue,
  handleCustomButtonClick,
  handleCustomInputChange,
  handleCustomInputBlur,
}: BetAmountShellProps) {
  return (
    <div>
      <h2 className="text-sm font-medium uppercase tracking-widest mb-2">
        Bet Amount
      </h2>
      <div className="flex items-center space-x-2">
        <Button className="bg-[#1f1f38]">-</Button>
        {showCustomInput ? (
          <input
            className="text-center w-24 bg-[#1f1f38] border-none"
            placeholder="£2.00"
            value={customValue}
            onChange={handleCustomInputChange}
            onBlur={handleCustomInputBlur}
          />
        ) : (
          <input
            className="text-center w-24 bg-[#1f1f38] border-none"
            placeholder="£2.00"
            disabled
          />
        )}
        <Button className="bg-[#1f1f38]">+</Button>
      </div>
    </div>
  )
}
