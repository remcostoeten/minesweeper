export const revealAll = (board: Array<Array<any>>) => {
    const newBoard: Array<Array<any>> = [...board];
    for (let i = 0; i < newBoard.length; i++) {
        for (let j = 0; j < newBoard[0].length; j++) {
            newBoard[i][j].isRevealed = true;
        }
    }
    return newBoard;
};