import dayjs from '@/lib/dayjs'

export enum DateFormat {
  DATE = 'DD MMM YYYY',
  FULL_DATE = 'DD MMMM YYYY',
  TIME = 'HH:mm',
  DATE_TIME = 'DD MMMM YYYY, HH:mm',
  DATE_SHORT = 'DD MMM',
  DATE_DASH = 'DD-MM-YYYY',
  MONTH_YEAR = 'MMM YYYY',
  FULL_MONTH_YEAR = 'MMMM YYYY',
  MONTH_ONLY = 'MMM',
  MMMM = 'MMMM',
  YEAR = 'YYYY',
  D = 'D',
  Do = 'Do',
  YYYYMMDD = 'YYYYMMDD',
  YYYY_MM_DD = 'YYYY-MM-DD',
}

export const isValidDate = (date: string | Date) => {
  return dayjs(date).isValid()
}

export const formatDate = (date: string | Date, format: DateFormat | string = DateFormat.DATE, locale?: string) => {
  if (!isValidDate(date)) {
    return null
  }

  locale = locale || dayjs.locale()
  const yearRegex = /Y(?!.*\])/g
  const localeFormat = locale === 'th' ? format.replace(yearRegex, 'B') : format

  return dayjs(date).locale(locale).format(localeFormat)
}

export const formatTime = (date: string | Date, locale?: string) => formatDate(date, DateFormat.TIME, locale)

export const formatDateTime = (date: string | Date, locale?: string) => formatDate(date, DateFormat.DATE_TIME, locale)

export const formatISODate = (date: string | Date | undefined, time?: 'start' | 'end') => {
  if (!date || !isValidDate(date)) {
    return null
  }

  const dayjsDate = dayjs(date)

  if (time === 'start') {
    return dayjsDate.startOf('day').toISOString()
  }

  if (time === 'end') {
    return dayjsDate.endOf('day').toISOString()
  }

  return dayjsDate.toISOString()
}

export const formatDateTimeRange = (start: string | Date, end: string | Date) => {
  if (!isValidDate(start) || !isValidDate(end)) {
    return undefined
  }

  const startDate = dayjs.tz(start, 'Asia/Bangkok')
  const endDate = dayjs.tz(end, 'Asia/Bangkok')

  const isDateSame = startDate.isSame(endDate, 'day')

  const IndividualDateFormat = '[วัน]dddd[ที่] DD MMMM YYYY [เวลา] HH:mm'

  const startDateTime = formatDate(start, IndividualDateFormat, 'th')
  const endDateTime = formatDate(end, IndividualDateFormat, 'th')

  const endTime = formatDate(end, 'HH:mm [น.]', 'th')

  if (!isDateSame) {
    return `${startDateTime} น. ถึง${endDateTime} น.`
  }

  return `${startDateTime} - ${endTime}`
}
