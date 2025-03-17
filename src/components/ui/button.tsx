import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-[#540804] to-[#380303] text-[#E4D8B4] hover:from-[#6A1008] hover:to-[#480404] border border-[#513428] shadow-md",
        destructive: "bg-gradient-to-r from-[#AA3C3B] to-[#540804] text-[#E4D8B4] hover:from-[#D04A4A] hover:to-[#6A1008] border border-[#513428]",
        outline: "border border-[#513428] bg-background text-[#C09E6B] hover:bg-[#513428]/20 hover:text-[#E4D8B4]",
        secondary: "bg-[#2A1A17] text-[#C09E6B] hover:bg-[#3A2A27] hover:text-[#E4D8B4] border border-[#513428]",
        ghost: "text-[#C09E6B] hover:bg-[#513428]/20 hover:text-[#E4D8B4]",
        link: "text-[#AA3C3B] underline-offset-4 hover:underline",
        golden: "bg-gradient-to-b from-[#C09E6B] to-[#8B714C] text-[#1D1210] hover:from-[#E4D8B4] hover:to-[#C09E6B] border border-[#513428]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
