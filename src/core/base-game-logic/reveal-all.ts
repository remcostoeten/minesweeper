"use client"

import { useState } from "react"

import { Cell } from "../types"

const useRevealAll = (initialBoard: Cell[][]) => {
  const [board, setBoard] = useState(initialBoard)

  const revealAll = () => {
    const newBoard = board.map((row) =>
      row.map((cell) => ({
        ...cell,
        isRevealed: true,
      }))
    )
    setBoard(newBoard)
  }

  return { board, setBoard, revealAll }
}

export default useRevealAll
