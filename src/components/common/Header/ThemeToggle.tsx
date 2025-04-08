'use client'

import { useTheme } from 'next-themes'
import HeroiconsComputerDesktop from '~icons/heroicons/computer-desktop'
import HeroiconsMoon from '~icons/heroicons/moon'
import HeroiconsSun from '~icons/heroicons/sun'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()

  return (
    <ToggleGroup
      className="rounded-full shadow-2xl  px-2 py-1"
      type="single"
      defaultValue={theme}
      value={theme}
      onValueChange={(value) => value && setTheme(value)}
    >
      <ToggleGroupItem value="light">
        <HeroiconsSun className="size-5 shrink-0" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark">
        <HeroiconsMoon className="size-5 shrink-0" />
      </ToggleGroupItem>
      <ToggleGroupItem value="system">
        <HeroiconsComputerDesktop className="size-5 shrink-0" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
