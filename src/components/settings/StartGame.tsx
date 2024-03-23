import React from "react"
import { ResetIcon } from "@radix-ui/react-icons"

import Flexer from "../core/Flexer"
import { Button } from "../ui"

type GameControlsProps = {
  gameStarted?: boolean
  gameOver?: boolean
  profitTaken?: boolean
  startGame?: () => void
  takeProfit?: () => void
  startNewGame?: () => void
}

export default function StartGame({
  gameStarted,
  gameOver,
  profitTaken,
  startGame,
  takeProfit,
  startNewGame,
}: GameControlsProps) {
  return (
    <Flexer>
      {!gameStarted && (
        <Button className="bg-main w-full" onClick={startGame}>
          Start Game
        </Button>
      )}
      {gameStarted && !gameOver && !profitTaken && (
        <Button onClick={takeProfit}>Take profit</Button>
      )}
      {(gameOver || profitTaken) && (
        <Button onClick={startNewGame}>
          <ResetIcon height={30} width={30} className="mr-2" />
          Start New Game
        </Button>
      )}
    </Flexer>
  )
}
