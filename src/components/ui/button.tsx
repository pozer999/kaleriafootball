"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 
          "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/30 hover:scale-[1.02] active:bg-primary/95",
        outline: 
          "border-border bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground/20 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: 
          "border-secondary/20 bg-secondary text-secondary-foreground shadow-md shadow-secondary/20 hover:bg-secondary/90 hover:shadow-secondary/30 hover:scale-[1.02] active:bg-secondary/95",
        ghost: 
          "border-transparent bg-transparent hover:bg-accent hover:text-accent-foreground hover:shadow-sm dark:hover:bg-accent/50",
        destructive: 
          "border-destructive/20 bg-destructive text-destructive-foreground shadow-md shadow-destructive/20 hover:bg-destructive/90 hover:shadow-destructive/30 hover:scale-[1.02] active:bg-destructive/95",
        link: 
          "border-transparent bg-transparent text-primary underline-offset-4 hover:underline hover:bg-transparent hover:scale-100 shadow-none",
        gradient: 
          "border-transparent bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-500",
        "gradient-reverse": 
          "border-transparent bg-gradient-to-r from-secondary to-primary text-white shadow-lg shadow-secondary/25 hover:shadow-secondary/40 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-500",
      },
      size: {
        default: "h-10 gap-2 px-4 py-2",
        xs: "h-7 gap-1.5 px-2.5 py-1 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 gap-2 px-3 py-1.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-3 px-6 py-3 text-base [&_svg:not([class*='size-'])]:size-5",
        xl: "h-14 gap-4 px-8 py-4 text-lg [&_svg:not([class*='size-'])]:size-6",
        icon: "size-10 p-0",
        "icon-xs": "size-7 p-0 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-8 p-0 [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-12 p-0 [&_svg:not([class*='size-'])]:size-5",
        "icon-xl": "size-14 p-0 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({ 
  className, 
  variant = "default", 
  size = "default",
  asChild,
  ...props 
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }