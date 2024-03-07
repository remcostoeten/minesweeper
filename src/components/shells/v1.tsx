'use client';
import { useState, useEffect } from 'react';
import AmountTilesShell from './AmountTilesShell';
import SidebarShell from './SidebarShell';
import GameShell from './GameShell';
import { toast } from 'sonner';
import { CheckIcon, Cross2Icon, ResetIcon } from '@radix-ui/react-icons';
import { Table, TableHeader, TableCell, TableBody, TableRow } from '../ui/table';
import Wrapper from './Wrapper';
import { Button } from '../ui';
import StatisticTabs from '../statistics/StatisticTabs';

interface Cell {
    isBomb: boolean;
    isRevealed: boolean;
}

const initializeBoard = (rows: number, cols: number): Cell[][] => {
    const board: Cell[][] = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i][j] = { isBomb: false, isRevealed: false };
        }
    }
    return board;
};

const placeBombs = (board: Cell[][], bombs: number): Cell[][] => {
    let bombsPlaced = 0;
    while (bombsPlaced < bombs) {
        const row = Math.floor(Math.random() * board.length);
        const col = Math.floor(Math.random() * board[0].length);
        if (!board[row][col].isBomb) {
            board[row][col].isBomb = true;
            bombsPlaced++;
        }
    }
    return board;
};

