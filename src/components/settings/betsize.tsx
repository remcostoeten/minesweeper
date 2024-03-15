'use client';
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button, Input } from "../ui";

const CustomButton = ({ className, children }) => (
    <Button className={`bg-transparent hover:bg-black/20 text-text border-outline ${className}`}>{children}</Button>
);

export default function BetSize(): JSX.Element {
    const createBetsizeMutation = useMutation(api.balance.setBalance)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        // Access the form data
        const formData = new FormData(event.target as HTMLFormElement)
        const name = formData.get('name') as string

        // Perform any necessary data processing or validation

        // Submit the data
        await createBetsizeMutation({
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
        <>
            <div>
                {form}
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="relative w-full">
                    <input placeholder="Your bet" className="bg-transparent w-full focus:border-outline/20 p-4 placeholder::text-red-400/40 border-outline h-10" />
                    <div className="flex space-x-1 absolute top-1/2 right-2 transform -translate-y-1/2">
                        <CustomButton className="text-xs h-6 px-2">1/2</CustomButton>
                        <CustomButton className="text-xs h-6 px-2">2x</CustomButton>
                        <CustomButton className="text-xs h-6 px-2">MAX</CustomButton>
                    </div>
                </div>
            </div><div className="grid grid-cols-4 gap-1">
                <CustomButton className="h-6 text-xs py-0" style={{ backgroundColor: 'red' }}>+10%</CustomButton>
                <CustomButton className="h-6 text-xs py-0" style={{ backgroundColor: 'green' }}>+50%</CustomButton>
                <CustomButton className="h-6 text-xs py-0" style={{ backgroundColor: 'blue' }}>+100%</CustomButton>
                <CustomButton className="h-6 text-xs py-0" style={{ backgroundColor: 'yellow' }}>+1000%</CustomButton>
            </div></>
        </div >
    );
}