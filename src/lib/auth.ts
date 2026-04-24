import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-dev'

export interface DecodedToken {
  id: string
  username: string
  role: string
  iat: number
  exp: number
}

export function signToken(payload: object, expiresIn = '1d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export function verifyToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken
  } catch {
    return null
  }
}

export function getUserFromRequest(req: NextRequest): DecodedToken | null {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null

  const token = authHeader.split(' ')[1]
  return verifyToken(token)
}

// Role based middleware utility
export function requireRole(user: DecodedToken | null, allowedRoles: string[]) {
  if (!user) return false
  return allowedRoles.includes(user.role)
}

/**
 * Standardized auth verification for API routes
 * Supports both Request and NextRequest
 */
export async function verifyAuth(req: Request | NextRequest): Promise<DecodedToken | null> {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null

  const token = authHeader.split(' ')[1]
  return verifyToken(token)
}

