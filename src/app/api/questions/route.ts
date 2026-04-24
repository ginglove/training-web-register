export const dynamic = "force-dynamic"
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest, requireRole } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!requireRole(user, ['ADMIN', 'MANAGER'])) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const questions = await prisma.question.findMany({
      include: {
        category: { select: { name: true } },
        _count: { select: { options: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(questions)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req)
    if (!requireRole(user, ['ADMIN', 'MANAGER'])) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const data = await req.json()
    const { content, type, difficulty, categoryName, options } = data

    // Find or create category
    let category = await prisma.questionCategory.findUnique({
      where: { name: categoryName },
    })

    if (!category) {
      category = await prisma.questionCategory.create({
        data: { name: categoryName },
      })
    }

    const question = await prisma.question.create({
      data: {
        content,
        type,
        difficulty,
        categoryId: category.id,
        createdById: user!.id,
        options: {
          create: options?.map((opt: any, index: number) => ({
            content: opt.content,
            isCorrect: opt.isCorrect,
            order: index,
          })) || [],
        },
      },
    })

    return NextResponse.json(question)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 })
  }
}
