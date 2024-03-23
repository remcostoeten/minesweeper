import React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { HomeIcon } from "@radix-ui/react-icons"

type MenuItemProps = {
  icon: string | JSX.Element
  label: string
  href: string
}

const getCurrentUrl = (pathname: string) => {
  return pathname
}

const MenuItem = ({ icon, label, href }: MenuItemProps) => {
  const pathname = usePathname()
  const isActive = getCurrentUrl(pathname) === href

  const linkClasses = `flex gap-3 py-2 mt-2 text-sm whitespace-nowrap rounded-xl cursor-pointer ${isActive ? "text-white" : "text-text"}`

  return (
    <Link href={href} passHref className={`${linkClasses}`}>
      {typeof icon === "string" ? (
        <Image
          src={icon}
          alt={label}
          width={24}
          height={24}
          className="shrink-0"
        />
      ) : (
        <span className="flex items-center gap-2">
          <HomeIcon />
          {label}
        </span>
      )}
    </Link>
  )
}

const Sidebar = () => {
  const menuItems: MenuItemProps[] = [
    {
      icon: <HomeIcon />,
      label: "Home",
      href: "/",
    },
    {
      label: "Theme ui",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          viewBox="0 0 100 125"
        >
          {/* SVG path */}
        </svg>
      ),
      href: "/color-palette",
    },
  ]

  return (
    <aside className="flex flex-col justify-between p-4 text-base font-medium leading-6 text-white bg-card max-w-[307px] border-outline">
      <UserButton />
      <nav className="mt-4">
        {menuItems.map((item) => (
          <MenuItem key={item.label} {...item} />
        ))}
      </nav>
      <button className="flex justify-center items-center px-16 py-2.5 mt-20 text-sm font-bold tracking-wide whitespace-nowrap bg-emerald-600 rounded-xl">
        Deposit
      </button>
      <footer className="mt-4">
        {menuItems.map((item) => (
          <MenuItem key={item.label} {...item} />
        ))}
      </footer>
    </aside>
  )
}

export default Sidebar
