'use client'

import { useLocale } from 'next-intl'
import { useMemo, useTransition } from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { setUserLocale } from '@/lib/i18n/getUserLocale'
import CircleFlagsTh from '~icons/circle-flags/th'
import CircleFlagsUs from '~icons/circle-flags/us'
// import { Switch } from '@/components/ui'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export const LanguageSwitch = () => {
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (locale: string) => {
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  return (
    <ToggleGroup
      className="rounded-full shadow-2xl  px-2 py-1"
      type="single"
      defaultValue={locale}
      value={locale}
      onValueChange={(value) => value && handleLocaleChange(value)}
    >
      <ToggleGroupItem value="th">
        <CircleFlagsTh className="size-5 shrink-0" />
      </ToggleGroupItem>
      <ToggleGroupItem value="en">
        <CircleFlagsUs className="size-5 shrink-0" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
