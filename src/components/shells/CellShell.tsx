'use client';

interface CellProps {
  isMine: boolean;
  isRevealed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Cell: React.FC<CellProps> = ({ isMine, isRevealed, onClick }) => (
  <button onClick={onClick}>
    {isRevealed ? (isMine ?  '💣' : '') : '💎'}
  </button>
);

export default Cell;
