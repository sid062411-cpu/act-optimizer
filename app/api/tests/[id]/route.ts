import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const test = await prisma.practiceTest.findUnique({
    where: { id },
    include: {
      questions: { orderBy: [{ section: 'asc' }, { number: 'asc' }] },
    },
  })
  if (!test) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(test)
}
