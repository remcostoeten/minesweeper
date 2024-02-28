'use client';

import React, { useState, useEffect } from 'react';
import Cell from './shells/CellShell';

interface MinefieldProps {
  gridSize: number;
  numMines: number;
}

interface CellData {
  isMine: boolean;
  isRevealed: boolean;
}

const Minefield: React.FC<MinefieldProps> = ({ gridSize, numMines }) => {
  const [minefield, setMinefield] = useState<CellData[][]>([]);

  useEffect(() => {
    const newMinefield: CellData[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill({ isMine: false, isRevealed: false }));

    // Randomly place the mines
    for (let i = 0; i < numMines; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * gridSize);
        y = Math.floor(Math.random() * gridSize);
      } while (newMinefield[x][y].isMine);
      newMinefield[x][y].isMine = true;
    }

    setMinefield(newMinefield);
  }, [gridSize, numMines]);

  const handleCellClick = (x: number, y: number) => {
    // Reveal the cell
    setMinefield(prevMinefield => {
      const newMinefield = [...prevMinefield];
      newMinefield[x][y].isRevealed = true;
      return newMinefield;
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
      {minefield.map((row, x) => (
        row.map((cell, y) => (
          <Cell key={`${x}-${y}`} isMine={cell.isMine} isRevealed={cell.isRevealed} onClick={() => handleCellClick(x, y)}>
          {cell.isRevealed && cell.isMine ? '💣' : null}
        </Cell>
        ))
      ))}
    </div>
  );          
};

export default Minefield;