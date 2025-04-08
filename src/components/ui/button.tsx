import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { ButtonHTMLAttributes, ComponentProps, forwardRef } from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-b-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-b-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-s-brand-primary text-t-invert dark:text-t-primary hover:bg-s-brand-primary-hover',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-b-primary bg-s-primary hover:bg-s-primary-accent hover:text-primary',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export interface LinkButtonProps extends ComponentProps<typeof Link>, VariantProps<typeof buttonVariants> {}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(({ className, variant, size, ...props }, ref) => {
  return (
    <Button
      className={cn(buttonVariants({ variant, size, className }))}
      asChild
    >
      <Link
        ref={ref}
        {...props}
      />
    </Button>
  )
})
LinkButton.displayName = 'LinkButton'

export { Button, buttonVariants, LinkButton }
