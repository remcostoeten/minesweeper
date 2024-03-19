"use client"

import { useState } from "react"

const useRevealAll = (initialBoard) => {
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
