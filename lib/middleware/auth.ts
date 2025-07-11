import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, AuthUser } from '@/lib/auth'

export interface AuthenticatedRequest extends NextRequest {
  user?: AuthUser
}

export function requireAuth(handler: (request: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    try {
      const token = request.cookies.get('admin-token')?.value
      
      if (!token) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }

      const user = await verifyToken(token)
      
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid authentication token' },
          { status: 401 }
        )
      }

      // Add user to request
      const authenticatedRequest = request as AuthenticatedRequest
      authenticatedRequest.user = user

      return handler(authenticatedRequest)
    } catch (error) {
      console.error('Authentication middleware error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}

export function requireRole(roles: string[], handler: (request: AuthenticatedRequest) => Promise<NextResponse>) {
  return requireAuth(async (request: AuthenticatedRequest) => {
    const user = request.user!
    
    if (!roles.includes(user.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    return handler(request)
  })
} 