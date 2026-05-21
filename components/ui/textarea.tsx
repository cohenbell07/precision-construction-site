import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/* Cream-canvas defaults — see components/ui/input.tsx for rationale. */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-md border border-bone-hairline bg-bone-paper px-4 py-3 text-base sm:text-sm text-ink placeholder:text-ink-muted/60 transition-colors focus-visible:outline-none focus-visible:border-sandstone-dark focus-visible:ring-1 focus-visible:ring-sandstone-dark/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
