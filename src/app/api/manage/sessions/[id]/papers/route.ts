import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await verifyAuth(request)
    if (!auth || auth.role === 'MEMBER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { paperId } = await request.json()

    // Check if relation already exists to prevent unique constraint error
    const existing = await prisma.sessionExamPaper.findFirst({
      where: {
        sessionId: params.id,
        examPaperId: paperId
      }
    })

    if (existing) {
      return NextResponse.json({ error: 'Đề thi này đã có trong phiên thi' }, { status: 400 })
    }

    const item = await prisma.sessionExamPaper.create({
      data: {
        sessionId: params.id,
        examPaperId: paperId
      }
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error('Add paper error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
