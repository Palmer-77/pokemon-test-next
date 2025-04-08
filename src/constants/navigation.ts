import { useTranslations } from 'next-intl'

export type SidebarItem = {
  id: string
  label: Parameters<ReturnType<typeof useTranslations<'sidebar'>>>[0]
  icon: string
  activePaths: string[]
  href: string
}

export type NavigationSidebarItem = SidebarItem & {
  children?: SidebarItem[]
}

export type NavigationSidebarSection = {
  id: string
  hideLabel?: boolean
  label?: Parameters<ReturnType<typeof useTranslations<'sidebar'>>>[0]
  items: NavigationSidebarItem[]
}

export const AdminNavigationSidebarItems: NavigationSidebarSection[] = [
  {
    id: 'admin_management',
    items: [
      {
        id: 'admin_dashboard',
        label: 'admin_dashboard',
        icon: 'dashicons:admin-home',
        href: '/admin',
        activePaths: ['^/admin$'],
      },
      {
        id: 'admin_size',
        label: 'admin_size_management',
        icon: 'fluent-mdl2:slider-handle-size',
        href: '/admin/size',
        activePaths: ['^/admin/size'],
      },
      // {
      //   id: 'admin_time',
      //   label: 'admin_time_management',
      //   icon: 'mingcute:time-fill',
      //   href: '/admin/time',
      //   activePaths: ['^/admin/time'],
      // },
      {
        id: 'admin_user',
        label: 'admin_employee_management',
        icon: 'mdi:user',
        href: '/admin/user',
        activePaths: ['^/admin/user'],
      },
      {
        id: 'admin_report',
        label: 'admin_report_management',
        icon: 'icon-park-outline:table-report',
        href: '/admin/cycle',
        activePaths: ['^/admin/cycle'],
      },
      {
        id: 'admin_role',
        label: 'admin_role_management',
        icon: 'eos-icons:cluster-role',
        href: '/admin/role',
        activePaths: ['^/admin/role'],
      },
      // {
      //   id: 'admin_receipt',
      //   label: 'admin_receipt_management',
      //   icon: 'lucide:receipt',
      //   href: '/admin/receipt',
      //   activePaths: ['^/admin/receipt'],
      // },
    ],
  },
]
