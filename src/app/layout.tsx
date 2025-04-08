import '@/styles/globals.scss'

import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ReactNode } from 'react'

import { getUserLocale } from '../lib/i18n/getUserLocale'
import { kanit } from '../styles/fonts'
import { Providers } from './providers'

export const viewport: Viewport = {
  width: 'device-width',
  userScalable: false,
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'Smart Durian Control',
    template: '%s | Smart Durian Control',
  },
  description: 'Smart Durian Control คือระบบ Web CMS ที่ออกแบบมาเพื่อช่วยให้คุณ ตั้มแจ่ม สามารถจัดการสวนทุเรียนได้อย่างมีประสิทธิภาพและง่ายดาย ควบคุมทุกขั้นตอนตั้งแต่การดูแลต้น, การจัดการผลผลิต, การตลาด, ไปจนถึงการวิเคราะห์ข้อมูล เพื่อให้สวนทุเรียนของคุณเติบโตอย่างยั่งยืนและสร้างผลกำไรสูงสุด',
  robots: {
    follow: true,
    index: true,
  },
  metadataBase: process.env.NEXT_PUBLIC_BASE_URL ? new URL(process.env.NEXT_PUBLIC_BASE_URL) : undefined,
}

export const runtime = 'edge'

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const locale = await getUserLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={kanit.variable}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background">
        <Providers>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
