import React from 'react'

export default function GameShell({children, title}: {children: React.ReactNode, title: string}) {
    return (
            <main className="flex justify-start flex-col">
                <h2 className="text-4xl font-bold ml-1/6">{title}</h2>
                {children}
        </main>
    )
}
