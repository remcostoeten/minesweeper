'use client';
import React, { useEffect, useRef, useState } from "react"
import { usePlaceBet } from "@/core/base-game-logic"
import { useMutation, useQuery } from "convex/react"
import { toast } from "sonner"

import { api } from "../../../convex/_generated/api"
import Flexer from "../core/Flexer"
import { Input } from "../ui"
import EuroSign from "../ui/euro-sign"
import BetBtn from "../ui/setting-btnt"
import SettingsShell from "./SettingsShell"

export default function BalanceBetSize(): JSX.Element {
  const balance = useQuery(api.balance.get)
  const setBetAmount = useMutation(api.bet.createBet)
  const [inputValue, setInputValue] = useState("0")
  const [bet, setBet] = useState(0)
  const showBalance = balance?.[balance.length - 1]?.setBalance.toFixed(2)
  const handlePlaceBet = usePlaceBet(bet)

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setInputValue(newValue)
    const newBet = parseFloat(newValue)
    if (newBet > balance?.[0]?.setBalance) {
      setInputValue(balance?.[0]?.setBalance.toFixed(2).toString())
      toast("Your bet is above your balance")
    } else {
      setBet(newBet)
    }
  }

  useEffect(() => {
    const currentTimer = timerRef.current;
    return () => {
      if (currentTimer) {
        clearTimeout(currentTimer);
      }
    };
  }, [timerRef.current]); // Include timerRef.current in the dependency array

  const handleButtonClick = (modifier: number) => {
    let newValue = parseFloat(inputValue)
    newValue = Math.max(newValue + newValue * modifier, 0)
    if (newValue > showBalance) {
      toast("You don't have enough balance to make this bet.  ")
      newValue = balance?.[0]?.setBalance
    }
    setInputValue(parseFloat(newValue.toFixed(2)).toString())
  }

  const handleMaxClick = () => {
    setInputValue(showBalance)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [timerRef.current]); // Include timerRef.current in the dependency array

  return (
    <SettingsShell
      title="Bet size"
      subtitle="Max bet: €"
      showBalance={showBalance}
    >
      <Flexer mb="4" align="center" justify="between">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Your bet"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            onBlur={handlePlaceBet}
            style={{ paddingLeft: "25px" }}
          />
          <EuroSign variant="input" />
          <div className="flex space-x-1 absolute top-1/2 right-2 transform -translate-y-1/2">
            <BetBtn
              className="text-xs h-6 px-2"
              onClick={() => handleButtonClick(-0.5)}
            >
              1/2
            </BetBtn>
            <BetBtn
              className="text-xs h-6 px-2"
              onClick={() => handleButtonClick(1)}
            >
              2x
            </BetBtn>
            <BetBtn className="text-xs h-6 px-2" onClick={handleMaxClick}>
              MAX
            </BetBtn>
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
