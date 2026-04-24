import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const submission = await prisma.submission.findUnique({
      where: { id: params.id },
      include: {
        examPaper: {
          include: {
            questions: {
              include: {
                question: {
                  include: { options: { select: { id: true, content: true } } }
                }
              },
              orderBy: { order: 'asc' }
            }
          }
        },
        answers: true
      }
    })

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    return NextResponse.json(submission)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { answers, status } = await req.json()
    
    // answers should be an array: { questionId, answerText, selectedOptionIds }
    
    await prisma.$transaction(async (tx) => {
      // Upsert answers
      for (const ans of answers) {
        await tx.submissionAnswer.upsert({
          where: {
            submissionId_questionId: {
              submissionId: params.id,
              questionId: ans.questionId
            }
          },
          update: {
            answerText: ans.answerText,
            selectedOptionIds: ans.selectedOptionIds || []
          },
          create: {
            submissionId: params.id,
            questionId: ans.questionId,
            answerText: ans.answerText,
            selectedOptionIds: ans.selectedOptionIds || []
          }
        })
      }

      // Auto-grade MCQs if status is SUBMITTED
      let totalScore = null
      if (status === 'SUBMITTED') {
        const submission = await tx.submission.findUnique({
          where: { id: params.id },
          include: { examPaper: { include: { questions: { include: { question: { include: { options: true } } } } } } }
        })

        if (submission) {
           let mcqScore = 0
           let hasEssay = false

           for (const item of submission.examPaper.questions) {
              if (item.question.type === 'MULTIPLE_CHOICE') {
                 const correctOptionIds = item.question.options.filter(o => o.isCorrect).map(o => o.id)
                 const studentAns = answers.find((a: any) => a.questionId === item.questionId)
                 if (studentAns) {
                    const studentSelected = studentAns.selectedOptionIds || []
                    const isCorrect = studentSelected.length === correctOptionIds.length && 
                                      studentSelected.every((id: string) => correctOptionIds.includes(id))
                    
                    if (isCorrect) {
                       mcqScore += item.score
                       await tx.submissionAnswer.update({
                          where: { submissionId_questionId: { submissionId: params.id, questionId: item.questionId } },
                          data: { score: item.score }
                       })
                    } else {
                       await tx.submissionAnswer.update({
                          where: { submissionId_questionId: { submissionId: params.id, questionId: item.questionId } },
                          data: { score: 0 }
                       })
                    }
                 }
              } else {
                 hasEssay = true
              }
           }
           if (!hasEssay) {
              totalScore = mcqScore
           }
        }
      }

      await tx.submission.update({
        where: { id: params.id },
        data: { 
          status,
          ...(status === 'SUBMITTED' ? { submittedAt: new Date() } : {}),
          ...(totalScore !== null ? { totalScore, status: 'GRADED' } : {})
        }
      })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
