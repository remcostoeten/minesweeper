"use client"

import { useCallback, useState } from "react"

const useGameLogic = () => {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [profitTaken, setProfitTaken] = useState(false)

  const startGame = useCallback(() => {
    setGameStarted(true)
    setGameOver(false)
    setProfitTaken(false)
  }, [])

  const endGame = useCallback(() => {
    setGameOver(true)
  }, [])

  const takeProfit = useCallback(() => {
    setProfitTaken(true)
  }, [])

  const startNewGame = useCallback(() => {
    setGameStarted(false)
    setGameOver(false)
    setProfitTaken(false)
  }, [])

  return {
    gameStarted,
    gameOver,
    profitTaken,
    startGame,
    takeProfit,
    startNewGame,
    endGame,
  }
}

export default useGameLogic
