"use client"

import { useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { toast } from "sonner"

import { api } from "../../convex/_generated/api"

export function useBalance() {
  const balance = useQuery(api.balance.get)
  const latestBalance = balance?.[balance?.length - 1]
  const setBalanceMutation = useMutation(api.balance.setBalance)
  const [currentBalance, setCurrentBalance] = useState(latestBalance)

  const handleChange = (event) => {
    const newBalance = parseFloat(event.target.value)
    setCurrentBalance(newBalance)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await setBalanceMutation({
      balance: currentBalance,
    })
    toast(`Balance updated to ${currentBalance}`)
  }

  return {
    balance: balance?.[balance?.length - 1],
    handleChange,
    handleSubmit,
  }
}

export const walletAmount = () => {
  const { balance } = useBalance()

  const walletAmount = balance?.setBalance

  return {
    walletAmount,
  }
}
