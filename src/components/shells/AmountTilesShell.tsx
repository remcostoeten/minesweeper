import React, { ChangeEvent } from 'react';
import { Input } from '../ui/input';

interface AmountTileShellProps {
    rows: number;
    cols: number;
    bombs: number;
    setRows: (value: number) => void;
    setCols: (value: number) => void;
    setBombs: (value: number) => void;
}

const AmountTileShell: React.FC<AmountTileShellProps> = ({
    rows,
    cols,
    bombs,
    setRows,
    setCols,
    setBombs,
}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>, setter: (value: number) => void) => {
        const value = parseInt(e.target.value, 10);
        setter(value);
    };

    return (
        <div className="flex justify-center mb-4">
            <label className="flex flex-col items-center text-white mr-2">
                Rows:
                <Input
                    type="number"
                    min="3"
                    max="9"
                    value={rows}
                    onChange={(e) => handleChange(e, setRows)}
                    className="border p-2"
                />
            </label>

            <label className="flex flex-col items-center text-white mx-2">
                Columns:
                <Input
                    type="number"
                    min="3"
                    max="9"
                    value={cols}
                    onChange={(e) => handleChange(e, setCols)}
                    className="border p-2"
                />
            </label>

            <label className="flex flex-col items-center text-white ml-2">
                Bombs:
                <Input
                    type="number"
                    min="3"
                    max={(rows - 1) * (cols - 1)}
                    value={bombs}
                    onChange={(e) => handleChange(e, setBombs)}
                    className="border p-2"
                />
            </label>
        </div>
    );
};

export default AmountTileShell;