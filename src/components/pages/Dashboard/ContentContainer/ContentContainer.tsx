'use client'

import { cn } from '@/lib/utils'

interface ContentContainerProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  children?: React.ReactNode
  rightContent?: React.ReactNode
  contentClassName?: string
  titleTag?: React.ReactNode
}

export function ContentContainer({
  title,
  subtitle,
  children,
  rightContent,
  contentClassName,
  titleTag,
}: ContentContainerProps) {
  return (
    <div className="dashboard-content-container">
      <section className="flex flex-wrap gap-2">
        <div className="flex-1 space-y-1">
          {!!title && (
            <div className="flex items-center gap-4 text-primary text-h4-bold">
              {title} {!!titleTag && titleTag}
            </div>
          )}
          {!!subtitle && <div className="text-primary text-subtitle">{subtitle}</div>}
        </div>
        {!!rightContent && <div className="flex items-center">{rightContent}</div>}
      </section>
      <div className={cn('mt-8', contentClassName)}>{children}</div>
    </div>
  )
}
