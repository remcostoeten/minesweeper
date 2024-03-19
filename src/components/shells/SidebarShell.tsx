import React from "react"

export default function SidebarShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <aside className="w-1/6 p-6 border-r border-[#22234b] space-y-6">
      {children}
    </aside>
  )
}
