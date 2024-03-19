"use client"

import React from "react"
import { useBalance } from "@/core/useBalance"

import { Button } from "../ui"

export default function DisplayBalance() {
  const { balance, handleChange, handleSubmit } = useBalance()

  const form = (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        placeholder={`€ ${balance?.setBalance.toFixed(2)}`}
        className="bg-card border-outline px-3 w-[150px] text-center h-9 rounded-md"
        name="balance"
        type="text"
        onChange={handleChange}
      />
      {balance?.balance === 0 ? (
        <Button type="submit" className="bg-main text-white py-2 px-4 rounded">
          Deposit
        </Button>
      ) : (
        <Button type="submit" className="bg-main text-white py-2 px-4 rounded">
          Update
        </Button>
      )}
    </form>
  )

  return <>{form}</>
}
