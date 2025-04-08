import { useTranslations } from 'next-intl'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type PageSizeSwitcherProps = {
  initialPageSize?: number
  options?: number[]
  onPageSizeChange?: (pageSize: number) => void
}

export const PageSizeSelector = ({
  initialPageSize = 10,
  options = [10, 20, 30, 40, 50],
  onPageSizeChange,
}: PageSizeSwitcherProps) => {
  return (
    <Select
      defaultValue={`${initialPageSize}`}
      onValueChange={(value) => {
        const pageSize = parseInt(value)
        onPageSizeChange?.(pageSize)
      }}
    >
      <SelectTrigger className="h-8 w-[70px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent side="top">
        {options.map((pageSize) => (
          <SelectItem
            key={pageSize}
            value={`${pageSize}`}
          >
            {pageSize}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export const PageSizeSwitcher = ({ options, initialPageSize, onPageSizeChange }: PageSizeSwitcherProps) => {
  const t = useTranslations()

  return (
    <div className="flex items-center text-sm font-medium gap-2">
      {t.rich('common.show_number_of_entries', {
        number: () => (
          <PageSizeSelector
            options={options}
            initialPageSize={initialPageSize}
            onPageSizeChange={onPageSizeChange}
          />
        ),
      })}
    </div>
  )
}
