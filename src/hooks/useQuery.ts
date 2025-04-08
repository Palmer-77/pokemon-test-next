import { QueryKey, useQuery as useTsQuery, UseQueryOptions } from '@tanstack/react-query'
import { AxiosError, AxiosRequestConfig } from 'axios'

import { Instance } from '@/lib/axios'

type QueryOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TError = AxiosError,
  TQueryKey extends QueryKey = QueryKey,
> = {
  queryKey: TQueryKey
  url: string
  instance?: keyof typeof Instance
  axiosConfig?: Omit<AxiosRequestConfig<TQueryFnData>, 'signal'>
  queryConfig?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey'>
}

export const useQuery = <
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TError = AxiosError,
  TQueryKey extends QueryKey = QueryKey,
>({
  queryKey,
  url,
  instance = 'default',
  axiosConfig,
  queryConfig,
}: QueryOptions<TQueryFnData, TData, TError, TQueryKey>) => {
  return useTsQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      const selectedInstance = Instance[instance]
      const result = await selectedInstance({
        url,
        method: 'GET',
        signal,
        ...axiosConfig,
      })

      return result.data
    },
    ...queryConfig,
  })
}
