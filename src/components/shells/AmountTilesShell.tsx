import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface AmountTileShellProps {
    rows: number;
    cols: number;
    bombs: number;
    setRows: (value: number) => void;
    setCols: (value: number) => void;
    setBombs: (value: number) => void;
}

export default function AmountTileShell({
    rows,
    cols,
    bombs,
    setRows,
    setCols,
    setBombs,
}: AmountTileShellProps) {
    return (
        <div className="flex justify-center mb-4">
            <div className="flex flex-col items-center text-white mr-2">
                <div className="flex flex-col items-center text-white ml-2">
                    Rows:
                    <div className=' flex gap-'>
                        <Button onClick={() => {
                            setRows(3);
                            setCols(3);
                        }}>3</Button>
                        <Button onClick={() => {
                            setRows(5);
                            setCols(5);
                        }}>5</Button>
                        <Button onClick={() => {
                            setRows(7);
                            setCols(7);
                        }}>7</Button>
                        <Button onClick={() => {
                            setRows(9);
                            setCols(9);
                        }}>9</Button>
                    </div>
                </div>

                <div className="flex flex-col items-center text-white ml-2">
                    Bombs:
                    <Input
                        type="number"
                        value={bombs}
                        onChange={(e) => setBombs(Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
};

