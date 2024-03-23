export const startGame = (setBoard, initializeBoard, placeBombs, rows, cols, bombs, setOpenedTilesCount, setTimesClicked, setGameOver, setGameStarted, setBaseBalance, betSize) => {
    const initializedBoard = initializeBoard(rows, cols); // Initialize the board first
    const boardWithBombs = placeBombs(initializedBoard, bombs); // Then place bombs on the initialized board
    setBoard(boardWithBombs); // Update the board state with the new board that includes bombs
    setOpenedTilesCount(0);
    setTimesClicked(0);
    setGameOver(false);
    setGameStarted(true);
    setBaseBalance((prevBalance) => prevBalance - betSize);
};
