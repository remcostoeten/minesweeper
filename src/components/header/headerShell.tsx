
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { UserButton } from "@clerk/nextjs"
import DisplayBalance from "../game-logic/displayBalance"
import Block from "../Block"

export default function HeaderShell() {
  return (
    <Block padding="4" className='h-14 w-full bg-card justify-between items-center !flex-row ' as="header">
          <DisplayBalance/>
          <div className="flex items-center space-x-1">
              <UserButton/>
              <Select>
              <SelectTrigger id="language" className="border-none">
                <SelectValue placeholder=" EN  🇺🇸" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="en">EN 🇺🇸</SelectItem>
                <SelectItem value="es">ES 🇪🇸</SelectItem>
              </SelectContent>
            </Select>
          </div>
    </Block>
  )
}

function Dice1Icon(props) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <path d="M12 12h.01" />
    </svg>
  )
}


function GoalIcon(props) {
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
      <path d="M12 13V2l8 4-8 4" />
      <path d="M20.55 10.23A9 9 0 1 1 8 4.94" />
      <path d="M8 10a5 5 0 1 0 8.9 2.02" />
    </svg>
  )
}


function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
