'use client';
import React, { useState, useCallback } from "react";
import { usePlaceBet } from "@/core/base-game-logic";
import { useQuery } from "convex/react";
import { toast } from "sonner";

import { api } from "../../../convex/_generated/api";
import Flexer from "../core/Flexer";
import EuroSign from "../ui/euro-sign";
import SettingsShell from "./SettingsShell";
import BetBtn from "../ui/setting-btn";
import { Input } from "@ui/index";

export default function BalanceBetSize() {
  const balance = useQuery(api.balance.get);
  const [bet, setBet] = useState(0);
  const showBalance = balance?.[balance.length - 1]?.setBalance.toFixed(2) || "0";
  const handlePlaceBet = usePlaceBet(bet);

  const handleChange = useCallback((event) => {
    const newBet = parseFloat(event.target.value) || 0;
    if (newBet > parseFloat(showBalance)) {
      toast("That's ambitious 🚀 trying to bet more than your net worth...");
      setBet(parseFloat(showBalance));
    } else {
      setBet(newBet);
    }
  }, [showBalance]);

  const handleButtonClick = useCallback((modifier) => {
    let newValue = bet * modifier;
    if (newValue > parseFloat(showBalance)) {
      toast("Sorry to break it to you, but you can't bet more than you have. 👾");
      newValue = parseFloat(showBalance);
    }
    setBet(newValue);
  }, [bet, showBalance]);

  const handleMaxClick = useCallback(() => {
    setBet(parseFloat(showBalance));
    toast("All in! 🚀");
  }, [showBalance]);

  return (
    <SettingsShell title="Bet size" subtitle={`Max bet: €${showBalance}`}>
      <Flexer mb="4" align="center" justify="between">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Your bet"
            value={bet.toString()}
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
    </SettingsShell>
  );
}