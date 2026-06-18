import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { computeComposite } from '@/lib/analytics'

type TestResultInput = {
  date: string
  englishRaw: number; englishScore: number
  mathRaw: number;    mathScore: number
  readingRaw: number; readingScore: number
  notes?: string
  studyTopics?: string[]
  missedQuestions?: Record<string, number[]>
}

export function validateTestInput(input: TestResultInput): void {
  if (input.englishRaw < 0 || input.englishRaw > 75)    throw new Error('englishRaw must be 0–75')
  if (input.mathRaw < 0    || input.mathRaw > 60)        throw new Error('mathRaw must be 0–60')
  if (input.readingRaw < 0 || input.readingRaw > 40)     throw new Error('readingRaw must be 0–40')
  if (input.englishScore < 1 || input.englishScore > 36) throw new Error('englishScore must be 1–36')
  if (input.mathScore < 1    || input.mathScore > 36)    throw new Error('mathScore must be 1–36')
  if (input.readingScore < 1 || input.readingScore > 36) throw new Error('readingScore must be 1–36')
}

export async function GET() {
  const results = await prisma.testResult.findMany({ orderBy: { date: 'asc' } })
  return NextResponse.json(results)
}

export async function POST(req: Request) {
  const body: TestResultInput = await req.json()
  try {
    validateTestInput(body)
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 })
  }
  const composite = computeComposite(body.englishScore, body.mathScore, body.readingScore)
  const result = await prisma.testResult.create({
    data: {
      date: new Date(body.date),
      englishRaw: body.englishRaw, englishScore: body.englishScore,
      mathRaw: body.mathRaw,       mathScore: body.mathScore,
      readingRaw: body.readingRaw, readingScore: body.readingScore,
      compositeScore: composite,
      source: 'MANUAL',
      notes: body.notes ?? null,
      studyTopics: JSON.stringify(body.studyTopics ?? []),
      missedQuestions: JSON.stringify(body.missedQuestions ?? {}),
    },
  })
  return NextResponse.json(result, { status: 201 })
}
