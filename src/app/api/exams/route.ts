import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const auth = await verifyAuth(request)
    if (!auth || auth.role === 'MEMBER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const exams = await prisma.examPaper.findMany({
      include: {
        createdBy: { select: { fullName: true } },
        _count: { select: { questions: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(exams)
  } catch (error) {
    console.error('Fetch exams error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const auth = await verifyAuth(request)
    if (!auth || auth.role === 'MEMBER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, topic, durationMinutes, questionIds, status } = body

    const exam = await prisma.examPaper.create({
      data: {
        name,
        topic,
        durationMinutes,
        status: status || 'DRAFT',
        createdById: auth.id,
        questions: {
          create: questionIds.map((qId: string, index: number) => ({
            questionId: qId,
            order: index,
            score: 1 // Default score per question
          }))
        }
      }
    })

    return NextResponse.json(exam)
  } catch (error) {
    console.error('Create exam error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
