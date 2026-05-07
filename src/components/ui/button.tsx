import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_14px_40px_rgba(59,130,246,0.28)] hover:bg-primary/90",
        secondary:
          "border border-white/10 bg-white/8 text-foreground hover:bg-white/12",
        ghost: "text-muted-foreground hover:bg-white/8 hover:text-foreground",
        danger:
          "bg-destructive text-destructive-foreground shadow-[0_14px_40px_rgba(239,68,68,0.25)] hover:bg-destructive/90",
        success:
          "bg-speak-green text-speak-navy shadow-[0_14px_40px_rgba(16,185,129,0.25)] hover:bg-speak-green/90",
        outline:
          "border border-primary/35 bg-primary/5 text-primary hover:bg-primary/12",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-13 rounded-xl px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
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
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
