export default function Balance({ baseBalance }: { baseBalance: number }) {
    return (
        <div>
            <h4>Balance</h4>
            <p>Current balance: {baseBalance}</p>
        </div>
    );
}