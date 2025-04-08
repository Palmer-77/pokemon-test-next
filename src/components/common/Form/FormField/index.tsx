import { ComponentProps, ReactNode } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type Props = ComponentProps<'div'> & {
  label: string
  subLabel?: string
  loading?: boolean
  loadingRender?: ReactNode
  render: ReactNode
}

export const FormField = ({ label, subLabel, loading = false, loadingRender, render, className, ...props }: Props) => {
  return (
    <div
      className={cn('flex gap-4 flex-col lg:flex-row', className)}
      {...props}
    >
      <div className="w-60 space-y-2">
        <div className="font-bold">{label}</div>
        {!!subLabel && <div className="text-sm">{subLabel}</div>}
      </div>
      <div className="flex-1">
        {loading && loadingRender ? loadingRender : loading ? <Skeleton className="w-full md:max-w-72 h-6" /> : render}
      </div>
    </div>
  )
}
