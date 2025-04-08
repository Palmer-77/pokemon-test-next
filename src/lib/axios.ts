import axios, { AxiosError, AxiosRequestConfig, AxiosHeaders } from 'axios'
import Cookies from 'js-cookie'

export const DlInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies
})

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve()
    }
  })
  failedQueue = []
}

// Add a request interceptor to add the token to all requests
DlInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle errors
DlInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest?.url?.includes('/auth/refresh')) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => DlInstance(originalRequest!))
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true

      try {
        const refreshToken = Cookies.get('refreshToken')
        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        const response = await DlInstance.post('/auth/refresh', {
          refreshToken,
        })

        const { accessToken, refreshToken: newRefreshToken } = response.data
        Cookies.set('accessToken', accessToken, {
          path: '/',
          secure: true,
          sameSite: 'lax',
        })
        Cookies.set('refreshToken', newRefreshToken, {
          path: '/',
          secure: true,
          sameSite: 'lax',
        })

        processQueue()

        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return DlInstance(originalRequest)
        }
      } catch (refreshError) {
        processQueue(refreshError)
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        window.location.href = '/auth/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export const DlAdminInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/admin',
  // withCredentials: true,
})

export const Instance = {
  default: DlInstance,
  admin: DlAdminInstance,
}
