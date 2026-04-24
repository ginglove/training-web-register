import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const participants = await prisma.sessionParticipant.findMany({
      where: { userId: user.id },
      include: {
        session: {
          include: {
            _count: { select: { examPapers: true } }
          }
        }
      },
      orderBy: { session: { startDate: 'desc' } }
    })

    const sessions = participants.map(p => ({
      ...p.session,
      examPapersCount: p.session._count.examPapers
    }))

    return NextResponse.json(sessions)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 })
  }
}
