import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { computeComposite } from '@/lib/analytics'
import { validateTestInput } from '../route'

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.testResult.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  try {
    validateTestInput(body)
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 })
  }
  const composite = computeComposite(body.englishScore, body.mathScore, body.readingScore)
  const result = await prisma.testResult.update({
    where: { id },
    data: {
      date: new Date(body.date),
      englishRaw: body.englishRaw, englishScore: body.englishScore,
      mathRaw: body.mathRaw,       mathScore: body.mathScore,
      readingRaw: body.readingRaw, readingScore: body.readingScore,
      compositeScore: composite,
      notes: body.notes ?? null,
      studyTopics: JSON.stringify(body.studyTopics ?? []),
      missedQuestions: JSON.stringify(body.missedQuestions ?? {}),
    },
  })
  return NextResponse.json(result)
}
