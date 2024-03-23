import { Cell } from "../types";

export const initializeBoard = (rows: number, cols: number): Cell[][] => {
  const board: Cell[][] = [];
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i][j] = { isBomb: false, isRevealed: false };
    }
  }
  return board;
};