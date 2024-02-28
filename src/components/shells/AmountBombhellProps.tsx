'use client';

import React from 'react';

interface ButtonProps {
    className: string;
    onClick: () => void;
    children: React.ReactNode;
}


type AmountBombsShellProps = {
    onBombAmountChange: (amount: number) => void;
}

const Button: React.FC<ButtonProps> = ({ className, onClick, children }) => (
    <button className={className} onClick={onClick}>
        {children}
    </button>
);

export default function AmountBombShell({ onBombAmountChange }: AmountBombsShellProps) {
    return (
        <div>
            <h2 className="text-sm font-medium uppercase tracking-widest mb-2">Number of Mines</h2>
            <div className="flex space-x-2">
                <Button className="bg-[#1f1f38]" onClick={() => onBombAmountChange(1)}>1</Button>
                <Button className="bg-[#00f9ff]" onClick={() => onBombAmountChange(3)}>3</Button>
                <Button className="bg-[#1f1f38]" onClick={() => onBombAmountChange(5)}>5</Button>
                <Button className="bg-[#1f1f38]" onClick={() => onBombAmountChange(7)}>7</Button>
                <Button className="bg-[#1f1f38]" onClick={() => onBombAmountChange(0)}>Custom</Button>
            </div>
        </div>

    );
}
