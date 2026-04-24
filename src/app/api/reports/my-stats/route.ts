import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const participants = await prisma.sessionParticipant.findMany({
      where: { userId: user.id },
    })

    const submissions = await prisma.submission.findMany({
      where: { userId: user.id },
    })

    const totalSessions = participants.length
    const completedExams = submissions.filter(s => s.status === 'GRADED' || s.status === 'SUBMITTED').length
    const pendingExams = submissions.filter(s => s.status === 'IN_PROGRESS').length
    
    const gradedSubmissions = submissions.filter(s => s.totalScore !== null)
    const avgScore = gradedSubmissions.length > 0 
      ? gradedSubmissions.reduce((acc, curr) => acc + (curr.totalScore || 0), 0) / gradedSubmissions.length 
      : 0

    return NextResponse.json({
      totalSessions,
      completedExams,
      pendingExams,
      avgScore
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
