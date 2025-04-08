import { useTranslations } from 'next-intl'
import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import EmptyIcon from '~icons/dl/character-empty'

type EmptyStateProps = ComponentProps<'div'> & {
  title?: string
  description?: string
}

export const EmptyState = ({ title, description, className, ...props }: EmptyStateProps) => {
  const t = useTranslations()

  return (
    <div
      className={cn('flex flex-col items-center justify-center', className)}
      {...props}
    >
      <EmptyIcon className="w-20 h-20" />
      <h2 className="text-sm font-bold text-t-secondary text-center mt-3">{title || t('common.empty_state_title')}</h2>
      {description && <p className="text-center text-t-secondary">{description}</p>}
    </div>
  )
}
