import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { examCode, guestName } = await req.json()

    if (!examCode || !guestName) {
      return NextResponse.json({ error: 'Exam code and name are required' }, { status: 400 })
    }

    const session = await prisma.examSession.findUnique({
      where: { code: examCode },
      include: {
        examPapers: true
      }
    })

    if (!session || session.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'Invalid or inactive exam code' }, { status: 400 })
    }

    if (session.examPapers.length === 0) {
       return NextResponse.json({ error: 'No exam paper assigned to this session' }, { status: 400 })
    }

    // Default to the first exam paper assigned to the session
    const paperId = session.examPapers[0].paperId

    const submission = await prisma.submission.create({
      data: {
        sessionId: session.id,
        examPaperId: paperId,
        guestCode: examCode,
        guestName,
        status: 'IN_PROGRESS',
      }
    })

    return NextResponse.json({ submissionId: submission.id })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
