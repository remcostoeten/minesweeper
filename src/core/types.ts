export  type ResultsSidebarProps = {
    reset: () => void;
    timesDied: number;
    roundResults: Array<{
        round: number;
        timesDied: number;
        timesClicked: number;
        rows: number;
        cols: number;
        bombs: number;
        betSize: number;
    }>;
};

export type ResponsiveProps = {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };

  export type Cell = {
    isBomb: boolean;
    isRevealed: boolean;
}
