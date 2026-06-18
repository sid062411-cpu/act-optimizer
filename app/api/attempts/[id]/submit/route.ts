import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { rawToScaled } from '@/lib/actScales'

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: attemptId } = await params
  await prisma.testAttempt.update({
    where: { id: attemptId },
    data: { finishedAt: new Date() },
  })

  const attempt = await prisma.testAttempt.findUnique({
    where: { id: attemptId },
    include: {
      answers: { include: { question: true } },
      test: { include: { questions: true } },
    },
  })
  if (!attempt) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const answerMap = new Map(attempt.answers.map((a) => [a.questionId, a.selected]))

  const sections = ['english', 'math', 'reading'] as const
  const scores: Record<string, { raw: number; total: number; scaled: number; byTopic: Record<string, { correct: number; total: number }> }> = {}

  for (const section of sections) {
    const qs = attempt.test.questions.filter((q) => q.section === section)
    let correct = 0
    const byTopic: Record<string, { correct: number; total: number }> = {}
    for (const q of qs) {
      const topic = q.topic ?? 'General'
      if (!byTopic[topic]) byTopic[topic] = { correct: 0, total: 0 }
      byTopic[topic].total++
      if (answerMap.get(q.id) === q.answer) {
        correct++
        byTopic[topic].correct++
      }
    }
    const total = qs.length
    const rawPct = total > 0 ? Math.round((correct / total) * { english: 75, math: 60, reading: 40 }[section]) : 0
    scores[section] = { raw: correct, total, scaled: rawToScaled(section, rawPct), byTopic }
  }

  return NextResponse.json({ attemptId, scores })
}
