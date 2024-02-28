'use client';
import Wrapper from '@/components/shells/Wrapper';
import { Button, Input } from '@/components/ui';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Cell } from '@/core/types';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const CELL_SIZE = 60;

function Minesweeper() {
  const [gridSize, setGridSize] = useState(5);
  const [mines, setMines] = useState(3);
  const [gameState, setGameState] = useState('idle');
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [openedCells, setOpenedCells] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [openedAtEnd, setOpenedAtEnd] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);

  const initializeGame = () => {
    const newGrid: Cell[][] = [];
    for (let i = 0; i < gridSize; i++) {
      newGrid[i] = [];
      for (let j = 0; j < gridSize; j++) {
        newGrid[i][j] = { value: 0, revealed: false, flagged: false };
      }
    }

    placeMines(newGrid, mines);
    calculateCellValues(newGrid);
    setGrid(newGrid);
    setOpenedCells(0);
    setGameState('playing');
  };
  useEffect(() => {
    initializeGame();
  }, []);

  const placeMines = (grid: Cell[][], numMines: number) => {
    let placedMines = 0;
    while (placedMines < numMines) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      if (!grid[row][col].value && !grid[row][col].flagged) {
        grid[row][col].value = '';
        placedMines++;
      }
    }
  };

  const calculateCellValues = (grid: Cell[][]) => {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (grid[i][j].value === '') {
          continue;
        }
        let surroundingMines = 0;
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            const ni = i + di;
            const nj = j + dj;
            if (ni >= 0 && ni < gridSize && nj >= 0 && nj < gridSize && grid[ni][nj].value === '') {
              surroundingMines++;
            }
          }
        }
        grid[i][j].value = surroundingMines.toString();
      }
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameState === 'idle' || gameState === 'lose') {
      return;
    }
    const cell = grid[row][col];
    if (cell.flagged) {
      return;
    }
    if (cell.value === '') {
      setGameState('lose');
      revealAllMines();
      setDeaths(deaths + 1);
      setRoundsPlayed(roundsPlayed + 1);
      setOpenedAtEnd(openedCells);
    } else {
      openCell(row, col);
      checkWinCondition();
    }
  };

  const openCell = (row: number, col: number) => {
    const cell = grid[row][col];
    if (cell.revealed) {
      return;
    }
    cell.revealed = true;
    setOpenedCells(openedCells + 1);
  };

  const revealAllMines = () => {
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (grid[i][j].value === '') {
          grid[i][j].revealed = true;
        }
      }
    }
    setGrid(grid);
  };

  const checkWinCondition = () => {
    let allCellsRevealed = true;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (!grid[i][j].revealed && grid[i][j].value !== '') {
          allCellsRevealed = false;
          break;
        }
      }
      if (!allCellsRevealed) {
        break;
      }
    }
    if (allCellsRevealed) {
      setGameState('win');
    }
  };

  const handleFlagClick = (row: number, col: number) => {
    if (gameState === 'idle' || gameState === 'lose') {
      return;
    }
    const cell = grid[row][col];
    cell.flagged = !cell.flagged;
  };

  const handleStartClick = () => {
    initializeGame();
  };

  const renderCell = (cell: Cell, row: number, col: number) => {
    let content;
    if (cell.revealed) {
      if (cell.value === '') {
        content = '💣';
      } else {
        content = '💎';
      }
    } else {
      content = '';
    }
    return (
      <button
        key={`${row}-${col}`}
        className="border border-black/50  text-center  bg-slate-600  cursor-pointer"
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
        }}
        onClick={() => handleCellClick(row, col)}
        onContextMenu={(event) => {
          event.preventDefault();
          handleFlagClick(row, col);
        }}
        disabled={gameState === 'lose'}
      >
        {content}
      </button>
    );
  };

  return (
    <div className="flex">
      <Wrapper className='w-[20%]flex flex-col gap-2'>
        <Input
          type="number"
          id="gridSize"
          value={gridSize}
          onChange={(event: { target: { value: string } }) => setGridSize(parseInt(event.target.value))}
          min="3"
          max="30"
        />
        <Input
          type="number"
          id="mines"
          value={mines}
          onChange={(event) => setMines(parseInt(event.target.value))}
          min="1"
          max={(gridSize * gridSize) - 1}
        />

        <Table>
          <TableCaption>Statistics</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Rounds played total</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{roundsPlayed}</TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br />
        <br />
        {gameState !== 'idle' && (
          <div>
            <p>Deaths: {deaths}</p>
            <p>Opened: {openedCells}</p>
          </div>
        )}
        {gameState === 'lose' && toast('You Lose!')}
        {gameState === 'win' && toast('You Win!')}
      </Wrapper>
      <Wrapper className="w-3/4 flex  flex-col flex-1 gap-2">
        <h1 className="text-2xl font-bold mb-4">Minesweeper</h1>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, ${CELL_SIZE}px)` }}>
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))
          ))}
        </div>
        <Button className='align-self-end w'
          variant="secondary"
          onClick={handleStartClick}
        >
          Start New Game
        </Button>
      </Wrapper>
    </div>
  );
}

export default Minesweeper;
