'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Tabs = TabsPrimitive.Root

type TabsModeProps = 'default' | 'underline'
const TabsModeContext = React.createContext<TabsModeProps>('default')

const tabsListVariants = cva('inline-flex h-10 items-center justify-center text-muted-foreground p-1', {
  variants: {
    mode: {
      default: 'rounded-md bg-muted',
      underline: 'border-b border-transparent',
    },
  },
  defaultVariants: { mode: 'default' },
})
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>
>(({ mode = 'default', className, ...props }, ref) => (
  <TabsModeContext.Provider value={mode!}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ mode }), className)}
      {...props}
    />
  </TabsModeContext.Provider>
))
TabsList.displayName = TabsPrimitive.List.displayName

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all',
  {
    variants: {
      mode: {
        default:
          'rounded-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        underline: 'border-transparent border-b-2 data-[state=active]:border-t-brand data-[state=active]:text-t-brand',
      },
    },
    defaultVariants: { mode: 'default' },
  },
)
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const mode = React.useContext(TabsModeContext)
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ mode }), className)}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
