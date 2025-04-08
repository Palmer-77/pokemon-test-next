import { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import CarbonDotMark from '~icons/carbon/dot-mark';

type Props = ComponentProps<'div'> & {
  title?: string
  contentClassName?: string
  rightContent?: ReactNode
}

export const FormSection = ({ className, children, title, contentClassName, rightContent, ...props }: Props) => {
  return (
    <div
      className={cn('rounded-lg overflow-hidden bg-b-secondary/90 backdrop-blur-sm', className)}
      {...props}
    >
      {title && (
        <div className="py-4 px-4 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2 text-h6-bold">
            <CarbonDotMark className="size-8 text-s-brand-primary" />
            <span>{title}</span>
          </div>
          {rightContent}
        </div>
      )}
      <div className={cn('bg-b-secondary/90 backdrop-blur-sm p-8 space-y-4', contentClassName)}>{children}</div>
    </div>
  )
}
