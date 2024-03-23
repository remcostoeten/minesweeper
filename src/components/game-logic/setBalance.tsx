/* eslint-disable */
//
"use client"

import React, { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"

export default function setBalance() {
  const createFileMutation = useMutation(api.balance.setBalance)
  const [balance, setBalance] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const name = formData.get("name") as string
    await createFileMutation({
      name: name,
    })
  }

  const form = (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input name="name" type="text" />
      </label>
      <button type="submit">Submit</button>
    </form>
  )

  return (
    <div>
      {form}
    </div>
  )
}