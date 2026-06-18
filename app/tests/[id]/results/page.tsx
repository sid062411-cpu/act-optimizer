import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { rawToScaled, getPercentile } from '@/lib/actScales'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type Params = Promise<{ id: string }>
type SearchParams = Promise<{ attempt?: string }>

function scoreColor(scaled: number) {
  if (scaled >= 34) return 'text-emerald-600 dark:text-emerald-400'
  if (scaled >= 30) return 'text-blue-600 dark:text-blue-400'
  if (scaled >= 26) return 'text-amber-600 dark:text-amber-400'
  return 'text-red-500 dark:text-red-400'
}

export default async function ResultsPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { id: testId } = await params
  const { attempt: attemptId } = await searchParams
  if (!attemptId) notFound()

  const attempt = await prisma.testAttempt.findUnique({
    where: { id: attemptId },
    include: {
      answers: { include: { question: true } },
      test: { include: { questions: { orderBy: [{ section: 'asc' }, { number: 'asc' }] } } },
    },
  })
  if (!attempt) notFound()

  const answerMap = new Map(attempt.answers.map((a) => [a.questionId, a.selected]))

  const sections = ['english', 'math', 'reading'] as const
  const sectionMax: Record<string, number> = { english: 75, math: 60, reading: 40 }

  const sectionData = sections.map((s) => {
    const qs = attempt.test.questions.filter((q) => q.section === s)
    const correct = qs.filter((q) => answerMap.get(q.id) === q.answer).length
    const rawPct = qs.length > 0 ? Math.round((correct / qs.length) * sectionMax[s]) : 0
    const scaled = rawToScaled(s, rawPct)

    const byTopic: Record<string, { correct: number; total: number }> = {}
    for (const q of qs) {
      const t = q.topic ?? 'General'
      if (!byTopic[t]) byTopic[t] = { correct: 0, total: 0 }
      byTopic[t].total++
      if (answerMap.get(q.id) === q.answer) byTopic[t].correct++
    }

    return { section: s, qs, correct, total: qs.length, rawPct, scaled, byTopic }
  })

  const composite = Math.round(sectionData.reduce((sum, s) => sum + s.scaled, 0) / 3)
  const percentile = getPercentile(composite)

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{attempt.test.title}</p>
          <h1 className="text-3xl font-extrabold mb-1">Your Results</h1>
          <p className="text-muted-foreground text-sm">
            Finished {attempt.finishedAt
              ? new Date(attempt.finishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : 'just now'}
          </p>
        </div>
        <Link href={`/tests/${testId}/take`} className="px-5 py-2.5 rounded-full border border-border font-semibold text-sm hover:bg-muted transition-colors">
          Retake Test
        </Link>
      </div>

      {/* Composite */}
      <div className="bg-primary rounded-2xl p-6 text-white text-center shadow-md">
        <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Estimated Composite Score</p>
        <p className="text-7xl font-extrabold leading-none mb-1">{composite}</p>
        <p className="text-xl opacity-80">/ 36</p>
        <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-center gap-8">
          <div><p className="text-2xl font-bold">{percentile}th</p><p className="text-xs opacity-70">percentile</p></div>
          <div><p className="text-2xl font-bold">{36 - composite}</p><p className="text-xs opacity-70">points to 36</p></div>
        </div>
      </div>

      {/* Section scores */}
      <div className="grid grid-cols-3 gap-4">
        {sectionData.map(({ section: s, correct, total, scaled }) => (
          <div key={s} className="bg-white dark:bg-card rounded-2xl border border-border/60 shadow-sm p-5 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{s}</p>
            <p className={`text-5xl font-extrabold ${scoreColor(scaled)}`}>{scaled}</p>
            <p className="text-xs text-muted-foreground mt-1">/ 36 scaled</p>
            <p className="text-xs text-muted-foreground mt-0.5">{correct}/{total} correct</p>
          </div>
        ))}
      </div>

      {/* Topic breakdown per section */}
      {sectionData.map(({ section: s, byTopic }) => (
        <section key={s}>
          <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-widest mb-3 capitalize">{s} — Topic Breakdown</h2>
          <div className="bg-white dark:bg-card rounded-2xl border border-border/60 shadow-sm divide-y divide-border/50">
            {Object.entries(byTopic).sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total)).map(([topic, { correct, total }]) => {
              const pct = Math.round((correct / total) * 100)
              return (
                <div key={topic} className="px-5 py-3 flex items-center gap-4">
                  <span className="flex-1 text-sm font-medium">{topic}</span>
                  <span className="text-xs text-muted-foreground">{correct}/{total}</span>
                  <div className="w-28 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold w-8 text-right ${pct >= 80 ? 'text-emerald-600 dark:text-emerald-400' : pct >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-red-500 dark:text-red-400'}`}>{pct}%</span>
                </div>
              )
            })}
          </div>
        </section>
      ))}

      {/* Full question review */}
      {sections.map((s) => {
        const { qs } = sectionData.find((d) => d.section === s)!
        const missed = qs.filter((q) => answerMap.get(q.id) !== q.answer)
        if (missed.length === 0) return null
        return (
          <section key={s}>
            <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-widest mb-3 capitalize">{s} — Missed Questions</h2>
            <div className="space-y-4">
              {missed.map((q) => {
                const choices: Record<string, string> = JSON.parse(q.choices)
                const selected = answerMap.get(q.id)
                return (
                  <div key={q.id} className="bg-white dark:bg-card rounded-2xl border border-red-200 dark:border-red-900/40 shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Q{q.number}</span>
                      {q.topic && <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{q.topic}</span>}
                    </div>
                    <p className="text-sm font-medium mb-4 leading-relaxed">{q.stem}</p>
                    <div className="space-y-1.5">
                      {Object.entries(choices).map(([letter, text]) => {
                        const isCorrect = letter === q.answer
                        const isSelected = letter === selected
                        return (
                          <div
                            key={letter}
                            className={`flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl text-sm border ${
                              isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700' :
                              isSelected ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700' :
                              'border-transparent'
                            }`}
                          >
                            <span className={`font-bold shrink-0 w-4 ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : isSelected ? 'text-red-500' : 'text-muted-foreground'}`}>{letter}.</span>
                            <span className={isCorrect ? 'text-emerald-800 dark:text-emerald-200' : isSelected ? 'text-red-700 dark:text-red-300 line-through' : ''}>{text}</span>
                            {isCorrect && <span className="ml-auto text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">✓ Correct</span>}
                            {isSelected && !isCorrect && <span className="ml-auto text-xs font-bold text-red-500 shrink-0">Your answer</span>}
                          </div>
                        )
                      })}
                    </div>
                    {q.explanation && (
                      <p className="mt-3 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 leading-relaxed">
                        <span className="font-semibold">Explanation: </span>{q.explanation}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}

      <div className="flex gap-3 pb-6">
        <Link href="/tests" className="px-5 py-2.5 rounded-full border border-border font-semibold text-sm hover:bg-muted transition-colors">
          ← All Tests
        </Link>
        <Link href="/" className="px-5 py-2.5 rounded-full border border-border font-semibold text-sm hover:bg-muted transition-colors">
          Dashboard
        </Link>
      </div>
    </main>
  )
}
