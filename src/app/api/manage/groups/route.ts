export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const auth = await verifyAuth(request)
    if (!auth || auth.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const groups = await prisma.userGroup.findMany({
      include: {
        createdBy: { select: { fullName: true } },
        _count: { select: { members: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(groups)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const auth = await verifyAuth(request)
    if (!auth || auth.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, description } = await request.json()
    if (!name) return NextResponse.json({ error: 'Group name is required' }, { status: 400 })

    const existing = await prisma.userGroup.findUnique({ where: { name } })
    if (existing) return NextResponse.json({ error: 'Group name is existed' }, { status: 400 })

    const group = await prisma.userGroup.create({
      data: { name, description, createdById: auth.id }
    })

    return NextResponse.json(group)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
