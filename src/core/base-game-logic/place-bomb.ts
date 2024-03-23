import { Cell } from "../types"

export const placeBombs = (board: Cell[][], bombs: number): Cell[][] => {
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
