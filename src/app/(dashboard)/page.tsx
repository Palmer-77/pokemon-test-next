'use client'

import { Card, HomeContentContainer } from '@/components'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

const Page = () => {
  const t = useTranslations('select_mode')
  const router = useRouter()
  return (
    <HomeContentContainer
    >
      <Card
        id={1}
        name={t('content.mode_1.title')}
        description={t('content.mode_1.description')}
        image={''}
        path="/admin"
      />
    </HomeContentContainer>
  )
}

export default Page
