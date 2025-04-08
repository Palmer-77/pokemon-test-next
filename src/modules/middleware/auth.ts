import { NextRequest } from 'next/server'

import { api } from '@/lib/ky'

type MeUser = {
  id: string
  firstname: string
  lastname: string
  role_id: string
  created_at: string
  updated_at: string
  auth_id: string
  role: {
    id: string
    name: string
    key: string
    permissions: Array<{
      id: string
      name: string
      key: string
      description: string
    }>
  }
}

export const getUser = async (request: NextRequest) => {
  const response = await api.get(`auth/me`, {
    headers: { cookie: request.cookies.toString() },
  })

  if (!response.ok) {
    return null
  }

  const data = await response.json<MeUser>()

  return data
}

// export const getUserPermissions = async (request: NextRequest, orgId?: string, channelId?: string) => {
//   const response = await api.get(`auth/permissions`, {
//     headers: { cookie: request.cookies.toString() },
//     searchParams: {
//       ...(orgId && { organization: orgId }),
//       ...(channelId && { channel: channelId }),
//     },
//   })

//   const json = await response.json<{ data: UserPermissions }>()

//   if (!response.ok) {
//     return null
//   }

//   return json.data
// }

// export const validateInvitation = async (request: NextRequest, token?: string) => {
//   const body = {
//     token,
//   }
//   const response = await api.post(`auth/invite/validate`, {
//     body: JSON.stringify(body),
//   })

//   if (!response.ok) {
//     return null
//   }

//   const json = await response.json<{
//     data: {
//       is_valid: boolean
//       email: string
//       session_token: string
//       session_expires_at: string
//     }
//   }>()

//   return json.data
// }
