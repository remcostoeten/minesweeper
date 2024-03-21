import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { SubtractFromBalance } from "./helpers/substract-from-balance";

export const usePlaceBet = (bet: number) => {
    const setBetAmount = useMutation(api.bet.createBet);
    const getBalance = useQuery(api.balance.get);
    const balance = getBalance?.[getBalance.length - 1]?.setBalance.toFixed(2);
    const { subtractFromBalance } = SubtractFromBalance();

    const handlePlaceBet = async () => {
        await setBetAmount({ amount: bet });
        toast(`Bet of ${bet} placed.`);
        subtractFromBalance(bet);
    };

    

    return handlePlaceBet;
};