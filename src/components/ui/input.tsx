import * as React from "react";
import { cn } from "@/core/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const ShadInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
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
    );
  }
);

const Input = ({ style, type = 'text', placeholder, value, ...rest }: InputProps) => (
  <input
    className="bg-transparent w-fit border-outline text-white h-10 text-center w-12 outline-none"
    type={type}
    value={value}
    placeholder={placeholder}
    style={style}
    {...rest}
  />
);

export { ShadInput, Input };
