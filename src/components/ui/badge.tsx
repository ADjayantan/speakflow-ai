import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary/25 bg-primary/12 text-primary",
        success: "border-speak-green/25 bg-speak-green/12 text-speak-green",
        warning: "border-speak-amber/25 bg-speak-amber/12 text-speak-amber",
        danger: "border-speak-red/25 bg-speak-red/12 text-speak-red",
        violet: "border-speak-violet/25 bg-speak-violet/12 text-speak-violet",
        muted: "border-white/10 bg-white/8 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
