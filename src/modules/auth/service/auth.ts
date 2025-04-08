import { useMutation, useQuery } from '@/hooks'
import { DataResponse } from '@/models/api'

export function useSignInWithUserAndPassword() {
  return useMutation<any, Error, { email: string; password: string }>(['login'], {
    url: `/auth/signin`,
    method: 'POST',
  })
}

export function useAuthSignOut() {
  return useMutation<any, Error>(['logout'], {
    url: `/auth/signout`,
    method: 'POST',
  })
}

export function useRefreshToken() {
  return useMutation<any, Error, { refreshToken: string }>(['refresh_token'], {
    url: `/auth/refresh`,
    method: 'POST',
  })
}

export const useGetUser = () => {
  return useQuery<DataResponse<any>>({
    queryKey: ['get_user'],
    url: `/auth/me`,
  })
}
