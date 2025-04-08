'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  counter?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, counter, maxLength, ...props }, forwardedRef) => {
    const ref = useRef<HTMLTextAreaElement>(null)

    useImperativeHandle(forwardedRef, () => ref.current as HTMLTextAreaElement)

    const characterCount = ref.current?.value.length || 0

    return (
      <div className={cn('relative', className)}>
        <textarea
          className={cn(
            'flex min-h-[100px] w-full rounded-md relative border border-b-primary bg-s-input px-3 py-2 text-sm ring-offset-b-primary placeholder:text-t-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-b-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            counter && !!maxLength && 'pb-6',
            'aria-[invalid=true]:border-b-alert',
            className,
          )}
          ref={ref}
          maxLength={maxLength}
          {...props}
        />
        {counter && !!maxLength && (
          <span className="absolute bottom-1 right-2 text-xs text-t-secondary">
            {characterCount.toLocaleString()} / {maxLength.toLocaleString()}
          </span>
        )}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
