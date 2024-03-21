import React from "react"

type FlexProps = {
  direction?: "row" | "row-reverse" | "column" | "column-reverse"
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "between"
    | "around"
    | "evenly"
  align?: "stretch" | "start" | "end" | "center" | "baseline"
  wrap?: "nowrap" | "wrap" | "wrap-reverse"
  gap?: string
  mb?: string
  children: React.ReactNode
  className?: string
  width?: string
  height?: string
}

export default function Flexer({
  width = "w-full",
  height,
  direction = "row",
  justify = "flex-start",
  align = "stretch",
  wrap = "nowrap",
  gap = "0",
  mb = "0",
  children,
  className = "",
  ...rest
}: FlexProps) {
  return (
    <div
      className={`flex ${width} mb-${mb} flex-${direction} gap-${gap} h-${height}  justify-${justify} items-${align} flex-${wrap} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
