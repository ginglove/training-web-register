import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { code: string } }) {
  try {
    const session = await prisma.examSession.findUnique({
      where: { code: params.code },
      include: {
        examPapers: {
          include: { paper: true }
        }
      }
    })

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    if (session.status !== 'ACTIVE') {
      return NextResponse.json({ error: 'Session is not active' }, { status: 400 })
    }

    if (session.examPapers.length === 0) {
       return NextResponse.json({ error: 'No exam paper assigned to this session' }, { status: 400 })
    }

    return NextResponse.json(session)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
