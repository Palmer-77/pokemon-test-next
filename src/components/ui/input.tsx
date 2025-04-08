import { forwardRef, InputHTMLAttributes, ReactNode, useMemo } from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-b-primary bg-s-input px-3 py-2 text-sm ring-offset-b-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-t-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-b-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        'aria-[invalid=true]:border-b-alert',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export enum IconPosition {
  LEFT = 'left',
  RIGHT = 'right',
}

export interface InputWithIconProps extends InputProps {
  icon: React.ReactNode
  iconPosition?: IconPosition
  wrapperClassName?: string
}

const InputIconWrapper = ({ children, className }: { children?: ReactNode; className?: string }) => {
  return <span className={cn('absolute h-full flex items-center', className)}>{children}</span>
}

const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon, iconPosition = IconPosition.LEFT, wrapperClassName, className, ...props }, ref) => {
    const StartIcon = useMemo(() => {
      return iconPosition === IconPosition.LEFT ? <InputIconWrapper className="left-2">{icon}</InputIconWrapper> : null
    }, [icon, iconPosition])

    const EndIcon = useMemo(() => {
      return iconPosition === IconPosition.RIGHT ? (
        <InputIconWrapper className="right-2">{icon}</InputIconWrapper>
      ) : null
    }, [icon, iconPosition])

    return (
      <div className={cn('relative flex items-center', wrapperClassName)}>
        {StartIcon}
        <Input
          ref={ref}
          className={cn(
            iconPosition === IconPosition.LEFT && 'pl-8 pr-2',
            iconPosition === IconPosition.RIGHT && 'pr-8 pl-2',
            className,
          )}
          {...props}
        />
        {EndIcon}
      </div>
    )
  },
)
InputWithIcon.displayName = 'InputWithIcon'

export { Input, InputWithIcon }
