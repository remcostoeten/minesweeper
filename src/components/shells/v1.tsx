'use client';
import { Badge, Button } from '@/components/ui/index'
import TopBarShell from './TopBarShell'
import SidebarShell from './SidebarShell'
import Minefield  from '@/components/Minefield'
import GridSizeShell from './GridSizeShell';
import AmountBombShell from './AmountBombhellProps';
import { useState } from 'react';
export default function Component() {
    const [numMines, setNumMines] = useState(5);
    const [gridSize, setGridSize] = useState(5);
    return (
        <div className="bg-[#0e0e2c] h-screen w-full flex flex-col text-white">
            <TopBarShell />
            <div className="flex flex-1">
            <AmountBombShell onBombAmountChange={setNumMines} />
      <GridSizeShell onGridSizeChange={setGridSize} />


            </div>

            <div>
                <h2 className="text-sm font-medium uppercase tracking-widest mb-2">Bet Amount</h2>
                <div className="flex items-center space-x-2">
                    <Button className="bg-[#1f1f38]">-</Button>
                    <input className="text-center w-24 bg-[#1f1f38] border-none" placeholder="£2.00" />
                    <Button className="bg-[#1f1f38]">+</Button>
                </div>
            </div>
            <Button className="bg-[#00f9ff]">Bet</Button>
            <div className="text-center">
                <span className="text-sm">Demo Balance</span>
                <p className="font-bold">£5,000.00</p>
            </div>
            <div className="flex justify-around">
                <FileAudioIcon className="text-white" />
                <MusicIcon className="text-white" />
                <InfoIcon className="text-white" />
            </div>

            <SidebarShell className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-4xl font-bold text-[#00f9ff]">MINES</h2>
                    <div className="flex items-center space-x-2">
                        <Badge variant="secondary">0.00x</Badge>
                        <Badge variant="default">1.1x</Badge>
                        <Badge variant="default">1.27x</Badge>
                        <Badge variant="default">1.46x</Badge>
                        <Badge variant="default">1.69x</Badge>
                        <BitcoinIcon className="text-yellow-400" />
                    </div>
                </div>
                <Minefield gridSize={gridSize} numMines={numMines} />
                              <div className="flex justify-center items-center flex-wrap bg-[#1f1f38] p-6"></div>
            </SidebarShell>
        </div>
    )
}

function BitcoinIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
        </svg>
    )
}


function FileAudioIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.5 22h.5c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7.5L14.5 2H6c-.5 0-1 .2-1.4.6C4.2 3 4 3.5 4 4v3" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M10 20v-1a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0Z" />
            <path d="M6 20v-1a2 2 0 1 0-4 0v1a2 2 0 1 0 4 0Z" />
            <path d="M2 19v-3a6 6 0 0 1 12 0v3" />
        </svg>
    )
}


function InfoIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    )
}


function MusicIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
        </svg>
    )
}
