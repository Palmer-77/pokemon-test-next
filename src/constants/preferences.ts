export const PREFERENCES_COOKIES_PREFIX_KEY = 'gacha.pref'

export enum PreferencesCookiesKey {
  SIDE_BAR_EXPANDED = 'sidebar.is_expanded',
  SIDE_BAR_WIDTH = 'sidebar.width',
  LOCALE = 'locale',
}

export type CookieType = 'string' | 'number' | 'boolean'

type CookiePreferenceSchemaString = {
  type: 'string'
  default: string
}

type CookiePreferenceSchemaNumber = {
  type: 'number'
  default: number
}

type CookiePreferenceSchemaBoolean = {
  type: 'boolean'
  default: boolean
}

export type CookiePreferenceSchema =
  | CookiePreferenceSchemaString
  | CookiePreferenceSchemaNumber
  | CookiePreferenceSchemaBoolean

export const defaultCookiePreferences = {
  [PreferencesCookiesKey.SIDE_BAR_EXPANDED]: {
    type: 'boolean',
    default: true,
  },
  [PreferencesCookiesKey.SIDE_BAR_WIDTH]: {
    type: 'number',
    default: 240,
  },
  [PreferencesCookiesKey.LOCALE]: {
    type: 'string',
    default: 'en',
  },
}
