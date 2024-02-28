import React from 'react'

type SidebarProps  = {
    children: React.ReactNode;
    className: string;
}


export default function SidebarShell({children, className}: SidebarProps) {
    return (
        <aside className={className + " w-1/6 p-6 border-r border-[#22234b] space-y-6 prfsop"}>
        {children}</aside>
    )
}
