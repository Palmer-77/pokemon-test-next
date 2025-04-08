'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import LucideMenu from '~icons/lucide/menu'

import { SidebarContent } from './SidebarContent'
import { NavigationSidebarSection } from '@/constants/navigation'

type MobileSidebarProps = {
  contentClassName?: string
  items?: NavigationSidebarSection[]
}

export const MobileSidebar = ({ contentClassName, items }: MobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="p-0 h-6 w-6"
        >
          <LucideMenu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className={cn('w-full sm:w-3/4', contentClassName)}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Update your profile information</SheetDescription>
        </SheetHeader>
        <SidebarContent isExpanded items={items} />
      </SheetContent>
    </Sheet>
  )
}
