import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: attemptId } = await params
  const { questionId, selected } = await req.json()
  const answer = await prisma.attemptAnswer.upsert({
    where: { attemptId_questionId: { attemptId, questionId } },
    update: { selected },
    create: { attemptId, questionId, selected },
  })
  return NextResponse.json(answer)
}
