const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // 1. Create Users
  const adminPassword = await bcrypt.hash('admin123', 10)
  const managerPassword = await bcrypt.hash('manager123', 10)
  const memberPassword = await bcrypt.hash('member123', 10)

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@trainiq.com',
      passwordHash: adminPassword,
      fullName: 'System Administrator',
      role: 'ADMIN',
    },
  })

  const manager = await prisma.user.upsert({
    where: { username: 'manager' },
    update: {},
    create: {
      username: 'manager',
      email: 'manager@trainiq.com',
      passwordHash: managerPassword,
      fullName: 'Training Manager',
      role: 'MANAGER',
    },
  })

  const member = await prisma.user.upsert({
    where: { username: 'member' },
    update: {},
    create: {
      username: 'member',
      email: 'member@trainiq.com',
      passwordHash: memberPassword,
      fullName: 'John Employee',
      role: 'MEMBER',
    },
  })

  // 2. Create Categories
  const catSQL = await prisma.questionCategory.upsert({
    where: { name: 'SQL' },
    update: {},
    create: { name: 'SQL', description: 'Database Queries' },
  })
  
  const catReact = await prisma.questionCategory.upsert({
    where: { name: 'React' },
    update: {},
    create: { name: 'React', description: 'Frontend Framework' },
  })

  // 3. Create Questions
  const q1 = await prisma.question.create({
    data: {
      content: 'What does SQL stand for?',
      type: 'MULTIPLE_CHOICE',
      difficulty: 'EASY',
      categoryId: catSQL.id,
      createdById: admin.id,
      options: {
        create: [
          { content: 'Strong Question Language', isCorrect: false, order: 0 },
          { content: 'Structured Query Language', isCorrect: true, order: 1 },
          { content: 'Structured Question Language', isCorrect: false, order: 2 },
        ]
      }
    }
  })

  const q2 = await prisma.question.create({
    data: {
      content: 'Explain the difference between clustered and non-clustered index.',
      type: 'ESSAY',
      difficulty: 'MEDIUM',
      categoryId: catSQL.id,
      createdById: admin.id,
    }
  })

  const q3 = await prisma.question.create({
    data: {
      content: 'Which hook is used to manage state in a functional component?',
      type: 'MULTIPLE_CHOICE',
      difficulty: 'EASY',
      categoryId: catReact.id,
      createdById: admin.id,
      options: {
        create: [
          { content: 'useEffect', isCorrect: false, order: 0 },
          { content: 'useState', isCorrect: true, order: 1 },
          { content: 'useContext', isCorrect: false, order: 2 },
        ]
      }
    }
  })

  // 4. Create Exam Paper
  const paper = await prisma.examPaper.create({
    data: {
      name: 'Frontend & DB Assessment Q3',
      topic: 'Fullstack Basics',
      durationMinutes: 45,
      totalScore: 10,
      createdById: manager.id,
      questions: {
        create: [
          { questionId: q1.id, score: 2, order: 0 },
          { questionId: q3.id, score: 3, order: 1 },
          { questionId: q2.id, score: 5, order: 2 },
        ]
      }
    }
  })

  // 5. Create Session
  const session = await prisma.examSession.upsert({
    where: { code: 'DEMO-EXAM-25' },
    update: {},
    create: {
      name: 'Q3 New Hires Assessment',
      code: 'DEMO-EXAM-25',
      status: 'ACTIVE',
      startDate: new Date(Date.now() - 86400000), // Yesterday
      endDate: new Date(Date.now() + 86400000 * 7), // Next week
      createdById: manager.id,
      examPapers: {
        create: [{ paperId: paper.id }]
      },
      participants: {
        create: [{ userId: member.id }]
      }
    }
  })

  await prisma.examSession.upsert({
    where: { code: 'DEMO-VTI-EXAM-2' },
    update: {},
    create: {
      name: 'VTI Entrance Examination',
      code: 'DEMO-VTI-EXAM-2',
      status: 'ACTIVE',
      startDate: new Date(Date.now() - 86400000),
      endDate: new Date(Date.now() + 86400000 * 7),
      createdById: manager.id,
      examPapers: {
        create: [{ paperId: paper.id }]
      }
    }
  })

  console.log('Seeding finished successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
