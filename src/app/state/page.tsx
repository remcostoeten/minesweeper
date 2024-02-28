'use client';
import { useEffect } from 'react';
import { GameLogic } from '@/core/GameLogic';
import { GameUI } from '@/components/Game';

function Minesweeper() {
  const { state, dispatch, handleCellClick } = GameLogic();

  useEffect(() => {
    dispatch({ type: 'INITIALIZE_GAME' });
  }, []);

  return <GameUI state={state} dispatch={dispatch} handleCellClick={handleCellClick} />;
}

export default Minesweeper;