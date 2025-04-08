import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { NavigationSidebarItem, NavigationSidebarSection } from '@/constants/navigation'

export const parseSidebarItems = (
  items: NavigationSidebarItem[],
  t: ReturnType<typeof useTranslations<'sidebar'>>,
): NavigationSidebarItem[] => {
  return items.map((item) => {
    return {
      ...item,
      children: item.children ? parseSidebarItems(item.children, t) : undefined,
    }
  })
}

export const getSidebarItems = async (sections: NavigationSidebarSection[]): Promise<NavigationSidebarSection[]> => {
  const t = await getTranslations('sidebar')

  return sections.map((section) => {
    return {
      ...section,
      items: parseSidebarItems(section.items, t),
    }
  })
}
