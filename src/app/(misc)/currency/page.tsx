'use client';
import PlaceBetComponent from '@/components/game-logic/b';
import { useState } from 'react';

export default function page() {
    const [bet, setBet] = useState(0);
    return (
        <main className='p-10 text-xl'>
            <PlaceBetComponent bet={bet} setBet={setBet} />
         
        </main>
    )
}
