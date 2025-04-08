'use client'

import { cn } from '@/lib/utils'
import AppLogo from '~icons/dl/app-logo'
import HomeIcon from '~icons/dl/home-icon'
import PetIcon from '~icons/dl/pet-icon'

import { SidebarItem } from './SidebarItem'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment, useMemo, useState } from 'react'
import { NavigationSidebarSection } from '@/constants/navigation'

type SidebarContentProps = {
  isExpanded?: boolean
  items?: NavigationSidebarSection[]
  isUser?: boolean
}

export const SidebarContent = ({ isExpanded = false, items = [], isUser = false }: SidebarContentProps) => {
  const t = useTranslations('sidebar')
  const pathname = usePathname()
  const router = useRouter()
  const [navigatePath, setNavigatePath] = useState<string>('')

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-start h-16 items-center">
        {isExpanded ? (
          <div className="flex flex-row justify-center items-center">
            <AppLogo className={cn('h-16 w-auto text-t-primary')} />
            <span className="text-t-primary font-bold">SDC CMS</span>
          </div>
        ) : (
          <AppLogo className={cn('h-9 w-auto')} />
        )}
        <span className="sr-only">SDC CMS</span>
      </div>
      <div className="flex-1 flex-col flex gap-4">
        {items.map(({ id, label, items: children, hideLabel = false }) => (
          <Fragment key={`sidebar-content-${id}`}>
            <div className="flex flex-col gap-1.5">
              {!hideLabel && label && (
                <div className="font-bold text-xs uppercase text-t-secondary h-4 line-clamp-1">
                  {label && isExpanded && <span>{t(label)}</span>}
                </div>
              )}
              <div className="flex flex-col gap-2">
                {children.map(
                  ({ id: childId, label: childLabel, icon, href = '#', activePaths, children: subChildren }) => (
                    <SidebarItem
                      key={`sidebar-content-${id}-${childId}`}
                      icon={icon}
                      label={t(childLabel)}
                      activePaths={activePaths}
                      isExpanded={isExpanded}
                      onClick={(href) => router.replace(href || '')}
                      // subChildren={subChildren}
                      href={href}
                    />
                  ),
                )}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
