import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUser } from './modules/middleware/auth'

export async function middleware(request: NextRequest) {
  console.log('🔒 Middleware is running!')
  console.log('📍 Current path:', request.nextUrl.pathname)

  const response = NextResponse.next()
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  // ตรวจสอบว่าเป็น path ที่ต้องการป้องกันหรือไม่
  const isProtectedPath =
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname === '/admin' ||
    request.nextUrl.pathname.startsWith('/admin/')

  // ถ้าไม่มี token และพยายามเข้าถึงหน้า protected
  if (!accessToken || !refreshToken) {
    // ถ้าพยายามเข้าถึงหน้า login ให้ผ่านไปได้
    if (request.nextUrl.pathname === '/auth/login') {
      console.log('✅ Allowing access to login page')
      return response
    }

    // ถ้าพยายามเข้าถึงหน้า protected ให้ redirect ไปหน้า login
    if (isProtectedPath) {
      console.log('🚫 No tokens found, redirecting to login')
      response.cookies.delete('accessToken')
      response.cookies.delete('refreshToken')
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // ถ้ามี token และพยายามเข้าถึงหน้า login ให้ redirect ไปหน้า admin
  if (accessToken && refreshToken && request.nextUrl.pathname === '/auth/login') {
    console.log('🔄 Has tokens, redirecting to admin')
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  console.log('✅ Allowing access to:', request.nextUrl.pathname)
  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
