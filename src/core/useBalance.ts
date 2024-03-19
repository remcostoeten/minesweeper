'use client'
import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import {toast} from 'sonner';

export function useBalance() {
    const balance = useQuery(api.balance.get);
    const setBalanceMutation = useMutation(api.balance.setBalance);
    const [currentBalance, setCurrentBalance] = useState(balance?.[0]?.balance || 0);

    const placeBet = async (betSize) => {
        if (currentBalance >= betSize) {
            const newBalance = currentBalance - betSize;
            await setBalanceMutation({ balance: newBalance });
            setCurrentBalance(newBalance); // Update local state
            toast(`Bet placed. New balance: €${newBalance},-`);
        } else {
            toast("Insufficient balance for this bet.");
        }
    };


    const handleChange = (event) => {
        const newBalance = parseFloat(event.target.value);
        setCurrentBalance(newBalance);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await setBalanceMutation({
            balance: currentBalance,
        });
        toast(`Balance updated to €${currentBalance},-`);
    };

    return {
        balance: balance?.[balance?.length - 1],
        handleChange,
        handleSubmit,
        placeBet,
    };
}