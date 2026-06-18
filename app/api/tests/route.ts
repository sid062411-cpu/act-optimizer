import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const tests = await prisma.practiceTest.findMany({
    orderBy: { createdAt: 'asc' },
    include: { _count: { select: { questions: true } } },
  })
  return NextResponse.json(tests)
}
