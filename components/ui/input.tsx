import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/* Cream-canvas defaults. Every form in the app is on `Section variant="cream"`,
   so the base now leans into the bone-paper / ink palette. Each form still
   passes its own className (FIELD_CLASS) for consistency — these defaults are
   a safety net so an Input never falls back to invisible dark-form styling. */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-bone-hairline bg-bone-paper px-4 py-2.5 text-base sm:text-sm text-ink placeholder:text-ink-muted/60 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:border-sandstone-dark focus-visible:ring-1 focus-visible:ring-sandstone-dark/20 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
