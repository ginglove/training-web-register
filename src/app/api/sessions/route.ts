import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest, requireRole } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!requireRole(user, ['ADMIN', 'MANAGER', 'MEMBER'])) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const sessions = await prisma.examSession.findMany({
      include: {
        createdBy: { select: { username: true, fullName: true } },
        _count: { select: { participants: true, submissions: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(sessions)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!requireRole(user, ['ADMIN', 'MANAGER'])) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const { name, code, startDate, endDate } = await req.json()

    // check if code exists
    const existing = await prisma.examSession.findUnique({ where: { code } })
    if (existing) {
      return NextResponse.json({ error: 'Session code already exists' }, { status: 400 })
    }

    const session = await prisma.examSession.create({
      data: {
        name,
        code,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        createdById: user!.id,
      },
    })

    return NextResponse.json(session)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }
}
