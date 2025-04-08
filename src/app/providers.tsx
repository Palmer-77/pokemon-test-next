'use client'

import { Toaster } from '@/components/ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { ReactNode } from 'react'

type ProvidersProps = {
  children: ReactNode
  themeOptions?: ThemeProviderProps
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

export const Providers = ({ children, themeOptions }: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...themeOptions}
    >
      <Toaster
        position="top-center"
        duration={2000}
        toastOptions={{
          unstyled: true,
          style: {
            width: '420px',
          },
        }}
      />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}
