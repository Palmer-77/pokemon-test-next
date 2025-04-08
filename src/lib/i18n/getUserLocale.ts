'use server'

import { cookies, headers } from 'next/headers'

import { defaultLocale, Locale } from '@/i18n'

import { LOCALE_COOKIE_NAME, LOCALE_HEADER_NAME } from './constants'

export async function getUserLocale() {
  const headerLocale = headers().get(LOCALE_HEADER_NAME)
  return headerLocale || cookies().get(LOCALE_COOKIE_NAME)?.value || defaultLocale
}

export async function setUserLocale(locale: Locale) {
  cookies().set(LOCALE_COOKIE_NAME, locale, {
    expires: new Date(Date.now() + 34560000000),
    path: '/',
  })
}
