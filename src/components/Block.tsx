import React from 'react'

type BlockProps = {
    padding?: string;
    bg?: string;
    margin?: string;
    width?: string;
    className?: string;
    children: React.ReactNode;
};

export default function Block({ padding = '6', children, bg = 'card', margin = 'm-4', width, className, ...rest }: BlockProps) {
    return (
        <div className={`p-${padding} rounded-md border-outline bg-${bg} w-${width} h-screen ${margin} ${className}`} {...rest}>
            {children}
        </div>
    )
}
