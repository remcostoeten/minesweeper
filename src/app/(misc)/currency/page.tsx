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
            <SubstractFromBalance />
        </main>
    )
}
