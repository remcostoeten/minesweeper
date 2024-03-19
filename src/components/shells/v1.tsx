import React, { useState } from 'react';
import { toast } from 'sonner';
import { CheckIcon, Cross2Icon, ResetIcon } from '@radix-ui/react-icons';
import { useRevealAll } from '@/core/base-game-logic';
import SidebarShell from './SidebarShell';
import GameShell from './GameShell';
import AmountTilesShell from './AmountTilesShell';
import Wrapper from './Wrapper';
import Flexer from '../core/Flexer';
import SelectMode from '../settings/SelectGameMode';
import BalanceBetSize from '../settings/BalanceBetSize';
import BalanceDisplay from './BalanceDisplay';
import StatisticTabs from '../statistics/StatisticTabs';
import ResultsSidebar from './ResultsSidebar';
import { Button } from '../ui';

interface Cell {
    isBomb: boolean;
    isRevealed: boolean;
}

const HOLD_MOUSE_DELAY = 1250;

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

const Minesweeper: React.FC = () => {
    const [rows, setRows] = useState<number>(5);
    const [cols, setCols] = useState<number>(5);
    const [bombs, setBombs] = useState<number>(3);
    const [openedTilesCount, setOpenedTilesCount] = useState<number>(0);
    const [timesClicked, setTimesClicked] = useState<number>(0);
    const [profitTaken, setProfitTaken] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [numDeaths, setNumDeaths] = useState<number>(0);
    const [toggleHoldMouse, setToggleHoldMouse] = useState<boolean>(false);
    const [baseBalance, setBaseBalance] = useState<number>(100);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [betSize, setBetSize] = useState<number>(1);
    const [freezeGame, setFreezeGame] = useState<boolean>(false);
    const [roundResults, setRoundResults] = useState<
        Array<{
            round: number;
            timesDied: number;
            timesClicked: number;
            rows: number;
            cols: number;
            bombs: number;
            betSize: number;
        }>
    >([]);
    const { board, setBoard, revealAll } = useRevealAll(initializeBoard(rows, cols));

    const freezeGameClick = () => {
        setFreezeGame((prevFreezeGame) => !prevFreezeGame);
    };

    const clearAll = () => {
        setRoundResults([]);
        localStorage.clear();
    };

    const startGame = () => {
        setBoard(initializeBoard(rows, cols));
        setBoard(placeBombs(board, bombs));
        setOpenedTilesCount(0);
        setTimesClicked(0);
        setGameOver(false);
        setGameStarted(true);
        setBaseBalance((prevBalance) => prevBalance - betSize);
    };

    const takeProfit = () => {
        setRoundResults((prevResults) => [
            ...prevResults,
            { round: roundResults.length + 1, timesDied: numDeaths, timesClicked, rows, cols, bombs, betSize },
        ]);
        toast('successfully cashed out');
        setProfitTaken(true);
        revealAll();
        setBaseBalance((prevBalance) => prevBalance + betSize);
    };

    const startNewGame = () => {
        setBaseBalance((prevBalance) => prevBalance - betSize);
        if (gameOver) {
            setTimeout(() => {
                const newBoard = initializeBoard(rows, cols);
                setBoard(placeBombs(newBoard, bombs));
                setOpenedTilesCount(0);
                setTimesClicked(0);
                setGameOver(false);
                setNumDeaths(0);
                setProfitTaken(false);
                setBoard(newBoard);
            }, 2000);
        }
    };

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

    const handleCellClick = (row: number, col: number) => {
        if (gameOver || board[row][col].isRevealed || freezeGame) {
            return;
        }
        let newTimesClicked = timesClicked + 1;
        setTimesClicked(newTimesClicked);
        let newBoard = [...board];
        newBoard[row][col].isRevealed = true;
        setBoard(newBoard);

        if (board[row][col].isBomb) {
            setGameOver(true);
            revealAll();
            setNumDeaths((prevCount) => prevCount + 1);
            setRoundResults((prevResults) => [
                ...prevResults,
                { round: roundResults.length + 1, timesDied: numDeaths + 1, timesClicked: newTimesClicked, rows, cols, bombs, betSize },
            ]);
            toast(`Too bad, you died on the ${newTimesClicked + 1} click`);
        } else if (!board[row][col].isRevealed) {
            setOpenedTilesCount((prevCount) => prevCount + 1);
            if (checkWin(newBoard)) {
                setGameOver(true);
                setRoundResults((prevResults) => [
                    ...prevResults,
                    { round: roundResults.length + 1, timesDied: numDeaths, timesClicked: newTimesClicked, rows, cols, bombs, betSize },
                ]);
                toast(`Congratulations, you won!`);
            }
        }
    };

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

    const handleCellMouseDown = (row: number, col: number) => {
        if (gameOver) {
            return;
        }
        setToggleHoldMouse(true);
        if (!toggleHoldMouse) {
            toast(`Holding mouse on ${row} ${col}`);
        }
    };

    const handleMouseUp = () => {
        setToggleHoldMouse(false);
    };

    const handleCellMouseEnter = (row: number, col: number) => {
        if (gameOver || !toggleHoldMouse) {
            return;
        }
        setTimeout(() => {
            handleCellClick(row, col);
        }, HOLD_MOUSE_DELAY);
    };

    const toggleHoldMouseClick = () => {
        setToggleHoldMouse(prevToggleHoldMouse => !prevToggleHoldMouse);
    };

    return (
        <>
            <div className='flex gap-2'>
                <div className='flex gap-2 flex-col w-max-4/6  p-10'>
                    <SelectMode />
                    <BalanceBetSize />
                    <hr />
                    <BalanceDisplay balance={baseBalance} profitLoss={0} />
                    <BetSize betSize={betSize} setBetSize={setBetSize} />
                    <hr />
                    <ToggleHoldMouse toggleHoldMouse={toggleHoldMouse} toggleHoldMouseClick={toggleHoldMouseClick} />
                    <hr />
                    <FreezeGame freezeGame={freezeGame} freezeGameClick={freezeGameClick} />
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
                    <Flexer>
                        {!gameStarted && <Button className='bg-main w-full' onClick={startGame}>Start Game</Button>}
                        {(gameStarted && !gameOver && !profitTaken) && <Button onClick={takeProfit}>Take profit</Button>}
                        {(gameOver || profitTaken) && (
                            <Button onClick={startNewGame}>
                                <ResetIcon height={30} width={30} className="mr-2" />
                                Start New Game
                            </Button>
                        )}
                    </Flexer>
                </div>
                {gameStarted && (
                    <GameShell title="Minesweeper">
                        <div className="flex">
                            <div className="center items-start">
                                <div className={`grid ${rows === 3 && cols === 3 ? 'grid-cols-3' : 'grid-cols-5'} gap-1 w-max place-items-center w-max-[900px]`}>
                                    {board.map((row, rowIndex) =>
                                        row.map((cell, colIndex) => (
                                            <div
                                                key={`${rowIndex}-${colIndex}`}
                                                className={`border border-gray-100 h-32 w-32 flex items-center justify-center cursor-pointer text-lg font-semibold
                                                        ${cell.isRevealed ? 'flex bg-emerald-600' : ''}
                                                        ${cell.isRevealed && cell.isBomb ? 'bg-red-500' : ''}`}
                                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                                onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                                                onMouseUp={handleMouseUp}
                                                onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
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
                )}
                <div className='w-2/6'>
                    <ResultsSidebar reset={clearAll} timesDied={numDeaths} roundResults={roundResults} />
                </div>
            </div>
        </>
    );
};

export default Minesweeper;
