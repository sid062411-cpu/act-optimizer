import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  const { testId } = await req.json()
  const attempt = await prisma.testAttempt.create({ data: { testId } })
  return NextResponse.json(attempt, { status: 201 })
}
