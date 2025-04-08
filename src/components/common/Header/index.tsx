'use client'
import { useEffect, useState } from 'react'

import { LanguageSwitch } from './LanguageSwitch'
import { ThemeToggle } from './ThemeToggle'
import { useRouter } from 'next/navigation'
import { MobileSidebar } from '../Sidebar'
import AppLogo from '~icons/dl/app-logo'
import { getSidebarItems } from '@/utils/getSidebarItems'
import { AdminNavigationSidebarItems, NavigationSidebarSection } from '@/constants/navigation'

type HeaderProps = {
  mobileSidebarContentClassName?: string
  items?: NavigationSidebarSection[]
}

export const Header = ({ mobileSidebarContentClassName, items }: HeaderProps) => {
  const [profile, setProfile] = useState<any | null>(null)
  const router = useRouter()

  return (
    <header className="bg-transparent md:border-none flex items-center justify-end px-4 md:px-8">
      <div className="flex-1">
        <div className="flex items-center gap-4 md:hidden">
          <MobileSidebar contentClassName={mobileSidebarContentClassName} items={items} />
          <AppLogo className="h-10 w-10" />
        </div>
      </div>
      <div>
        <div className="flex gap-4">
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
