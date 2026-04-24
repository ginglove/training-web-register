export const dynamic = "force-dynamic"
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
    const search = searchParams.get('search') || ''

    // Fetch sessions where the user is an assigned grader
    // and the session status is ENDED
    const sessions = await prisma.examSession.findMany({
      where: {
        status: 'ENDED',
        participants: {
          some: {
            assignedGraderId: auth.id
          }
        },
        name: {
          contains: search,
          mode: 'insensitive'
        }
      },
      include: {
        createdBy: {
          select: {
            fullName: true
          }
        }
      }
    })

    // Map to SRS format
    const result = sessions.map(s => ({
      id: s.id,
      name: s.name,
      assignedBy: s.createdBy?.fullName || 'Manager',
      status: 'Chưa chấm xong'
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error('Fetch assigned sessions error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
