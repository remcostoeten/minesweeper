'use client';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function YourBalance(): JSX.Element {
    const balance = useQuery(api.balance.get);
    return (
        <div className="flex items-center justify-between w-full">
            <span className="text-sm text-text">Your balance</span>
            <span className="text-sm text-text">{balance?.[0]?.setBalance.toFixed(2)}</span>
        </div>
    );
}
