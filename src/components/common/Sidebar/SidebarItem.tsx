'use client'

import { useParams, usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'

// import { IconWithLoading } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { SidebarItem as SubSidebarItem } from '@/constants/navigation'
import { cn } from '@/lib/utils'
import ChevronDown from '~icons/lucide/chevron-down.jsx'
import { IconWithLoading } from '@/components/icons'

type SidebarItemProps = {
  icon: string
  label: string
  href?: string
  onClick?: (href?: string) => void
  activePaths?: string[]
  isExpanded?: boolean
  subChildren?: SubSidebarItem[]
}

export const SidebarItem = ({
  icon,
  label,
  onClick,
  activePaths = [],
  isExpanded,
  subChildren,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname()
  const t = useTranslations('sidebar')
  const params = useParams()
  const { orgId = '', channelId = '' } = params

  // const isActive = useMemo(() => {
  //   return activePaths
  //     .map((path) => (path === '' ? new RegExp(/^$|^\/$/) : new RegExp(path.replace(':orgId', orgId as string).replace(':channelId', channelId as string))))
  //     ?.some((path) => path.test(pathname))
  // }, [activePaths, pathname])

  const isActive = useMemo(() => {
    return activePaths.some((pathPattern) => {
      // แทนที่พารามิเตอร์ใน path ถ้ามี
      const replacedPath = pathPattern
        .replace(':orgId', orgId as string)
        .replace(':channelId', channelId as string);

      // สร้าง RegExp จาก pattern
      const regex = new RegExp(replacedPath === '' ? '^$|^\/$' : replacedPath);

      // ทดสอบกับ pathname ปัจจุบัน
      return regex.test(pathname);
    });
  }, [activePaths, pathname, orgId, channelId]);


  const [accordionExpanded, setAccordionExpanded] = useState(false)

  if (subChildren) {
    return (
      <div>
        <SidebarItemRender
          icon={icon}
          label={label}
          onClick={() => setAccordionExpanded(!accordionExpanded)}
          isActive={isActive}
          isExpanded={isExpanded}
          isAcordion
          accordionExpanded={accordionExpanded}
        />
        {accordionExpanded &&
          subChildren.map((subItem) => (
            <SubSidebarItemRender
              key={subItem.label}
              label={t(subItem.label)}
              href={subItem.href}
              onClick={() =>
                onClick?.(subItem.href.replace(':orgId', orgId as string).replace(':channelId', channelId as string))
              }
              isActive={subItem.activePaths
                .map(
                  (path) =>
                    new RegExp(path.replace(':orgId', orgId as string).replace(':channelId', channelId as string)),
                )
                .some((path) => path.test(pathname))}
              isExpanded={isExpanded}
            />
          ))}
      </div>
    )
  }

  return (
    <SidebarItemRender
      icon={icon}
      label={label}
      onClick={() => onClick?.(href?.replace(':orgId', orgId as string).replace(':channelId', channelId as string))}
      isActive={isActive}
      isExpanded={isExpanded}
    />
  )
}

const SidebarItemRender = ({
  icon,
  label,
  onClick,
  isActive,
  isExpanded,
  isAcordion,
  accordionExpanded,
}: {
  icon: string
  label: string
  href?: string
  onClick?: () => void
  isActive?: boolean
  isExpanded?: boolean
  isAcordion?: boolean
  accordionExpanded?: boolean
}) => {
  return (
    <Button
      className={cn(
        'group w-full h-12 flex gap-3 items-center px-2.5 overflow-x-hidden text-t-primary hover:bg-s-brand-primary-hover hover:text-t-invert dark:hover:text-t-primary bg-transparent data-[active=true]:bg-s-brand-primary data-[active=true]:text-t-invert dark:data-[active=true]:text-t-primary',
        isExpanded ? 'justify-start' : 'justify-center',
        'font-normal data-[active=true]:font-bold',
      )}
      onClick={onClick}
      data-active={isActive}
    >
      <div className="shrink-0">
        <div className="size-5">
          <IconWithLoading
            icon={icon}
            className="size-5 text-t-primary group-hover:text-t-invert dark:group-hover:text-t-primary group-data-[active=true]:text-t-invert dark:group-data-[active=true]:text-t-primary"
          />
        </div>
      </div>
      {isExpanded && <span className="flex-1 line-clamp-1 text-start text-lg">{label}</span>}
      {isAcordion && isExpanded && (
        <div className="shrink-0">
          <div className="size-5">
            <ChevronDown
              className={cn(
                'h-4 w-4 shrink-0 transition-transform duration-200',
                accordionExpanded ? 'rotate-180' : '',
              )}
            />
          </div>
        </div>
      )}
    </Button>
  )
}

const SubSidebarItemRender = ({
  label,
  onClick,
  isActive,
  isExpanded,
}: {
  label: string
  href?: string
  onClick?: () => void
  isActive?: boolean
  isExpanded?: boolean
}) => {
  return (
    <Button
      className={cn(
        'group w-full h-10 flex gap-3 items-center px-2.5 overflow-x-hidden text-t-secondary hover:bg-s-brand-primary-hover hover:text-t-invert dark:hover:text-t-primary bg-transparent data-[active=true]:bg-s-brand-primary data-[active=true]:text-t-invert dark:data-[active=true]:text-t-primary',
        isExpanded ? 'justify-start' : 'justify-center',
        'font-normal data-[active=true]:font-bold',
      )}
      onClick={onClick}
      data-active={isActive}
    >
      {isExpanded && <span className="line-clamp-1 text-start ml-8">{label}</span>}
    </Button>
  )
}
