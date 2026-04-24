export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    const body = await req.json()
    const { sessionId, examPaperId, guestName } = body

    if (!sessionId || !examPaperId) {
      return NextResponse.json({ error: 'Missing sessionId or examPaperId' }, { status: 400 })
    }

    // Check if user is authenticated OR guestName is provided
    if (!user && !guestName) {
      return NextResponse.json({ error: 'Unauthorized. Please login or provide a guest name.' }, { status: 401 })
    }

    // Check if session exists and is active
    const session = await prisma.examSession.findUnique({
      where: { id: sessionId },
    })

    if (!session || session.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'Kỳ thi không tồn tại hoặc đã kết thúc' }, { status: 400 })
    }

    // Check if user already has a submission for this paper in this session
    // (Only for logged-in users, guests create new submissions each time or we check by name)
    if (user) {
      const existing = await prisma.submission.findFirst({
        where: {
          userId: user.id,
          sessionId: sessionId,
          examPaperId: examPaperId,
        }
      })

      if (existing) {
         if (existing.status === 'IN_PROGRESS') {
           return NextResponse.json({ submissionId: existing.id })
         }
         return NextResponse.json({ error: 'Bạn đã nộp bài thi này rồi' }, { status: 400 })
      }
    }

    // Create new submission (for User or Guest)
    const submission = await prisma.submission.create({
      data: {
        userId: user?.id || null,
        guestName: !user ? guestName : null,
        guestCode: !user ? session.code : null,
        sessionId: sessionId,
        examPaperId: examPaperId,
        status: 'IN_PROGRESS',
      }
    })

    return NextResponse.json({ submissionId: submission.id })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