export default function Component({ className = '' }: { className?: string }) {
    const [rows, setRows] = useState<number>(5);
    const [cols, setCols] = useState<number>(5);
    const [bombs, setBombs] = useState<number>(3);
    const [openedTilesCount, setOpenedTilesCount] = useState(0);
    const [timesClicked, setTimesClicked] = useState<number>(0);
    const [board, setBoard] = useState<Cell[][]>(initializeBoard(rows, cols));
    const [profitTaken, setProfitTaken] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [numDeaths, setNumDeaths] = useState<number>(0);
    const [roundResults, setRoundResults] = useState<
        Array<{
            round: number;
            timesDied: number;
            timesClicked: number;
            rows: number;
            cols: number;
            bombs: number;
        }>
    >([]);


    const clearAll = () => {
        setRoundResults([]);
        localStorage.clear();
    };

    const [gameStarted, setGameStarted] = useState<boolean>(false);

    const startGame = () => {
        setBoard(initializeBoard(rows, cols));
        setBoard(placeBombs(board, bombs));
        setOpenedTilesCount(0);
        setTimesClicked(0);
        setGameOver(false);
        setGameStarted(true);
    }
    let newBoard = initializeBoard(rows, cols);

    const takeProfit = () => {
        setRoundResults((prevResults) => [
            ...prevResults,
            { round: roundResults.length + 1, timesDied: numDeaths, timesClicked, rows, cols, bombs },
        ]);
        toast('succesfully cashed out')
        setProfitTaken(true);
    }

    const resetGame = () => {
        setGameOver(false);
        newBoard = initializeBoard(rows, cols);
        setBoard(newBoard);
        setTimesClicked(0);
        toast('Field cleared and round reset!');
    };

    const startNewGame = () => {
        if (gameOver) {
            setTimeout(() => {
                newBoard = newBoard.map(row => row.map(cell => ({ ...cell, isRevealed: false })));
                setBoard(newBoard);
            }, 2000);
        }
        setBoard(placeBombs(newBoard, bombs));
        setOpenedTilesCount(0);
        setTimesClicked(0);
        setGameOver(false);
        setGameStarted(true); // Set gameStarted to true
        setNumDeaths(0);
        setProfitTaken(false);
        setBoard(newBoard);
    }

    const checkWin = (board: Cell[][]): boolean => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const cell = board[i][j];
                if (!cell.isBomb && !cell.isRevealed) {
                    return false;
                }
            }
        }
        return true;
    };

    const revealAll = () => {
        const newBoard = [...board];
        for (let i = 0; i < newBoard.length; i++) {
            for (let j = 0; j < newBoard[0].length; j++) {
                newBoard[i][j].isRevealed = true;
            }
        }
        setBoard(newBoard);
    };

    const handleCellClick = (row: number, col: number) => {
        if (gameOver || board[row][col].isRevealed) {
            return;
        }
        setTimesClicked((prevCount) => prevCount + 1);
        let newBoard = [...board];
        newBoard[row][col].isRevealed = true;
        setBoard(newBoard);

        if (board[row][col].isBomb) {
            setGameOver(true);
            revealAll();
            setNumDeaths((prevCount) => prevCount + 1);
            setRoundResults((prevResults) => [
                ...prevResults,
                { round: roundResults.length + 1, timesDied: numDeaths + 1, timesClicked, rows, cols, bombs },
            ]);
            toast(`Too bad, you died on the ${timesClicked + 1} click`);
        } else if (!board[row][col].isRevealed) {
            setOpenedTilesCount((prevCount) => prevCount + 1);
            if (checkWin(newBoard)) {
                setGameOver(true);
                setRoundResults((prevResults) => [
                    ...prevResults,
                    { round: roundResults.length + 1, timesDied: numDeaths, timesClicked, rows, cols, bombs },
                ]);
                toast(`Congratulations, you won!`);
            }
        }
    };

    useEffect(() => {
        const savedRows = localStorage.getItem('rows');
        const savedCols = localStorage.getItem('cols');
        const savedBombs = localStorage.getItem('bombs');
        const savedBoard = localStorage.getItem('board');
        const savedOpenedTilesCount = localStorage.getItem('openedTilesCount');
        const savedGameOver = localStorage.getItem('gameOver');
        const savedNumDeaths = localStorage.getItem('numDeaths');

        if (savedRows) setRows(JSON.parse(savedRows));
        if (savedCols) setCols(JSON.parse(savedCols));
        if (savedBombs) setBombs(JSON.parse(savedBombs));
        if (savedBoard) setBoard(JSON.parse(savedBoard));
        if (savedOpenedTilesCount) setOpenedTilesCount(JSON.parse(savedOpenedTilesCount));
        if (savedGameOver) setGameOver(JSON.parse(savedGameOver));
        if (savedNumDeaths) setNumDeaths(JSON.parse(savedNumDeaths));
    }, []);

    useEffect(() => {
        localStorage.setItem('rows', JSON.stringify(rows));
        localStorage.setItem('cols', JSON.stringify(cols));
        localStorage.setItem('bombs', JSON.stringify(bombs));
        localStorage.setItem('board', JSON.stringify(board));
        localStorage.setItem('openedTilesCount', JSON.stringify(openedTilesCount));
        localStorage.setItem('gameOver', JSON.stringify(gameOver));
        localStorage.setItem('numDeaths', JSON.stringify(numDeaths));
    }, [rows, cols, bombs, board, openedTilesCount, gameOver, numDeaths]);

    const handleSetRows = (value: number) => {
        if ([3, 5, 7, 9].includes(value)) {
            setRows(value);
        }
    };

    const handleSetCols = (value: number) => {
        if ([3, 5, 7, 9].includes(value)) {
            setCols(value);
        }
    };


    return (
        <>
            <div className='flex gap-2'>
                <div className='flex gap-2 flex-col w-4/6  justify-center  items-center'>
                    <div className="flex justify-center mb-4">
                        <Button onClick={startGame} disabled={gameStarted}>
                            {gameStarted ? "Game is Started" : "Start Game"}
                        </Button>
                        {gameStarted && <Button onClick={takeProfit} disabled={profitTaken}>Take profit</Button>}
                        {(gameOver || profitTaken) && (
                            <Button onClick={startNewGame}>
                                <ResetIcon height={30} width={30} className="mr-2" />
                                Start New Game
                            </Button>
                        )}
                    </div>
                    <SidebarShell>
                        <AmountTilesShell
                            rows={rows}
                            cols={cols}
                            bombs={bombs}
                            setCols={handleSetCols}
                            setBombs={setBombs}
                            setRows={handleSetRows}
                        />
                    </SidebarShell>
                    <GameShell title="Minesweeper">
                        <div className="flex">
                            <div className="    center items-start">
                                <div className={`grid ${rows === 3 && cols === 3 ? 'grid-cols-3' : 'grid-cols-5'} gap-1 w-max place-items-center w-max-[900px]`}>
                                    {board.map((row, rowIndex) =>
                                        row.map((cell, colIndex) => (
                                            <div
                                                key={`${rowIndex}-${colIndex}`}
                                                className={`border border-gray-100 h-32 w-32 flex items-center justify-center cursor-pointer text-lg font-semibold ${cell.isRevealed ? 'flex bg-emerald-600' : ''
                                                    } ${cell.isRevealed && cell.isBomb ? 'bg-red-500' : ''}`}
                                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                            >
                                                <span className="scale-175">{cell.isRevealed && cell.isBomb ? '💣' : ''}</span>
                                                <span className="scale-175">{cell.isRevealed && !cell.isBomb ? '💎' : ''}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </GameShell>
                </div>
                <div className='w-2/6'>
                    <ResultsSidebar reset={clearAll} timesDied={numDeaths} roundResults={roundResults} />
                </div>
            </div>
        </>
    );
}

type ResultsSidebarProps = {
    reset: () => void;
    timesDied: number;
    roundResults: Array<{
        round: number;
        timesDied: number;
        timesClicked: number;
        rows: number;
        cols: number;
        bombs: number;
    }>;
};
const ResultsSidebar: React.FC<ResultsSidebarProps> = ({ reset, roundResults }) => {
    const sessionStatistics = () => {
        return (
            <>
                <TableHeader className='mt-4 border-b'>
                    <TableCell>Round</TableCell>
                    <TableCell>Times Died</TableCell>
                    <TableCell>Times Clicked</TableCell>
                    <TableCell>Rows</TableCell>
                    <TableCell>Columns</TableCell>
                    <TableCell>Bombs</TableCell>
                    <TableCell>Result</TableCell>
                </TableHeader>
                <TableBody>
                    {roundResults.map((result, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {result.timesDied === 0 ? (
                                    <CheckIcon color="green" />
                                ) : (
                                    <Cross2Icon color="red" />
                                )}
                            </TableCell>
                            <TableCell>{result.round}</TableCell>
                            <TableCell>{result.timesDied}</TableCell>
                            <TableCell>{result.timesClicked}</TableCell>
                            <TableCell>{result.rows}</TableCell>
                            <TableCell>{result.cols}</TableCell>
                            <TableCell>{result.bombs}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </>
        );
    };

    return (
        <Wrapper>
            <StatisticTabs triggerOne='Session statistics' triggerTwo='b  ' contentTwo={<>  </>} contentOne={<Table>
                <ResetIcon height={30} width={30} className='absolute top-4 right-4' onClick={reset} />
                {sessionStatistics()}
            </Table>} />
            </Wrapper>
    );
};
