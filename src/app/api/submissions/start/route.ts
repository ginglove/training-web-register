import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { sessionId, examPaperId } = await req.json()

    if (!sessionId || !examPaperId) {
      return NextResponse.json({ error: 'Missing sessionId or examPaperId' }, { status: 400 })
    }

    // Check if session exists and is active
    const session = await prisma.examSession.findUnique({
      where: { id: sessionId },
    })

    if (!session || session.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'Kỳ thi không tồn tại hoặc đã kết thúc' }, { status: 400 })
    }

    // Check if user already has a submission for this paper in this session
    const existing = await prisma.submission.findFirst({
      where: {
        userId: user.id,
        sessionId: sessionId,
        examPaperId: examPaperId,
      }
    })

    if (existing) {
       // If in progress, return the same ID
       if (existing.status === 'IN_PROGRESS') {
         return NextResponse.json({ submissionId: existing.id })
       }
       return NextResponse.json({ error: 'Bạn đã nộp bài thi này rồi' }, { status: 400 })
    }

    // Create new submission
    const submission = await prisma.submission.create({
      data: {
        userId: user.id,
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
