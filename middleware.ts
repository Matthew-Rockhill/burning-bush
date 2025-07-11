import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the request is for an admin route (excluding login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      // No token found, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Verify the token
    const user = await verifyToken(token)
    if (!user) {
      // Invalid token, redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.set('admin-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
      })
      return response
    }

    // Check if user has admin or super admin role
    if (!['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
      // User doesn't have admin privileges, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // If accessing login page and already authenticated, redirect to admin dashboard
  if (pathname === '/admin/login') {
    const token = request.cookies.get('admin-token')?.value
    if (token) {
      const user = await verifyToken(token)
      if (user && ['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
} 