import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 })
    }
    if (username.length > 15 || password.length > 25) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({ where: { username } })
    if (!user || user.status === 'INACTIVE') {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 })
    }

    const { signToken } = await import('@/lib/auth')
    const token = signToken({ id: user.id, username: user.username, role: user.role })

    return NextResponse.json({
      token,
      user: { id: user.id, username: user.username, fullName: user.fullName, role: user.role },
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
