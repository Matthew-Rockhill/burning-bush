import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the request is for an admin route (excluding login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      // No token found, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      // Verify the token
      const user = await verifyToken(token)
      if (!user) {
        // Invalid token, redirect to login
        const response = NextResponse.redirect(new URL('/admin/login', request.url))
        response.cookies.set('auth-token', '', {
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
    } catch (error) {
      console.error('Middleware auth error:', error)
      // On error, redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.set('auth-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
      })
      return response
    }
  }

  // Check if the request is for an admin API route
  if (pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    try {
      const user = await verifyToken(token)
      if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        )
      }
    } catch (error) {
      console.error('API middleware auth error:', error)
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }
  }

  // If accessing login page and already authenticated, redirect to admin dashboard
  if (pathname === '/admin/login') {
    const token = request.cookies.get('auth-token')?.value
    if (token) {
      try {
        const user = await verifyToken(token)
        if (user && ['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
          return NextResponse.redirect(new URL('/admin', request.url))
        }
      } catch (error) {
        // Token is invalid, let them access login page
        console.error('Login page redirect check error:', error)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
} 