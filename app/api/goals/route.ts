import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const goal = await prisma.goal.findFirst({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(goal)
}

export async function POST(req: Request) {
  const { testDate } = await req.json()
  if (!testDate) return NextResponse.json({ error: 'testDate required' }, { status: 400 })
  await prisma.goal.deleteMany()
  const goal = await prisma.goal.create({ data: { testDate: new Date(testDate) } })
  return NextResponse.json(goal, { status: 201 })
}

export async function DELETE() {
  await prisma.goal.deleteMany()
  return NextResponse.json({ ok: true })
}
