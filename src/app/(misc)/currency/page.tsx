'use client';
import PlaceBetComponent from '@/components/game-logic/b';
import { SubstractFromBalance } from '@/core/base-game-logic/helpers/substract-from-balance';
import { useState } from 'react';

export default function page() {
    const { balance, subtractFromBalance, amount, setAmount } = SubstractFromBalance()
    const [bet, setBet] = useState(0);
    return (
        <main className='p-10 text-xl'>
            <PlaceBetComponent bet={bet} setBet={setBet} />
            <div>
      <p>{balance}</p>
      <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      <button onClick={subtractFromBalance}>Subtract from balance</button>
    </div>
        </main>
    )
}
