'use client'

import { useState } from "react";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "../ui";
import { toast } from "sonner";

const BetBtn = ({ className, children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <Button className={`bg-transparent hover:bg-black/20 text-text border-outline ${className}`} {...rest}>{children}</Button>
);

export default function BalanceBetSize(): JSX.Element {
const balance = useQuery(api.balance.get);
const [inputValue, setInputValue] = useState("0");
const showBalance = balance?.[0]?.setBalance.toFixed(2);

const handleChange = (event: { target: { value: string; }; }) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (parseFloat(newValue) > balance?.[0]?.setBalance) {
        setInputValue(balance?.[0]?.setBalance.toFixed(2).toString());
        toast("Your bet is above your balance   ")
    }
};

const handleButtonClick = (modifier: number) => {
    let newValue = parseFloat(inputValue);
    newValue = Math.max(newValue + newValue * modifier, 0);
    if (newValue > balance?.[0]?.setBalance) {
        toast("You don't have enough balance to make this bet.  ");
        newValue = balance?.[0]?.setBalance;
    }
    setInputValue(parseFloat(newValue.toFixed(2)).toString());
};

const handleMaxClick = () => {
    setInputValue(balance?.[0]?.setBalance.toFixed(2).toString());
}


return (
    <div className="flex flex-col justify-center">
        <div className="flex items-center justify-between w-full">
            <span className="text-md text-text">Your balance</span>
            <span className="text-md text-text">{showBalance}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
            <div className="relative w-full">
                <input
                    placeholder="Your bet"
                    className="bg-transparent w-full focus:border-outline/20 p-4 text-text border-outline h-10 pl-6"
                    value={inputValue}
                    onChange={handleChange}
                    style={{ paddingLeft: '25px' }}
                />
                <span className="text-text absolute left-2 top-1/2 transform -translate-y-1/2">€</span>
                <div className="flex space-x-1 absolute top-1/2 right-2 transform -translate-y-1/2">
                    <BetBtn className="text-xs h-6 px-2" onClick={() => handleButtonClick(-0.5)}>1/2</BetBtn>
                    <BetBtn className="text-xs h-6 px-2" onClick={() => handleButtonClick(1)}>2x</BetBtn>
                    <BetBtn className="text-xs h-6 px-2" onClick={handleMaxClick} >MAX</BetBtn>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-4 gap-1">
            <BetBtn className="h-[50px] text-xs " onClick={() => handleButtonClick(0.1)}>+10%</BetBtn>
            <BetBtn className="h-[50px] text-xs p" onClick={() => handleButtonClick(0.5)}>+50%</BetBtn>
            <BetBtn className="h-[50px] text-xs p"onClick={() => handleButtonClick(1)}>+100%</BetBtn>
            <BetBtn className="h-[50px] text-xs py" onClick={() => handleButtonClick(10)}>+1000%</BetBtn>
        </div>
    </div>
);
}
