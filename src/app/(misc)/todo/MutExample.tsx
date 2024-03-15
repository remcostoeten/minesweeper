import { useMutation } from 'convex/react'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { createFile } from '@/core/mutations/demo'

export default function MutExample() {
    const createFileMutation = useMutation(api.balance.setBalance)
    const [name, setName] = React.useState('')

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
            <button onClick={handleClick}>create file</button>
        </div>
    )
}
