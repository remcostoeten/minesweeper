'use client';
import useCurrentTime from '../../core/timeOfDay';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function TopBarShell() {
    const currentTime = useCurrentTime();

    return (
        <header className="p-6 border-b border-[#22234b] flex justify-between items-center">
            <h1 className="text-2xl font-bold">Minesweeper by Remco Stoeten</h1>
            <div className="flex items-center space-x-4">
                <span className="font-medium">{currentTime}</span>
                <Link href='https://github.com/remcostoeten/minesweeper' target='_blank' className="font-bold"><GitHubLogoIcon fontSize={20} width={20} height={20} /></Link>
            </div>
        </header>
    );
}
