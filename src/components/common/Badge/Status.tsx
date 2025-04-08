import { PropsWithChildren } from 'react'

import { Badge } from '@/components/ui'
import { cn } from '@/lib/utils'
import CarbonDotMark from '~icons/carbon/dot-mark';

export type StatusVariance = 'primary' | 'warning' | 'secondary' | 'cancel' | 'danger'

export interface StatusBadgeProps extends PropsWithChildren {
  variance?: StatusVariance
}

const colorMap: Record<
  StatusVariance,
  {
    color: string
    bg: string
  }
> = {
  secondary: {
    color: 'text-badge-secondary',
    bg: 'bg-badge-secondary',
  },
  warning: {
    color: 'text-badge-warning',
    bg: 'bg-badge-warning',
  },
  primary: {
    color: 'text-s-brand-primary',
    bg: 'bg-s-brand-primary-hover',
  },
  cancel: {
    color: 'text-t-alert',
    bg: 'bg-t-alert',
  },
  danger: {
    color: 'text-badge-danger',
    bg: 'bg-badge-danger',
  },
}

export function StatusBadge({ variance = 'secondary', children }: StatusBadgeProps) {
  const colorConfig = colorMap[variance] ?? colorMap.secondary

  return (
    <Badge
      className={cn('flex items-center justify-start h-9', colorConfig.color)}
      variant="secondary"
    >
      <CarbonDotMark className={cn('h-4 w-4', colorConfig.color)} />
      <span className="text-sm font-normal">{children}</span>
    </Badge>
  )
}
