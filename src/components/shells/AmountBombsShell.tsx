import React from 'react';
import { Button } from '../ui';

interface AmountBombsShellProps {
    gridSize: string[] | number[];
}

const AmountBombsShell: React.FC<AmountBombsShellProps> = ({ gridSize }) => {
    return (
        <div>
            <h2 className="text-sm font-medium uppercase tracking-widest mb-2">Grid Size</h2>
            <div className="flex space-x-2">
                {gridSize.map((size) => (
                    <Button key={size} className="bg-[#1f1f38]">
                        {size}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default AmountBombsShell;
