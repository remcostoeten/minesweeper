"use client"

import { Input } from "@ui/index"
import { useQuery } from "convex/react"

import { api } from "../../../../convex/_generated/api"
import Flexer from "../../core/Flexer"
import EuroSign from "../../ui/euro-sign"
import BetBtn from "../../ui/setting-btn"
import SettingsShell from "../SettingsShell"

export default function BalanceBetWrapper({
  betSize,
  setBetSize,
  handleChange,
  handlePlaceBet,
  handleMaxClick,
  handleButtonClick,
}) {
  const balance = useQuery(api.balance.get)
  const showBalance =
    balance?.[balance.length - 1]?.setBalance.toFixed(2) || "0"

  return (
    <SettingsShell title="Bet size" subtitle={`Max bet: €${showBalance}`}>
      <Flexer mb="4" align="center" justify="between">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Your bet"
            value={betSize}
            onChange={handleChange}
            onBlur={handlePlaceBet}
            style={{ paddingLeft: "35px", height: "59px" }}
          />
          <EuroSign variant="input" />
          <div className="flex space-x-1 absolute top-1/2 right-1 transform -translate-y-1/2">
            <BetBtn onClick={() => handleButtonClick(0.5)}>1/2</BetBtn>
            <BetBtn onClick={() => handleButtonClick(2)}>2x</BetBtn>
            <BetBtn onClick={handleMaxClick}>MAX</BetBtn>
          </div>
        </div>
      </Flexer>
      <div className="grid grid-cols-4 gap-1">
        <BetBtn
          className="h-[50px] text-xs "
          onClick={() => handleButtonClick(0.1)}
        >
          +10%
        </BetBtn>
        <BetBtn
          className="h-[50px] text-xs p"
          onClick={() => handleButtonClick(0.5)}
        >
          +50%
        </BetBtn>
        <BetBtn
          className="h-[50px] text-xs p"
          onClick={() => handleButtonClick(1)}
        >
          +100%
        </BetBtn>
        <BetBtn
          className="h-[50px] text-xs py"
          onClick={() => handleButtonClick(10)}
        >
          +1000%
        </BetBtn>
      </div>
    </SettingsShell>
  )
}
