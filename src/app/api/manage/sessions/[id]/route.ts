import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await verifyAuth(request)
    if (!auth || auth.role === 'MEMBER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const session = await prisma.examSession.findUnique({
      where: { id: params.id },
      include: {
        createdBy: { select: { fullName: true } },
        examPapers: {
          include: {
            paper: {
              include: {
                _count: { select: { questions: true } }
              }
            }
          }
        }
      }
    })

    if (!session) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json(session)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
