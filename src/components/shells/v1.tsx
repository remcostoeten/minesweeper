"use client"

import React, { useState } from "react"
import { useRevealAll } from "@/core/base-game-logic"
import { Cell, ResultsSidebarProps } from "@/core/types"
import { useWalletAmount } from "@/core/useBalance"
import { CheckIcon, Cross2Icon, ResetIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"

import BetSize from "../game-logic/betSize"
import FreezeGame from "../game-logic/freezeGame"
import ToggleHoldMouse from "../game-logic/toggleHoldMouse"
import BalanceBetSize from "../settings/BalanceBetSize"
import SelectMode from "../settings/SelectGameMode"
import StartGame from "../settings/StartGame"
import StatisticTabs from "../statistics/StatisticTabs"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "../ui/table"
import AmountTilesShell from "./AmountTilesShell"
import BalanceDisplay from "./_BalanceDisplay"
import GameShell from "./GameShell"
import SidebarShell from "./SidebarShell"
import Wrapper from "./Wrapper"

const HOLD_MOUSE_DELAY = 1250

const initializeBoard = (rows: number, cols: number): Cell[][] => {
  const board: Cell[][] = []
  for (let i = 0; i < rows; i++) {
    board[i] = []
    for (let j = 0; j < cols; j++) {
      board[i][j] = { isBomb: false, isRevealed: false }
    }
  }
  return board
}

const placeBombs = (board: Cell[][], bombs: number): Cell[][] => {
  let bombsPlaced = 0
  while (bombsPlaced < bombs) {
    const row = Math.floor(Math.random() * board.length)
    const col = Math.floor(Math.random() * board[0].length)
    if (!board[row][col].isBomb) {
      board[row][col].isBomb = true
      bombsPlaced++
    }
  }
  return board
}

const Minesweeper: React.FC = () => {
  const { walletAmount: amount } = useWalletAmount()
  const [rows, setRows] = useState<number>(5)
  const [cols, setCols] = useState<number>(5)
  const [bombs, setBombs] = useState<number>(3)
  const [openedTilesCount, setOpenedTilesCount] = useState<number>(0)
  const [timesClicked, setTimesClicked] = useState<number>(0)
  const [profitTaken, setProfitTaken] = useState<boolean>(false)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [numDeaths, setNumDeaths] = useState<number>(0)
  const [toggleHoldMouse, setToggleHoldMouse] = useState<boolean>(false)
  const [baseBalance, setBaseBalance] = useState<number>(amount)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [betSize, setBetSize] = useState<number>(1)
  const [freezeGame, setFreezeGame] = useState<boolean>(false)
  const [roundResults, setRoundResults] = useState<
    Array<{
      round: number
      timesDied: number
      timesClicked: number
      rows: number
      cols: number
      bombs: number
      betSize: number
    }>
  >([])
  const { board, setBoard, revealAll } = useRevealAll(
    initializeBoard(rows, cols)
  )

  const freezeGameClick = () => {
    setFreezeGame((prevFreezeGame) => !prevFreezeGame)
  }

  const clearAll = () => {
    setRoundResults([])
    localStorage.clear()
  }

  const startGame = () => {
    setBoard(initializeBoard(rows, cols))
    setBoard(placeBombs(board, bombs))
    setOpenedTilesCount(0)
    setTimesClicked(0)
    setGameOver(false)
    setGameStarted(true)
    setBaseBalance((prevBalance) => prevBalance - betSize)
  }

  const takeProfit = () => {
    setRoundResults((prevResults) => [
      ...prevResults,
      {
        round: roundResults.length + 1,
        timesDied: numDeaths,
        timesClicked,
        rows,
        cols,
        bombs,
        betSize,
      },
    ])
    toast("successfully cashed out")
    setProfitTaken(true)
    revealAll()
    setBaseBalance((prevBalance) => prevBalance + betSize)
  }

  const startNewGame = () => {
    setBaseBalance((prevBalance) => prevBalance - betSize)
    if (gameOver) {
      setTimeout(() => {
        const newBoard = initializeBoard(rows, cols)
        setBoard(placeBombs(newBoard, bombs))
        setOpenedTilesCount(0)
        setTimesClicked(0)
        setGameOver(false)
        setNumDeaths(0)
        setProfitTaken(false)
        setBoard(newBoard)
      }, 2000)
    }
  }

  const checkWin = (board: Cell[][]): boolean => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = board[i][j]
        if (!cell.isBomb && !cell.isRevealed) {
          return false
        }
      }
    }
    return true
  }

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || board[row][col].isRevealed || freezeGame) {
      return
    }
    let newTimesClicked = timesClicked + 1
    setTimesClicked(newTimesClicked)
    let newBoard = [...board]
    newBoard[row][col].isRevealed = true
    setBoard(newBoard)

    if (board[row][col].isBomb) {
      setGameOver(true)
      revealAll()
      setNumDeaths((prevCount) => prevCount + 1)
      setRoundResults((prevResults) => [
        ...prevResults,
        {
          round: roundResults.length + 1,
          timesDied: numDeaths + 1,
          timesClicked: newTimesClicked,
          rows,
          cols,
          bombs,
          betSize,
        },
      ])
      toast(`Too bad, you died on the ${newTimesClicked + 1} click`)
    } else if (!board[row][col].isRevealed) {
      setOpenedTilesCount((prevCount) => prevCount + 1)
      if (checkWin(newBoard)) {
        setGameOver(true)
        setRoundResults((prevResults) => [
          ...prevResults,
          {
            round: roundResults.length + 1,
            timesDied: numDeaths,
            timesClicked: newTimesClicked,
            rows,
            cols,
            bombs,
            betSize,
          },
        ])
        toast(`Congratulations, you won!`)
      }
    }
  }

  const handleSetRows = (value: number) => {
    if ([3, 5, 7, 9].includes(value)) {
      setRows(value)
    }
  }

  const handleSetCols = (value: number) => {
    if ([3, 5, 7, 9].includes(value)) {
      setCols(value)
    }
  }

  const handleCellMouseDown = (row: number, col: number) => {
    if (gameOver) {
      return
    }
    setToggleHoldMouse(true)
    if (!toggleHoldMouse) {
      toast(`Holding mouse on ${row} ${col}`)
    }
  }

  const handleMouseUp = () => {
    setToggleHoldMouse(false)
  }

  const handleCellMouseEnter = (row: number, col: number) => {
    if (gameOver || !toggleHoldMouse) {
      return
    }
    setTimeout(() => {
      handleCellClick(row, col)
    }, HOLD_MOUSE_DELAY)
  }

  const toggleHoldMouseClick = () => {
    setToggleHoldMouse((prevToggleHoldMouse) => !prevToggleHoldMouse)
  }

  return (
    <>
      <div className="flex gap-2">
        <div className="flex gap-2 flex-col w-max-4/6  p-10">
          <SelectMode />
          <BalanceBetSize />
          <BalanceDisplay balance={amount} profitLoss={0} />
          <BetSize betSize={betSize} setBetSize={setBetSize} />
          <ToggleHoldMouse
            toggleHoldMouse={toggleHoldMouse}
            toggleHoldMouseClick={toggleHoldMouseClick}
          />
          <FreezeGame
            freezeGame={freezeGame}
            freezeGameClick={freezeGameClick}
          />
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
          <StartGame
            gameStarted={gameStarted}
            gameOver={gameOver}
            profitTaken={profitTaken}
            startGame={startGame}
            takeProfit={takeProfit}
            startNewGame={startNewGame}
          />
        </div>
        {gameStarted && (
          <GameShell title="Minesweeper">
            <div className="flex">
              <div className="center items-start">
                <div
                  className={`grid ${rows === 3 && cols === 3 ? "grid-cols-3" : "grid-cols-5"} gap-1 w-max place-items-center w-max-[900px]`}
                >
                  {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`border border-gray-100 h-32 w-32 flex items-center justify-center cursor-pointer text-lg font-semibold
                                                        ${cell.isRevealed ? "flex bg-emerald-600" : ""}
                                                        ${cell.isRevealed && cell.isBomb ? "bg-red-500" : ""}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        onMouseDown={() =>
                          handleCellMouseDown(rowIndex, colIndex)
                        }
                        onMouseUp={handleMouseUp}
                        onMouseEnter={() =>
                          handleCellMouseEnter(rowIndex, colIndex)
                        }
                      >
                        <span className="scale-175">
                          {cell.isRevealed && cell.isBomb ? "💣" : ""}
                        </span>
                        <span className="scale-175">
                          {cell.isRevealed && !cell.isBomb ? "💎" : ""}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </GameShell>
        )}
        {/* <div className="w-2/6">
          <ResultsSidebar
            reset={clearAll}
            timesDied={numDeaths}
            roundResults={roundResults}
          />
        </div> */}
      </div>
    </>
  )
}

export default Minesweeper

function ResultsSidebar({ reset, roundResults }: ResultsSidebarProps) {
  const sessionStatistics = () => {
    const totalDeaths = roundResults.filter(
      (result) => result.timesDied > 0
    ).length
    const totalWins = roundResults.filter(
      (result) => result.timesDied === 0
    ).length
    const totalRounds = roundResults.length
    const winPercentage = totalRounds > 0 ? (totalWins / totalRounds) * 100 : 0
    const averageClicksPerRound =
      roundResults.reduce((acc, result) => acc + result.timesClicked, 0) /
      totalRounds
    return (
      <Table>
        <TableHeader className="mt-4 border-b" style={{ width: "100%" }}>
          <TableCell>Result</TableCell>
          <TableCell>Round</TableCell>
          <TableCell>Clicks</TableCell>
          <TableCell>Rows/Cols</TableCell>
          <TableCell>Bombs</TableCell>
          <TableCell>Bet size</TableCell>
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
              <TableCell>{result.timesClicked}</TableCell>
              <TableCell>
                {result.rows} x {result.cols}
              </TableCell>
              <TableCell>{result.bombs}</TableCell>
              <TableCell>{result.betSize}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableCell colSpan={2}>
            <div className="flex flex-col gap-0">
              Total Deaths: {totalDeaths}
              Total Wins: {totalWins}
            </div>
          </TableCell>
          <TableCell colSpan={2}></TableCell>
          <TableCell colSpan={2}>
            Win Percentage: {winPercentage.toFixed(2)}%
          </TableCell>
          <TableCell colSpan={2}>
            Your average click is on the {averageClicksPerRound}th click
          </TableCell>
        </TableFooter>
      </Table>
    )
  }

  const globalStatistics = () => {
    return (
      <>
        <TableHeader className="mt-4 border-b">
          <h2>Todo store data</h2>
          <TableCell>Round</TableCell>
          <TableCell>Times Died</TableCell>
          <TableCell>Times Clicked</TableCell>
          <TableCell>Rows</TableCell>
          <TableCell>Columns</TableCell>
          <TableCell>Bombs</TableCell>
          <TableCell>Result</TableCell>
          <TableCell>Bet size</TableCell> {/* Add this line */}
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
              <TableCell>{result.betSize}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </>
    )
  }

  return (
    <Wrapper>
      <StatisticTabs
        triggerOne="Session statistics"
        triggerTwo="Global Statistics"
        contentTwo={globalStatistics()}
        contentOne={
          <Table>
            <ResetIcon
              height={30}
              width={30}
              className="absolute top-12 right-4"
              onClick={reset}
            />
            {sessionStatistics()}
          </Table>
        }
      />
    </Wrapper>
  )
}
