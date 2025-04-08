'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'

interface ContentContainerDetailProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  imageSrc?: string
  children: React.ReactNode
  className?: string
}

export function ContentContainerDetail({
  title,
  subtitle,
  imageSrc,
  children,
  className,
}: ContentContainerDetailProps) {
  return (
    <div className="dashboard-content-container">
      {/* TODO: breadcumb */}

      <section className="flex gap-2">
        {!!imageSrc && (
          <div>
            <Image
              src={imageSrc}
              width={36}
              height={36}
              className="rounded-full object-cover"
              alt="organization logo"
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          {!!title && <div className="text-primary text-h4-bold">{title}</div>}
          {!!subtitle && <div className="text-primary text-subtitle">{subtitle}</div>}
        </div>
      </section>
      <div className={cn('mt-8', className)}>{children}</div>
    </div>
  )
}
