import React from "react"

type FlexProps = {
  direction?: "row" | "row-reverse" | "column" | "column-reverse"
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
  align?: "stretch" | "flex-start" | "flex-end" | "center" | "baseline"
  wrap?: "nowrap" | "wrap" | "wrap-reverse"
  gap?: string
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
  children,
  className = "",
  ...rest
}: FlexProps) {
  return (
    <div
      className={`flex ${width} ${direction}  gap-${gap} h-${height}  ${justify} ${align} ${wrap} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
