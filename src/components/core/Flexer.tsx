import React from "react"

type Direction = "row" | "row-reverse" | "col" | "column-reverse"

type FlexProps = {
  dir?: Direction
  direction?: Direction
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly"
  align?: "stretch" | "start" | "end" | "center" | "baseline"
  wrap?: "nowrap" | "wrap" | "wrap-reverse"
  gap?: string
  mb?: string
  children: React.ReactNode
  className?: string
  width?: string
  height?: string
  mt?: string
}

export default function Flexer({
  width = "w-full",
  height = "h-full",
  direction = "row",
  justify = "start",
  align = "stretch",
  wrap = "nowrap",
  gap = "0",
  mb = "0",
  mt = "0",
  children,
  className = "",
  ...rest
}: FlexProps) {
  return (
    <div
      className={`flex ${width} mt-${mt} mb-${mb} flex-${direction} gap-${gap} h-${height}  justify-${justify} items-${align} flex-${wrap} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
