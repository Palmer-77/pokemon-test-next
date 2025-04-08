'use client'

import { cn } from '@/lib/utils'

interface HomeContentContainerProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  children?: React.ReactNode
  rightContent?: React.ReactNode
  contentClassName?: string
  titleTag?: React.ReactNode
}

export function HomeContentContainer({
  title,
  subtitle,
  children,
  rightContent,
  contentClassName,
  titleTag,
}: HomeContentContainerProps) {
  return (
    <div className="h-full w-full flex justify-center items-start">
      <div className={cn('flex flex-col justify-center items-start gap-4 w-full', contentClassName)}>
        <div className="flex flex-col justify-center items-start">
          {title && <span className="font-bold text-[48px]">{title}</span>}
          {subtitle && <p className="text-subtitle">{subtitle}</p>}
        </div>

        <div className="flex flex-col w-full gap-4 justify-center">{children}</div>
      </div>
    </div>
  )
}
