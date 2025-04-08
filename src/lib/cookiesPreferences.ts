'use server'

import liff from '@line/liff'
import { cookies } from 'next/headers'

import {
  defaultCookiePreferences,
  PREFERENCES_COOKIES_PREFIX_KEY,
  PreferencesCookiesKey,
} from '@/constants/preferences'

export const setCookiePreference = async (key: PreferencesCookiesKey, newValue: string | number | boolean) => {
  cookies().set(`${PREFERENCES_COOKIES_PREFIX_KEY}.${key}`, String(newValue))
}

export const getCookiePreference = async <T extends PreferencesCookiesKey>(
  key: T,
): Promise<(typeof defaultCookiePreferences)[T]['default']> => {
  const value = cookies().get(`${PREFERENCES_COOKIES_PREFIX_KEY}.${key}`)

  const cookieSchema = defaultCookiePreferences[key]

  if (!value) {
    return cookieSchema.default
  }

  if (cookieSchema.type === 'number') {
    return Number(value.value)
  }

  if (cookieSchema.type === 'boolean') {
    return value.value === 'true'
  }

  // await liff.init({ liffId: '2004777370-er6nOw9a' }).catch((err) => {
  //   throw err
  // })
  // if (liff.isLoggedIn()) {
  //   const getProfile = await liff.getProfile()
  //   console.log(getProfile)
  // } else {
  //   liff.login()
  // }

  return value.value
}

// export const getLineLoginCookies = async () => {
//   let getProfile
//   await liff.init({ liffId: '2004777370-er6nOw9a' }).catch((err) => {
//     throw err
//   })
//   if (liff.isLoggedIn()) {
//     getProfile = await liff.getProfile()
//   } else {
//     liff.login()
//   }
//   return getProfile
// }
