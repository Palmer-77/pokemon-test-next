import { useMemo } from 'react'

export type Key = (string | number | Date | undefined)[]
export const useGetLoaderKey = (key: Key, loader = true, loaderStyle?: string) => {
  return useMemo(() => {
    if (!loader) return undefined
    if (loaderStyle) return `$${loaderStyle}#${key.join('-')}`

    return `#${key.join('-')}`
  }, [key, loader, loaderStyle])
}

export const replacePathParams = (url: string = '', params: Record<string, unknown> = {}) => {
  for (const [key, value] of Object.entries(params)) {
    if (url.includes(`:${key}`)) {
      url = url.replace(`:${key}`, value as string)
      delete params[key]
    }
  }

  return { url, params }
}
