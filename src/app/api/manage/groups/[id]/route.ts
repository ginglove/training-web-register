import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await verifyAuth(request)
    if (!auth || auth.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const group = await prisma.userGroup.findUnique({
      where: { id: params.id },
      include: {
        members: {
          include: {
            user: {
              select: { id: true, username: true, email: true, fullName: true, role: true }
            }
          }
        }
      }
    })

    if (!group) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json(group)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await verifyAuth(request)
    if (!auth || auth.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userIds } = await request.json()

    // Replace all members
    await prisma.$transaction([
      prisma.groupMember.deleteMany({ where: { groupId: params.id } }),
      prisma.groupMember.createMany({
        data: userIds.map((uId: string) => ({
          groupId: params.id,
          userId: uId
        }))
      })
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update group members error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
