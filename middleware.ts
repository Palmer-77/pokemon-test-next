import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('🔒 Middleware is running!')
  console.log('📍 Current path:', request.nextUrl.pathname)

  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value
  const userRole = request.cookies.get('userRole')?.value

  console.log('🎫 Tokens status:', {
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    userRole,
  })

  // ถ้าไม่มี token
  if (!accessToken || !refreshToken) {
    // ถ้าพยายามเข้าถึงหน้า login ให้ผ่านไปได้
    if (request.nextUrl.pathname === '/auth/login') {
      console.log('✅ Allowing access to login page')
      return NextResponse.next()
    }

    // ถ้าเข้าถึงหน้าอื่นๆ ให้ redirect ไปหน้า login
    console.log('🚫 No tokens found, redirecting to login')
    const response = NextResponse.redirect(new URL('/auth/login', request.url))
    response.cookies.delete('accessToken')
    response.cookies.delete('refreshToken')
    response.cookies.delete('userRole')
    return response
  }

  // เช็คสิทธิ์การเข้าถึงหน้า admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (userRole !== 'admin') {
      console.log('🚫 No admin access, redirecting to home')
      const response = NextResponse.redirect(new URL('/', request.url))
      response.cookies.delete('accessToken')
      response.cookies.delete('refreshToken')
      response.cookies.delete('userRole')
      return response
    }
  }

  // ถ้ามี token และพยายามเข้าถึงหน้า login ให้ redirect ไปหน้า admin
  if (accessToken && refreshToken && request.nextUrl.pathname === '/auth/login') {
    console.log('🔄 Has tokens, redirecting to admin')
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  console.log('✅ Allowing access to:', request.nextUrl.pathname)
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/admin', '/admin/:path*', '/auth/login', '/auth/:path*'],
}
