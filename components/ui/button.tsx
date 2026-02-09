import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-[transform,box-shadow,color,background-color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden min-w-0 max-w-full",
  {
    variants: {
      variant: {
        default: "silver-3d-button text-black hover:scale-[1.02] font-bold uppercase tracking-wide",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl hover:scale-[1.02]",
        outline: "border-2 border-silver/50 bg-black/65 hover:bg-black/75 hover:border-silver text-silver transition-colors font-semibold",
        secondary: "border-2 border-silver/30 bg-[#1F1F1F]/80 hover:bg-[#1F1F1F] text-white hover:text-silver shadow-md hover:shadow-lg hover:scale-[1.02] transition-[transform,box-shadow]",
        ghost: "hover:bg-black/50 hover:text-silver transition-colors",
        link: "text-silver underline-offset-4 hover:underline hover:text-silver-light transition-colors",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-xl px-3",
        lg: "h-11 rounded-2xl px-8",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

