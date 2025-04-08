import { useMutation as useReactMutation, UseMutationOptions } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'

import { DlInstance } from '@/lib/axios'

import { useLoadingContext } from './useLoader'
import { Key, replacePathParams, useGetLoaderKey } from './utils'

type MutationKey = Key
type MutationAxiosOptions = AxiosRequestConfig
type MutationOptions<TData = unknown, TError = Error, TVariables = void, TContext = unknown> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  'mutationKey'
> & { loader?: boolean; loaderStyle?: 'TRANSPARENT' }

type FormDataMutationVariables = {
  formData: FormData
  variables: Record<string, unknown>
}

type StaticMutationVariables = Record<string, unknown>

type MutationVariables = void | StaticMutationVariables | FormDataMutationVariables

export const useMutation = <
  TData = unknown,
  TError = Error,
  TVariables extends MutationVariables = void,
  TContext = unknown,
>(
  key: MutationKey,
  axiosOpts: MutationAxiosOptions,
  { loader, loaderStyle, ...opts }: MutationOptions<TData, TError, TVariables, TContext> = {},
) => {
  const { isPending, ...mutation } = useReactMutation<TData, TError, TVariables, TContext>({
    mutationKey: key,
    mutationFn: async (variables) => {
      let _variables: Record<string, unknown> | undefined = undefined
      let requestData: any = undefined
      if (variables !== void 0) {
        if ('formData' in variables) {
          _variables = (variables as FormDataMutationVariables).variables
          requestData = (variables as FormDataMutationVariables).formData

          const { url } = replacePathParams(axiosOpts.url, _variables)
          axiosOpts.url = url
        } else {
          _variables = variables

          const { url } = replacePathParams(axiosOpts.url, _variables)
          axiosOpts.url = url
          requestData = _variables
        }
      }

      const { data } = await DlInstance.request<TData>({
        method: 'POST',
        ...axiosOpts,
        data: requestData,
      })

      return data
    },
    ...opts,
  })

  const loaderKey = useGetLoaderKey(key, loader, loaderStyle)
  useLoadingContext(loaderKey, isPending)

  return {
    ...mutation,
    isLoading: isPending,
  }
}
