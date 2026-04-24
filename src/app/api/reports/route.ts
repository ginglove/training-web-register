import { NextResponse } from 'next/server'
export const dynamic = "force-dynamic"
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const auth = await verifyAuth(request)
    if (!auth || auth.role === 'MEMBER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all sessions with their submissions
    const sessions = await prisma.examSession.findMany({
      include: {
        submissions: true,
        _count: {
          select: { submissions: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const sessionReports = sessions.map(s => {
      const graded = s.submissions.filter(sub => sub.status === 'GRADED')
      const totalScore = graded.reduce((acc, curr) => acc + (curr.totalScore || 0), 0)
      const avgScore = graded.length > 0 ? totalScore / graded.length : 0

      return {
        id: s.id,
        name: s.name,
        totalParticipants: s.submissions.length,
        gradedCount: graded.length,
        averageScore: parseFloat(avgScore.toFixed(1))
      }
    })

    // Global Stats
    const allSubmissions = await prisma.submission.findMany({
      where: { status: { not: 'IN_PROGRESS' } }
    })
    const allGraded = allSubmissions.filter(s => s.status === 'GRADED')
    const globalTotalScore = allGraded.reduce((acc, curr) => acc + (curr.totalScore || 0), 0)
    const globalAvgScore = allGraded.length > 0 ? globalTotalScore / allGraded.length : 0
    const completionRate = allSubmissions.length > 0 
      ? (allGraded.length / allSubmissions.length) * 100 
      : 0

    return NextResponse.json({
      reports: sessionReports,
      stats: {
        totalSubmissions: allSubmissions.length,
        averageScore: parseFloat(globalAvgScore.toFixed(1)),
        completionRate: Math.round(completionRate)
      }
    })
  } catch (error) {
    console.error('Reports API error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
