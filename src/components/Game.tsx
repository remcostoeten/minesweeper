import { Button, Input } from '@/components/ui';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dispatch, GameLogic, State} from '@/core/GameLogic';
import { Cell } from '@/core/types';
import { toast } from 'sonner';
import Wrapper from './shells/Wrapper';

interface GameUIProps {
    state: State;
    dispatch: Dispatch;
    handleCellClick: (row: number, col: number) => void;
}

const CELL_SIZE = 60;

export function GameUI({ handleCellClick }: GameUIProps) {
    const { state, dispatch } = GameLogic();
    const renderCell = (cell: Cell, row: number, col: number) => {
        let content;
        if (cell.revealed) {
            if (cell.value === '') {
                content = '💣';
            } else {
                content = '💎';
            }
        } else {
            content = '';
        }
        return (
            <button
                key={`${row}-${col}`}
                className="border border-black/50  text-center  bg-slate-600  cursor-pointer"
                style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                }}
                onClick={() => handleCellClick(row, col)}
                disabled={state.gameState === 'lose'}
            >
                {content}
            </button>
        );
    };

    return (
        <div className="flex">
            <Wrapper className='w-[20%]flex flex-col gap-2'>
                <Input
                type="number"
                id="gridSize"
                value={state?.gridSize}
                onChange={(event: { target: { value: string } }) => dispatch({ type: 'SET_GRID_SIZE', payload: parseInt(event.target.value) })}
                min="3"
                max="30"
              />
                <Input
                    type="number"
                    id="mines"
                    value={state.mines}
                    onChange={(event) => dispatch({ type: 'SET_MINES', payload: parseInt(event.target.value) })}
                    min="1"
                    max={(state.gridSize * state.gridSize) - 1}
                />

                <Table>
                    <TableCaption>Statistics</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Rounds played total</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>{state.roundsPlayed}</TableCell>
                            <TableCell className="text-right"></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <br />
                {state.gameState !== 'idle' && (
                    <div>
                        <p>Deaths: {state.deaths}</p>
                        <p>Opened: {state.openedCells}</p>
                    </div>
                )}
                {state.gameState === 'lose' && toast('You Lose!')}
                {state.gameState === 'win' && toast('You Win!')}
            </Wrapper>
            <Button
                className='align-self-end w'
                variant="secondary"
                onClick={() => dispatch({ type: 'INITIALIZE_GAME' })}
            >
                Start New Game
            </Button>
        </div>
    );
}