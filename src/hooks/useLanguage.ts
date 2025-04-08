'use client'

import { useLocale } from 'next-intl'
import { useCallback } from 'react'

export const useLanguage = () => {
  const locale = useLocale()

  const selectLang = useCallback(
    (translations: Record<string, string>) => {
      return translations[locale]
    },
    [locale],
  )
  return {
    locale,
    selectLang,
  }
}
