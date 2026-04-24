export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const auth = await verifyAuth(request)
    if (!auth || auth.role === 'MEMBER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    const categories = await prisma.questionCategory.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      },
      include: {
        // Since the schema doesn't have a 'creator' field for categories yet, we will use a placeholder or update schema
        _count: { select: { questions: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Map to SRS requirement fields: Category name, code (using ID), Creator (placeholder), Created Date
    const result = categories.map(c => ({
      id: c.id,
      name: c.name,
      code: c.id.substring(0, 8).toUpperCase(),
      creator: 'Admin',
      createdAt: c.createdAt
    }))

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const auth = await verifyAuth(request)
    if (!auth || auth.role === 'MEMBER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, description } = await request.json()
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

    const category = await prisma.questionCategory.create({
      data: { name, description }
    })

    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
