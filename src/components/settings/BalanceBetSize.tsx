'use client';
import React, { useEffect, useRef, useState } from "react";
import { usePlaceBet } from "@/core/base-game-logic";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";

import { api } from "../../../convex/_generated/api";
import Flexer from "../core/Flexer";
import { Input } from "../ui";
import EuroSign from "../ui/euro-sign";
import SettingsShell from "./SettingsShell";
import BetBtn from "../ui/setting-btn";

export default function BalanceBetSize(): JSX.Element {
  const balance = useQuery(api.balance.get);
  const setBetAmount = useMutation(api.bet.createBet);
  const [inputValue, setInputValue] = useState("0");
  const [bet, setBet] = useState(0);
  const showBalance = balance?.[balance.length - 1]?.setBalance.toFixed(2);
  const handlePlaceBet = usePlaceBet(bet);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    const newBet = parseFloat(newValue);
    if (newBet > balance?.[0]?.setBalance) {
      setInputValue(balance?.[0]?.setBalance.toFixed(2).toString());
      toast("That's ambitious 🚀 trying to bet more than your net worth...");
    } else {
      setBet(newBet);
    }
  };

  useEffect(() => {
    const currentTimer = timerRef.current;
    return () => {
      if (currentTimer) {
        clearTimeout(currentTimer);
      }
    };
  }, []);

  const handleButtonClick = (modifier: number) => {
    let newValue = parseFloat(inputValue);
    newValue = Math.max(newValue + newValue * modifier, 0);
    if (newValue > balance?.[0]?.setBalance) {
      toast("Sorry to break it to you, but you can't bet more than you have. 👾");
      newValue = balance?.[0]?.setBalance;
    }
    setInputValue(newValue.toFixed(2).toString());
  };

  const handleMaxClick = () => {
    setInputValue(showBalance);

    toast("All in! 🚀");
  };

  return (
    <SettingsShell title="Bet size" subtitle={`Max bet: €${showBalance}`}>
      <Flexer mb="4" align="center" justify="between">
        <div className="relative w-full">
          <Input center={false}
            type="text"
            placeholder="Your bet"
            value={inputValue}
            onChange={handleChange}
            onBlur={handlePlaceBet}
            style={{ paddingLeft: "35px", height: "59px" }}
          />
          <EuroSign variant="input" />
          <div className="flex space-x-1 absolute top-1/2 right-1 transform -translate-y-1/2">
            <BetBtn onClick={() => handleButtonClick(-0.5)}>1/2</BetBtn>
            <BetBtn onClick={() => handleButtonClick(2)}>2x</BetBtn>
            <BetBtn onClick={handleMaxClick}>MAX</BetBtn>
          </div>
        </div>
      </Flexer>
    </SettingsShell>
  );
}