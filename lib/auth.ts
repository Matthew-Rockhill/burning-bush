import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { db } from './db'
import CryptoJS from 'crypto-js'

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-key')

export interface AuthUser {
  id: string
  email: string
  username: string
  name: string
  role: string
}

// Hash password using crypto-js (Edge Runtime compatible)
export async function hashPassword(password: string): Promise<string> {
  return CryptoJS.SHA256(password).toString()
}

// Verify password using crypto-js (Edge Runtime compatible)
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const hashedInput = CryptoJS.SHA256(password).toString()
  return hashedInput === hashedPassword
}

export async function createToken(user: AuthUser): Promise<string> {
  return await new SignJWT({
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
    role: user.role
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey)
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey)
    
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

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  
  if (!token) {
    return null
  }
  
  return await verifyToken(token)
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  try {
    const user = await db.adminUser.findUnique({
      where: { email }
    })
    
    if (!user) {
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
      role: user.role
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
} 