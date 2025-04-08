import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { Button } from '@/components/ui'
import FluentChevronLeft12Filled from '~icons/fluent/chevron-left-24-filled'
import FluentChevronRight12Filled from '~icons/fluent/chevron-right-24-filled'

type PaginationProps = {
  onPageChange?: (page: number) => void
  totalPages: number
  currentPage: number
}

export const Pagination = ({ onPageChange, totalPages, currentPage }: PaginationProps) => {
  const t = useTranslations()

  const pages = useMemo(() => {
    const pages: number[] = []
    const maxPages = 3
    const start = Math.max(1, currentPage - Math.floor(maxPages / 2))
    const end = Math.min(totalPages, currentPage + Math.floor(maxPages / 2))

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }, [currentPage, totalPages])

  return (
    <div className="flex items-center gap-2">
      <Button
        className="rounded-full size-8"
        variant="outline"
        size="icon"
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span className="sr-only">{t('buttons.previous')}</span>
        <FluentChevronLeft12Filled className="size-4" />
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          className="rounded-full size-8"
          variant={currentPage === page ? 'default' : 'outline'}
          onClick={() => onPageChange?.(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        className="rounded-full size-8"
        variant="outline"
        size="icon"
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <span className="sr-only">{t('buttons.next')}</span>
        <FluentChevronRight12Filled className="size-4" />
      </Button>
    </div>
  )
}
