export const dynamic = "force-dynamic"
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

    const source = await prisma.examSession.findUnique({
      where: { id: params.id },
      include: { examPapers: true }
    })

    if (!source) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const newCode = Math.random().toString(36).substring(2, 12).toUpperCase()
    
    const clone = await prisma.examSession.create({
      data: {
        name: `Copy of ${source.name}`,
        code: newCode,
        status: 'UPCOMING',
        startDate: source.startDate,
        endDate: source.endDate,
        createdById: auth.id,
        examPapers: {
          create: source.examPapers.map(p => ({
            paperId: p.paperId
          }))
        }
      }
    })

    return NextResponse.json(clone)
  } catch (error) {
    console.error('Clone session error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
