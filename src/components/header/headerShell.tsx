
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { UserButton } from "@clerk/nextjs"

export default function HeaderShell() {
  return (
    <header className="">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-4">
          <Button className="bg-black text-white py-2 px-4 rounded flex items-center space-x-2">
            <Dice1Icon className="h-6 w-6 text-white" />
            <span>CASINO</span>
          </Button>
          <Button className="bg-black text-white py-2 px-4 rounded flex items-center space-x-2">
            <GoalIcon className="h-6 w-6 text-white" />
            <span>SPORTS</span>
          </Button>
          <div className="flex items-center bg-black text-white py-2 px-4 rounded">
            <SearchIcon className="h-6 w-6 text-white" />
            <Input
              className="bg-transparent border-none text-white placeholder-white focus:ring-0"
              placeholder="Search mine"
              type="search"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Select>
            <SelectTrigger className="bg-card border-outline" id="currency">
              <SelectValue placeholder="0.645688956" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="btc">BTC</SelectItem>
              <SelectItem value="eth">ETH</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-main text-white py-2 px-4 rounded">Deposit</Button>
          </div>
          <div className="flex items-center space-x-1">
              <UserButton/>
              <Select>
              <SelectTrigger id="language" className="border-none">
                <SelectValue placeholder=" EN " />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="en">EN 🇺🇸</SelectItem>
                <SelectItem value="es">ES 🇪🇸</SelectItem>
              </SelectContent>
            </Select>
          </div>
          </div>
    </header>
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
