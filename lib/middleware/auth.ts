import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string
    email: string
    username: string
    name: string
    role: string
  }
}

export function requireRole(allowedRoles: string[]) {
  return function(handler: (request: AuthenticatedRequest) => Promise<NextResponse>) {
    return async function(request: NextRequest) {
      try {
        const token = request.cookies.get('auth-token')?.value

        if (!token) {
          return NextResponse.json(
            { error: 'Authentication required' },
            { status: 401 }
          )
        }

        const user = await verifyToken(token)

        if (!user) {
          return NextResponse.json(
            { error: 'Invalid token' },
            { status: 401 }
          )
        }

        if (!allowedRoles.includes(user.role)) {
          return NextResponse.json(
            { error: 'Insufficient permissions' },
            { status: 403 }
          )
        }

        const authRequest = request as AuthenticatedRequest
        authRequest.user = user

        return handler(authRequest)
      } catch (error) {
        console.error('Auth middleware error:', error)
        return NextResponse.json(
          { error: 'Authentication failed' },
          { status: 401 }
        )
      }
    }
  }
} 