import * as React from "react"
import { forwardRef } from "react"
import { cn } from "@/core/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const ShadInput = forwardRef<HTMLInputElement, InputProps>(function ShadInput(
  { className, type, ...props },
  ref
) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

ShadInput.displayName = "ShadInput"

const Input = function Input({
  style,
  type = "text",
  placeholder,
  value,
  center = true,
  ...rest
}: InputProps & { center?: boolean }) {

  const inputClassName = cn(
    "bg-transparent w-full border-outline text-white h-10 outline-none text-text",
    center ? "text-center" : ""
  );

  return (
    <input
      className={inputClassName}
      type={type}
      value={value}
      placeholder={placeholder}
      style={style}
      {...rest}
    />
  )
}


Input.displayName = "Input"

export { ShadInput, Input }
