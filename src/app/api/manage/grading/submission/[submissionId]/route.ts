export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { submissionId: string } }
) {
  try {
    const auth = await verifyAuth(request)
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const submissionId = params.submissionId

    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        examPaper: {
          select: { name: true }
        },
        answers: {
          where: {
            question: { type: 'ESSAY' }
          },
          include: {
            question: {
              select: { content: true, difficulty: true }
            }
          }
        }
      }
    })

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    // Enhance answers with maxScore from ExamPaperQuestion
    const examPaperId = submission.examPaperId
    const resultAnswers = await Promise.all(submission.answers.map(async (ans: any) => {
      const epq = await prisma.examPaperQuestion.findUnique({
        where: {
          examPaperId_questionId: {
            examPaperId: examPaperId,
            questionId: ans.questionId
          }
        },
        select: { score: true }
      })
      return {
        ...ans,
        maxScore: epq?.score || 10
      }
    }))

    return NextResponse.json({ ...submission, answers: resultAnswers })
  } catch (error) {
    console.error('Fetch submission details error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { submissionId: string } }
) {
  try {
    const auth = await verifyAuth(request)
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const submissionId = params.submissionId
    const body = await request.json()
    const { grades } = body // Array of { answerId: string, score: number }

    // Update each answer
    for (const item of grades) {
      await prisma.submissionAnswer.update({
        where: { id: item.answerId },
        data: {
          score: item.score,
          graderId: auth.id,
          gradedAt: new Date()
        }
      })
    }

    // Check if all essay questions are graded to update submission status
    const ungraded = await prisma.submissionAnswer.count({
      where: {
        submissionId: submissionId,
        question: { type: 'ESSAY' },
        score: null
      }
    })

    if (ungraded === 0) {
      // Calculate total score if all are graded
      const allAnswers = await prisma.submissionAnswer.findMany({
        where: { submissionId: submissionId }
      })
      const totalScore = allAnswers.reduce((sum, a) => sum + (a.score || 0), 0)

      await prisma.submission.update({
        where: { id: submissionId },
        data: {
          status: 'GRADED',
          totalScore: totalScore
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submit grades error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
