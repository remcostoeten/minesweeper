'use client';
import { useState } from 'react';
import AmountTilesShell from './AmountTilesShell';
import SidebarShell from './SidebarShell';
import GameShell from './GameShell';
import { toast } from 'sonner';
import { CheckIcon, Cross2Icon, ResetIcon } from '@radix-ui/react-icons';
import { Table, TableHeader, TableCell, TableBody, TableRow, TableFooter } from '../ui/table';
import Wrapper from './Wrapper';
import { Button } from '../ui';
import StatisticTabs from '../statistics/StatisticTabs';
import { Switch } from '../ui/switch';

interface Cell {
    isBomb: boolean;
    isRevealed: boolean;
    isPreselected: boolean; // New state variable for pre-selection
}

const initializeBoard = (rows: number, cols: number): Cell[][] => {
    const board: Cell[][] = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i][j] = { isBomb: false, isRevealed: false, isPreselected: false }; // Initialize pre-selection to false
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
    const [toggleHoldMouse, setToggleHoldMouse] = useState<boolean>(false);
    const [baseBalance, setBaseBalance] = useState<number>(100);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [betSize, setBetSize] = useState<number>(1);
    const [freezeGame, setFreezeGame] = useState<boolean>(false);
    const [preselectionToggle, setPreselectionToggle] = useState(false);
    const [preSelectedCells, setPreSelectedCells] = useState<[] | { row: number; col: number }[]>([]); // Stores pre-selected cells
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

    const freezeGameClick = () => {
        setFreezeGame((prevFreezeGame) => !prevFreezeGame);
    };

    function handlePreselection(row: number, col: number) {
        if (gameOver || freezeGame) {
          return;
        }
        if (!gameStarted) {
            return;
        }
        const newPreSelectedCells = [...preSelectedCells];
        const cellAlreadySelected = newPreSelectedCells.find(
            (cell) => cell.row === row && cell.col === col
        );

        if (cellAlreadySelected) {
            // Remove cell from pre-selection if already selected
            setPreSelectedCells(newPreSelectedCells.filter((cell) => cell !== cellAlreadySelected));
        } else {
            // Add cell to pre-selection
            setPreSelectedCells([...newPreSelectedCells, { row, col }]);
        }
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
            setPreSelectedCells([]);
        };

        let newBoard = initializeBoard(rows, cols);

        const takeProfit = () => {
            setRoundResults((prevResults) => [
                ...prevResults,
                { round: roundResults.length + 1, timesDied: numDeaths, timesClicked, rows, cols, bombs },
            ]);
            toast('succesfully cashed out');
            setProfitTaken(true);
            revealAll();
            setBaseBalance((prevBalance) => prevBalance + betSize);
        };

        const startNewGame = () => {
            setBaseBalance((prevBalance) => prevBalance - betSize);
            if (gameOver) {
                setTimeout(() => {
                    newBoard = newBoard.map((row) =>
                        row.map((cell) => ({ ...cell, isRevealed: false, isPreselected: false })) // Clear pre-selections on new game
                    );
                    setBoard(newBoard);
                }, 2000);
            }
            setBoard(placeBombs(newBoard, bombs));
            setOpenedTilesCount(0);
            setTimesClicked(0);
            setGameOver(false);
            setGameStarted(true);
            setNumDeaths(0);
            setProfitTaken(false);
            setBoard(newBoard);
            setPreSelectedCells([]); // Clear pre-selections on new game
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
            if (gameOver || board[row][col].isRevealed || freezeGame) {
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

        const renderBalance = () => {
            return (
                <div>
                    <h4>Balance</h4>
                    <p>Current balance: {baseBalance}</p>
                </div>
            );
        };

        function renderBetSize() {
            return (
                <div>
                    <h4>Bet Size</h4>
                    <input value={betSize} onChange={(e: { target: { value: any; }; }) => setBetSize(Number(e.target.value))} />
                    <p>Current bet size: {betSize}</p>
                </div>
            );
        }

        function renderFreezeGame() {
            return (
                <div>
                    <h4>Freeze game</h4>
                    <Switch checked={freezeGame} onClick={freezeGameClick} />
                </div>
            );
        }

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
        };

        const handleCellMouseEnter = (row: number, col: number) => {
            if (gameOver) {
                return;
            }
        };

        const toggleHoldMouseClick = () => {
            setToggleHoldMouse(prevToggleHoldMouse => !prevToggleHoldMouse);
        };

        const ToggleComponent = () => {
            return (
                <div>
                    <h4>Toggle Hold Mouse</h4>
                    <p>Toggle to allow for holding the mouse button to reveal cells</p>
                    <Switch checked={toggleHoldMouse} onClick={toggleHoldMouseClick} />
                    Curently {toggleHoldMouse ? 'enabled' : 'disabled'}
                </div>
            );
        };

        const handleMouseUp = () => {
            setToggleHoldMouse(false);
        };

        const handlePreSelectionCheck = (row: number, col: number) => {
            return preSelectedCells.some((cell) => cell.row === row && cell.col === col);
        };

        const handlePlay = () => {
            if (!gameStarted || gameOver || preSelectedCells.length === 0) {
                return;
            }

            const newBoard = [...board];
            let gameOverByPreselection = false;

            for (const cell of preSelectedCells) {
                const { row, col } = cell;
                if (newBoard[row][col].isBomb) {
                    gameOverByPreselection = true;
                    break;
                }
            }

            if (gameOverByPreselection) {
                setGameOver(true);
                revealAll();
                setNumDeaths((prevCount) => prevCount + 1);
                setRoundResults((prevResults) => [
                    ...prevResults,
                    { round: roundResults.length + 1, timesDied: numDeaths + 1, timesClicked: 0, rows, cols, bombs },
                ]);
                toast('You lost! A bomb was pre-selected.');
            } else {
                // No bombs pre-selected, reveal pre-selected cells and check for win
                for (const cell of preSelectedCells) {
                    const { row, col } = cell;
                    newBoard[row][col].isRevealed = true;
                    setOpenedTilesCount((prevCount) => prevCount + 1);
                }
                setBoard(newBoard);
                if (checkWin(newBoard)) {
                    setGameOver(true);
                    setRoundResults((prevResults) => [
                        ...prevResults,
                        { round: roundResults.length + 1, timesDied: numDeaths, timesClicked: timesClicked, rows, cols, bombs },
                    ]);
                    toast(`Congratulations, you won!`);
                }
            }

            setPreSelectedCells([]); // Clear pre-selections after playing
        };

        function renderPreSelectedCells() {
            return (
                <div>
                    <h4>Pre-selected cells</h4>
                    <p>Pre-selected cells: {preSelectedCells.length}</p>
                </div>
            );
        }

        function togglePreselection(row: number, col: number) {
             return (
                <div className='flex flex-col gap-2'>
                    <h4>Pre-select cells</h4>
                    <input type='checkbox' checked={preselectionToggle} onChange={() => setPreselectionToggle(!preselectionToggle)} />
                    {preselectionToggle && preSelectedCells.length > 0 && (
  <Button onClick={handlePlay}>Show Result</Button>
)}     </div>
             )
        }

        return (
            <>
                <div className='flex gap-2'>
                    <div className='flex gap-2 flex-col w-4/6  justify-center  items-center'>
                        <div className="flex justify-center mb-4">
                            <Button onClick={startGame} disabled={gameStarted}>
                                {gameStarted ? "Game is Started" : "Start Game"}
                            </Button>
                            {gameStarted && <Button onClick={handlePlay}>Play</Button>}
                            {gameStarted && <Button onClick={takeProfit} disabled={profitTaken}>Take profit</Button>}
                            {(gameOver || profitTaken) && (
                                <Button onClick={startNewGame}>
                                    <ResetIcon height={30} width={30} className="mr-2" />
                                    Start New Game
                                </Button>
                            )}
                        </div>
                        {renderBalance()}
                        JavaScript
                        {renderBetSize()}
                        {ToggleComponent()}
                        {renderFreezeGame()}
                        {renderPreSelectedCells()}
                        {togglePreselection(0, 0)}
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
                                                        className={`border border-gray-100 h-32 w-32 flex items-center justify-center cursor-pointer text-lg font-semibold
                                                            ${cell.isRevealed ? 'flex bg-emerald-600' : ''}
                                                            ${cell.isRevealed && cell.isBomb ? 'bg-red-500' : ''}
                                                            ${handlePreSelectionCheck(rowIndex, colIndex) ? 'bg-blue-500' : ''}`} // Add this line
                                                        onClick={() => preselectionToggle ? handlePreselection(rowIndex, colIndex) : handleCellClick(rowIndex, colIndex)}
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
                const totalDeaths = roundResults.filter(result => result.timesDied > 0).length;
                const totalWins = roundResults.filter(result => result.timesDied === 0).length;
                const totalRounds = roundResults.length;
                const winPercentage = totalRounds > 0 ? (totalWins / totalRounds) * 100 : 0;
                const avarageClicksPerRound = roundResults.reduce((acc, result) => acc + result.timesClicked, 0) / totalRounds;

                return (
                    <Table>

                        <TableHeader className='mt-4 border-b' style={{ width: '100%' }}>
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
                        <TableFooter>
                            <TableCell colSpan={2}>Total Deaths: {totalDeaths}</TableCell>
                            <TableCell colSpan={2}>Total Wins: {totalWins}</TableCell>
                            <TableCell colSpan={2}>Win Percentage: {winPercentage.toFixed(2)}%</TableCell>
                            <TableCell colSpan={2}>You avarge died on the {avarageClicksPerRound}th click</TableCell>
                        </TableFooter>
                    </Table>
                );
            };

            const globalStatistics = () => {
                return (
                    <>
                        <TableHeader className='mt-4 border-b'>
                            <h2>Todo store data</h2>
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
            }

            return (
                <Wrapper>
                    <StatisticTabs triggerOne='Session statistics' triggerTwo='Global Statistics' contentTwo={globalStatistics()} contentOne={<Table>
                        <ResetIcon height={30} width={30} className='absolute top-12 right-4' onClick={reset} />
                        {sessionStatistics()}
                    </Table>} />
                </Wrapper>
            );
        };
