
export default function BetSize({ betSize, setBetSize }: { betSize: number; setBetSize: (value: number) => void }) {
    return (
        <div>
            <h4>Bet Size</h4>
            <input value={betSize} onChange={(e: { target: { value: any; }; }) => setBetSize(Number(e.target.value))} />
            <p>Current bet size: {betSize}</p>
        </div>
    );
}
