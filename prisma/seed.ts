import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.testResult.createMany({
    data: [
      {
        date: new Date('2026-06-09'),
        englishRaw: 54, englishScore: 23,
        mathRaw: 44,    mathScore: 28,
        readingRaw: 32, readingScore: 28,
        compositeScore: 26,
        source: 'EXISTING',
      },
      {
        date: new Date('2026-06-11'),
        englishRaw: 65, englishScore: 30,
        mathRaw: 53,    mathScore: 32,
        readingRaw: 35, readingScore: 32,
        compositeScore: 31,
        source: 'EXISTING',
      },
      {
        date: new Date('2026-06-13'),
        englishRaw: 69, englishScore: 34,
        mathRaw: 57,    mathScore: 34,
        readingRaw: 37, readingScore: 35,
        compositeScore: 34,
        source: 'EXISTING',
      },
    ],
  })
  console.log('Seeded 3 test results')
}

main().catch(console.error).finally(() => prisma.$disconnect())
