"use client"
import React, { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '../ui';

export default function DisplayBalance() {
    const balance = useQuery(api.balance.get);
    const setBalanceMutation = useMutation(api.balance.setBalance);
    const [currentBalance, setCurrentBalance] = useState(balance?.[0]?.balance || 0);

    const handleChange = (event) => {
        const newBalance = parseFloat(event.target.value);
        setCurrentBalance(newBalance);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await setBalanceMutation({
            balance: currentBalance,
        });

    };

    // TODO
    // Make it actually update



    const form = (
        <form className='flex' onSubmit={handleSubmit}>
            <input
                placeholder={`€ ${balance?.[0]?.setBalance.toFixed(2)}`}
                className='bg-card border-outline px-3 w-[150px] text-center h-9 rounded-md'
                name='balance'
                type="text"
                onChange={handleChange}
            />
            {balance?.[0]?.balance === 0 ? (
                <Button type='submit' className="bg-main text-white py-2 px-4 rounded">Deposit</Button>
            ) : (
                <Button type='submit' className="bg-main text-white py-2 px-4 rounded">Update</Button>
            )}
        </form>
    );

    return (
        <>
            {form}
        </>
    );
}
