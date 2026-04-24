export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const auth = await verifyAuth(request)
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessionId = params.sessionId

    // Fetch submissions for this session
    const submissions = await prisma.submission.findMany({
      where: {
        sessionId: sessionId,
        status: { in: ['SUBMITTED', 'GRADED'] }
      },
      include: {
        examPaper: {
          select: { name: true }
        },
        user: {
          select: { fullName: true }
        },
        answers: {
          where: {
            question: { type: 'ESSAY' }
          },
          select: { score: true }
        }
      }
    })

    const result = submissions.map(sub => {
      const essayAnswers = sub.answers
      const ungradedCount = essayAnswers.filter(a => a.score === null).length
      
      return {
        id: sub.id,
        candidateName: sub.guestName || sub.user?.fullName || 'Anonymous',
        paperName: sub.examPaper.name,
        essayToGrade: essayAnswers.length,
        ungradedCount: ungradedCount,
        status: sub.status === 'GRADED' ? 'Đã chấm' : 'Chưa chấm'
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Fetch session submissions error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
