'use client'

import { ComponentProps, forwardRef, ReactNode, useCallback, useMemo, useState } from 'react'

import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

type StatusToggleButtonProps = {
  onValueChange?: (value: string) => void
  initialValue?: string
  data?: { value: string; label: string; icon?: ReactNode }[]
  labelClassName?: string
} & ComponentProps<typeof Button>

export const StatusToggleButton = forwardRef<HTMLButtonElement, StatusToggleButtonProps>(
  ({ onValueChange, initialValue, data = [], labelClassName, className, ...props }, ref) => {
    const [value, setValue] = useState(initialValue ?? data[0].value)

    const handleValueChange = useCallback(() => {
      const currentIndex = data.findIndex((item) => item.value === value)
      const nextIndex = (currentIndex + 1) % data.length
      onValueChange?.(data[nextIndex].value)
      setValue(data[nextIndex].value)
    }, [data, onValueChange, value])

    const currentData = useMemo(() => data.find((item) => item.value === value), [data, value])

    return (
      <Button
        ref={ref}
        variant="outline"
        onClick={handleValueChange}
        className={cn(`flex items-center gap-2`, className)}
        {...props}
      >
        {currentData?.icon}
        <span className={cn('flex-1', labelClassName)}>{currentData?.label}</span>
      </Button>
    )
  },
)

StatusToggleButton.displayName = 'StatusToggleButton'
