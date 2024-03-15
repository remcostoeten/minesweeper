   "use client"
import { useMutation } from 'convex/react'
import React, { useState } from 'react'
export default function setBalance() {
    const createFileMutation = useMutation(api.balance.setBalance)
    const [balance, setBalance] = useState('')

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        // Access the form data
        const formData = new FormData(event.target as HTMLFormElement)
        const name = formData.get('name') as string

        // Perform any necessary data processing or validation

        // Submit the data
        await createFileMutation({
            name: name,
        })
    }

    const form = (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input name='name' type="text" />
            </label>
            <button type="submit">Submit</button>
        </form>
    )

    return (
        <div>
            {form}
            {/* <button onClick={handleClick}>create file</button> */}
        </div>
    )
}
