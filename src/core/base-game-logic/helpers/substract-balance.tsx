// subtract-balance.tsx
"use client"

import { useMutation, useQuery } from "convex/react"

import { api } from "../../../../convex/_generated/api"

export default function SubtractBalance() {
  const getBalance = useQuery(api.balance.get)
  const setBalance = useMutation(api.balance.setBalance)
  const balance = getBalance?.[getBalance.length - 1]?.setBalance.toFixed(2)

  const subtractFromBalance = async (amount: number) => {
    try {
      const newBalance = balance - amount
      await setBalance({ balance: newBalance }) // change 'amount' to 'balance'
      console.log(`New balance: ${newBalance}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <p>{balance}</p>
      <button onClick={() => subtractFromBalance(1)}>
        Subtract 1 from balance
      </button>
    </div>
  )
}
