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