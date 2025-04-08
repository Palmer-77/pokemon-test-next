'use client'

import { useTranslations } from 'next-intl'

import { IconPosition, InputWithIcon } from '@/components/ui'
import { cn } from '@/lib/utils'
import MaterialSymbolsSearch from '~icons/material-symbols/search'

type TableControlProps = {
  search?: string
  onSearch?: (value: string) => void
  rightContent?: React.ReactNode
  appendContent?: React.ReactNode
  rightContentWrapperClassName?: string
}

export const TableControl = ({
  search = '',
  onSearch,
  appendContent,
  rightContent,
  rightContentWrapperClassName,
}: TableControlProps) => {
  const t = useTranslations()

  return (
    <div className="bg-s-primary py-6 px-8 flex justify-between items-center flex-wrap gap-4">
      <div className="flex items-center gap-2 flex-1">
        <div className="flex items-center w-full sm:w-auto">
          <span className="text-sm font-bold">search:</span>
          <InputWithIcon
            value={search}
            icon={<MaterialSymbolsSearch className="text-t-placeholder" />}
            iconPosition={IconPosition.LEFT}
            placeholder={'search'}
            wrapperClassName="ml-3 w-full sm:w-64"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
        {appendContent}
      </div>
      <div className={cn('flex items-center gap-2', rightContentWrapperClassName)}>{rightContent}</div>
    </div>
  )
}
