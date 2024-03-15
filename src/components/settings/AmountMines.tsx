import { Button } from "@/components/ui/button";
import Wrapper from "./SettingWrapper";
type AmountMinesProps = {
  label: string;
  value: number;
  onPlus: () => void;
  onMinus: () => void;
};

export default function AmountMines({ value, onPlus, onMinus }: AmountMinesProps) {
  return (
    <Wrapper title='Amount of mines'>
      <div className="flex items-center justify-between border-outline p-2 rounded-md">
        <span>💣</span>
        <input
          className="bg-transparent text-white text-center w-12 outline-none"
          id="mines"
          type="text"
          value={value}
          placeholder="3"
        />
        <div className='flex gap-2 items-center'>
          <Button className="bg-[#5c2b92] text-white rounded-md px-2 py-1" onClick={onPlus}>
            <PlusIcon className="text-white" />
          </Button>
          <Button className="text-text bg-transparent border-outline rounded-md px-2 py-1" onClick={onMinus}>
            <MinusIcon className="text-white" />
          </Button>
        </div>
      </div>
    </Wrapper>
  )
}

function MinusIcon(props) {
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
      <path d="M5 12h14" />
    </svg>
  )
}


function MouseIcon(props) {
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
      <rect x="5" y="2" width="14" height="20" rx="7" />
      <path d="M12 6v4" />
    </svg>
  )
}


function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
