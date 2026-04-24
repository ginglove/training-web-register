import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const auth = await verifyAuth(request)
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // 'PENDING' or 'GRADED'
    const search = searchParams.get('search') || ''

    // For simplicity, we fetch sessions where the user is an assigned grader
    // and the session status is DONE (as per SRS 4.2.6.1)
    const sessions = await prisma.session.findMany({
      where: {
        status: 'DONE',
        assignedGraders: {
          some: {
            id: auth.id
          }
        },
        name: {
          contains: search,
          mode: 'insensitive'
        }
      },
      include: {
        assignedGraders: {
          select: {
            fullName: true,
            username: true
          }
        }
      }
    })

    // Map to SRS format
    const result = sessions.map(s => ({
      id: s.id,
      name: s.name,
      assignedBy: 'System', // Placeholder as schema doesn't track "who" assigned
      status: 'Chưa chấm xong' // Logic for graded vs pending would go here
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error('Fetch assigned sessions error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
