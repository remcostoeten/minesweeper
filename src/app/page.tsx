'use client';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

const calculateProbability = (mines: number, tiles: number): number => {
  let probability = 1;
  for (let i = 0; i < tiles; i++) {
    probability *= (mines - i) / (mines + 7 - 1 - i);
  }
  return 1 - probability;
};

const App: React.FC = () => {
  const [mines, setMines] = useState<number>(5);
  const [tiles, setTiles] = useState<number>(7);

  const handleMinesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setMines(value);
  };

  const handleTilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setTiles(value);
  };

  const probability = calculateProbability(mines, tiles);
  const oneInHowMany = 1 / probability;

  return (
    <div>
      <h1>Mine Probability Calculator</h1>
      <div>
        <label>
          Number of mines:
          <Input type="number" value={mines} onChange={handleMinesChange} />
        </label>
      </div>
      <div>
        <label>
          Number of tiles (bottom row up):
          <Input type="number" value={tiles} onChange={handleTilesChange} />
        </label>
      </div>
      <div>
        <p>Probability: {probability.toFixed(4)} or {`${(probability * 100).toFixed(2)}%`}</p>
        <p>1 per how many: {oneInHowMany.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default App;
