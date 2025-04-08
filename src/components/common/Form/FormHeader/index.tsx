import { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type Props = ComponentProps<'div'> & {
  header: string
  subHeader?: ReactNode
}

export const FormHeader = ({ header, subHeader, className, ...props }: Props) => {
  return (
    <div
      className={cn('flex gap-4', className)}
      {...props}
    >
      <div className="flex flex-row items-center gap-2 w-32 md:min-w-60">
        <div className="font-bold">{header}</div>
        {!!subHeader && <div className="text-sm">{subHeader}</div>}
      </div>
    </div>
  )
}
