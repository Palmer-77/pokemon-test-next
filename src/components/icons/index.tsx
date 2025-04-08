'use client'

import { Icon as Iconify, IconProps } from '@iconify/react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { Skeleton } from '../ui'

export const IconWithLoading = ({ onLoad, ...props }: IconProps) => {
  const [loading, setLoading] = useState(true)

  return (
    <div className="relative">
      <Iconify
        {...props}
        onLoad={(e) => {
          setLoading(false)
          onLoad?.(e as string)
        }}
      />
      {loading && <Skeleton className={cn(props.className, 'inset-0 absolute')} />}
    </div>
  )
}

export const Icon = ({ icon, className, ...props }: IconProps) => {
  return (
    <Iconify
      icon={icon}
      className={cn(className)}
      {...props}
    />
  )
}
