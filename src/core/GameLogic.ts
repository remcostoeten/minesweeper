'use client';
import { useReducer } from 'react';
import { Cell } from './types';

export  interface State {
    gridSize: number;
    mines: number;
    roundsPlayed: number;
    deaths: number;
    openedCells: number;
    gameState: string;
    grid: Cell[][];
}

interface Action {
    type: string;
    payload?: any;
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_GRID_SIZE':
            return { ...state, gridSize: action.payload };
        case 'SET_MINES':
            return { ...state, mines: action.payload };
        case 'SET_GAME_STATE':
            return { ...state, gameState: action.payload };
        case 'SET_OPENED_CELLS':
            return { ...state, openedCells: action.payload };
        case 'INCREMENT_DEATHS':
            return { ...state, deaths: state.deaths + 1 };
        case 'INCREMENT_ROUNDS_PLAYED':
            return { ...state, roundsPlayed: state.roundsPlayed + 1 };
        case 'SET_BALANCE':
            return { ...state, balance: action.payload };
        case 'SET_BET_SIZE':
            return { ...state, betSize: action.payload };
        default:
            return state;
    }
}

export function GameLogic() {
    const [state, dispatch] = useReducer(reducer, {
        gridSize: 5,
        mines: 3,
        gameState: 'idle',
        openedCells: 0,
        deaths: 0,
        roundsPlayed: 0,
        balance: 100,
        betSize: 10,
    });

    const handleCellClick = (row: number, col: number) => {
        // Deduct bet size from balance
        dispatch({ type: 'SET_BALANCE', payload: state.balance - state.betSize });

        // If the cell is a mine, the game is lost
        if (state.grid[row][col].isMine) {
            dispatch({ type: 'SET_GAME_STATE', payload: 'lose' });
            dispatch({ type: 'INCREMENT_DEATHS' });
        } else {
            // If the cell is not a mine, open the cell
            dispatch({ type: 'SET_OPENED_CELLS', payload: state.openedCells + 1 });

            // Check win condition
            if (state.openedCells + 1 === state.gridSize * state.gridSize - state.mines) {
                dispatch({ type: 'SET_GAME_STATE', payload: 'win' });
                dispatch({ type: 'SET_BALANCE', payload: state.balance + state.betSize * 2 });
            }
        }

        dispatch({ type: 'INCREMENT_ROUNDS_PLAYED' });
    };

    return { state, dispatch, handleCellClick };
}

export type Dispatch = (action: Action) => void;