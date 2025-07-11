import bcrypt from 'bcryptjs'
import * as jose from 'jose'
import { db } from './db'
import { AdminUser } from './generated/prisma'

export interface AuthUser {
  id: string
  email: string
  username: string
  name: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function generateToken(user: AuthUser): Promise<string> {
  const secret = process.env.JWT_SECRET || 'fallback-secret'
  
  const secretKey = new TextEncoder().encode(secret)
  const token = await new jose.SignJWT({ 
    id: user.id, 
    email: user.email, 
    username: user.username, 
    role: user.role 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secretKey)
  
  return token
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const secret = process.env.JWT_SECRET || 'fallback-secret'
    
    const secretKey = new TextEncoder().encode(secret)
    const { payload } = await jose.jwtVerify(token, secretKey)
    
    const user: AuthUser = {
      id: payload.id as string,
      email: payload.email as string,
      username: payload.username as string,
      role: payload.role as string,
      name: (payload.name as string) || (payload.username as string) || ''
    }
    
    return user
  } catch (error) {
    return null
  }
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  try {
    const user = await db.adminUser.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        role: true,
        password: true,
        isActive: true,
      }
    })

    if (!user || !user.isActive) {
      return null
    }

    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      role: user.role,
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}

export async function createAdminUser(userData: {
  email: string
  username: string
  password: string
  name: string
  role?: 'SUPER_ADMIN' | 'ADMIN' | 'STAFF'
}): Promise<AdminUser> {
  const hashedPassword = await hashPassword(userData.password)
  
  return db.adminUser.create({
    data: {
      email: userData.email,
      username: userData.username,
      password: hashedPassword,
      name: userData.name,
      role: userData.role || 'ADMIN',
    }
  })
}

export async function verifyAdmin(request: Request): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.split(' ')[1]
    const decoded = await verifyToken(token)

    if (!decoded) {
      return null
    }

    // Verify the user still exists and is active
    const user = await db.adminUser.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        role: true,
        isActive: true,
      }
    })

    if (!user || !user.isActive) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      role: user.role,
    }
  } catch (error) {
    console.error('Admin verification error:', error)
    return null
  }
} 