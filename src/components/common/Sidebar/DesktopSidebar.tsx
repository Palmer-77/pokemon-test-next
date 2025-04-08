'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { PreferencesCookiesKey } from '@/constants/preferences'
import { setCookiePreference } from '@/lib/cookiesPreferences'
import { cn } from '@/lib/utils'
import ChevronRightIcon from '~icons/heroicons/chevron-right-16-solid'

import { SidebarContent } from './SidebarContent'
import { NavigationSidebarSection } from '@/constants/navigation'
import { useRouter } from 'next/navigation'
import { useAuthSignOut } from '@/modules/auth/service/auth'
import Cookies from 'js-cookie'

type DesktopSidebarProps = {
  className?: string
  initialExpanded?: boolean
  items?: NavigationSidebarSection[]
  isUser?: boolean
}

export const DesktopSidebar = ({ className, initialExpanded = true, items = [], isUser = false }: DesktopSidebarProps) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState<boolean>(initialExpanded)

  const toggleSidebar = () => {
    setCookiePreference(PreferencesCookiesKey.SIDE_BAR_EXPANDED, !isExpanded)
    setIsExpanded((prev) => !prev)
  }

  const { mutateAsync: signOut, isLoading = false } = useAuthSignOut()

  const handleLogout = async () => {
    const { error } = await signOut()
    if (!error) {
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      router.replace('/auth/login'); // Redirect after logout
    } else {
      console.error('Logout error:', error);
    }
  };

  return (
    <div
      className={cn('sidebar p-4 md:flex flex-col gap-6 hidden z-50 justify-between', isExpanded ? 'expanded' : 'collapsed', className)}
      data-state={isExpanded ? 'expanded' : 'collapsed'}
    >
      <Button
        size="icon"
        className="absolute top-14 -right-4 size-8 rounded-full cursor-pointer bg-s-primary hover:bg-s-primary-accent dark:border dark:border-b-primary shadow-lg"
        onClick={toggleSidebar}
      >
        <ChevronRightIcon
          className={cn(
            'size-6 transition-all duration-500 ease-in-out text-t-primary',
            isExpanded ? 'rotate-180' : 'rotate-0',
          )}
        />
        <span className="sr-only">{isExpanded ? 'Collapse' : 'Expand'}</span>
      </Button>
      <SidebarContent isExpanded={isExpanded} items={items}
        isUser={isUser} />
      <div><Button disabled={isLoading} className='w-full bg-transparent hover:bg-t-alert text-t-alert hover:text-t-invert' onClick={handleLogout}>{isLoading ? 'กำลังออกจากระบบ' : 'ออกจากระบบ'}</Button></div>
    </div >
  )
}
