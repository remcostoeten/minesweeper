'use client';
import React, { useCallback, useState } from 'react';
import BalanceBetSize from './BalanceBetSize';
import { toast } from 'sonner';
import { usePlaceBet } from '@/core/base-game-logic/place-bet';
import { useWalletAmount } from '@/core/useBalance';

export default function BalanceBetSizeLogic() {
    const [bet, setBet] = useState(0);
    const showBalance = useWalletAmount()
    const handlePlaceBet = usePlaceBet(bet);

    const handleChange = useCallback((event) => {
        const newBet = parseFloat(event.target.value) || 0;
        if (newBet > parseFloat(showBalance.walletAmount)) {
            toast("That's ambitious 🚀 trying to bet more than your net worth...");
            setBet(parseFloat(showBalance.walletAmount));
        } else {
            setBet(newBet);
        }
    }, [showBalance]);

    const handleButtonClick = useCallback((modifier) => {
        let newValue = bet * modifier;
        if (newValue > parseFloat(showBalance.walletAmount.toString())) {
            toast("Sorry to break it to you, but you can't bet more than you have. 👾");
            newValue = parseFloat(showBalance.walletAmount.toString());
        }
        setBet(newValue);
    }, [bet, showBalance]);

    const handleMaxClick = useCallback(() => {
        setBet(parseFloat(showBalance.walletAmount.toString()));
        toast("All in! 🚀");
    }, [showBalance]);

    return (
        <BalanceBetSize
            betSize={bet}
            setBetSize={setBet}
            handleChange={handleChange}
            handlePlaceBet={handlePlaceBet}
            handleMaxClick={handleMaxClick}
            handleButtonClick={handleButtonClick}
        />
    );
}