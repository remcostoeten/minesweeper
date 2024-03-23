import { Button } from "."

export default function BetBtn({
  className,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <Button
      className={`bg-transparent hover:bg-black/20 text-text border-outline ${className}`}
      {...rest}
    >
      {children}
    </Button>
  )
}
