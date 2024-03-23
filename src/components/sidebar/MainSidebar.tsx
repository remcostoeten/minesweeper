import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { HomeIcon, IconJarLogoIcon } from "@radix-ui/react-icons"

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
      <span className="flex items-center gap-2 relative pl-8">
        <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {icon}
        </span>
        {label}
      </span>
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
      icon: <IconJarLogoIcon/>,
      label: "Logic",
      href: "/currency",
    },
    {
      label: "Theme ui",
      icon: (
        <svg
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          width={25}
          height={25}
          x="0"
          y="0"
          viewBox="0 0 100 125"
        >
          <path d="M87.779 47.809a36.15 36.15 0 00-4.271-16.986c.013-.195.037-.386.042-.583 0-5.012-1.931-8.713-3.634-11.978-1.872-3.587-2.911-5.813-2.051-8.572.137-.438.758-1.448-.751-3.368-1.509-1.921-3.098-.975-3.638-.696-3.83 1.979-6.901 4.803-9.257 7.975-4.66-1.885-9.604-2.84-14.728-2.84-21.112 0-38.288 16.62-38.288 37.048s17.176 37.048 38.288 37.048c2.779 0 11.235 0 11.235-8.229 0-3.892-3.063-5.69-5.3-7.003-2.406-1.412-3.385-2.146-3.385-3.74 0-1.075 0-4.345 4.488-4.345h6.701c.552 11.1 1.601 27.18 1.661 28.096a2.55 2.55 0 002.544 2.384h6.379a2.55 2.55 0 002.544-2.382c.062-.928 1.154-17.559 1.696-28.705 5.668-1.737 9.725-7.038 9.725-13.124zm-15.29-35.504c.187 3.106 1.6 5.814 2.905 8.317 1.502 2.879 3.056 5.856 3.056 9.547-.129 4.629-3.309 7.99-7.558 7.99-2.085 0-3.97-.782-5.308-2.203-1.523-1.618-2.239-3.971-2.069-6.803.28-4.633 2.929-12.074 8.974-16.848zm.711 36.56a7.593 7.593 0 01-2.306.371 7.62 7.62 0 01-2.834-.549c.076-2.301.207-4.273.32-5.672.814.159 1.655.242 2.514.242.681 0 1.341-.068 1.989-.169.113 1.413.245 3.401.317 5.777zM56.529 56.44c-4.423 0-9.588 2.474-9.588 9.445 0 4.672 3.553 6.758 5.904 8.138 2.121 1.245 2.782 1.767 2.782 2.605 0 1.467 0 3.129-6.135 3.129-18.3 0-33.188-14.332-33.188-31.948S31.191 15.86 49.49 15.86c4.164 0 8.185.734 11.995 2.162a30.357 30.357 0 00-1.694 4.07 8.221 8.221 0 00-4.545-1.367c-4.562 0-8.273 3.711-8.273 8.273 0 4.562 3.711 8.273 8.273 8.273A8.217 8.217 0 0059.6 36.02a12.26 12.26 0 002.271 3.43c.486.516 1.02.972 1.58 1.389a121.812 121.812 0 00-.556 11.571c0 .936.039 2.334.105 4.029h-6.471zm1.892-27.436a3.177 3.177 0 01-3.174 3.168c-1.75 0-3.173-1.424-3.173-3.173s1.424-3.173 3.173-3.173a3.177 3.177 0 013.174 3.171v.007zm11.405 57.915c-.428-6.71-1.617-25.71-1.804-32.907a12.786 12.786 0 005.205.107c-.193 7.371-1.374 26.143-1.802 32.8h-1.599zm8.466-31.601c.039-1.178.062-2.175.062-2.907 0-5.265-.345-9.445-.522-11.25a12.472 12.472 0 003.232-3.199 30.997 30.997 0 011.615 9.847c0 3.175-1.755 6.011-4.387 7.509zM28.86 44.351c-4.562 0-8.274 3.711-8.274 8.273 0 4.562 3.712 8.273 8.274 8.273s8.273-3.711 8.273-8.273c0-4.561-3.711-8.273-8.273-8.273zm0 11.447a3.177 3.177 0 01-3.174-3.173 3.177 3.177 0 013.174-3.173 3.177 3.177 0 013.173 3.173 3.177 3.177 0 01-3.173 3.173zm6.488-30.689c-4.562 0-8.273 3.711-8.273 8.273 0 4.562 3.711 8.273 8.273 8.273s8.273-3.711 8.273-8.273c.001-4.562-3.71-8.273-8.273-8.273zm0 11.447a3.177 3.177 0 01-3.173-3.173c0-1.75 1.424-3.173 3.173-3.173s3.173 1.424 3.173 3.173a3.176 3.176 0 01-3.173 3.173z"></path>
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
