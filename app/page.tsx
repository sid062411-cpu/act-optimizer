import { prisma } from '@/lib/db'
import { computeSectionStats, computeScoreEntries, computeProjectedDate, computeTestsNeeded } from '@/lib/analytics'
import { getPercentile } from '@/lib/actScales'
import { ScoreTrendChart } from '@/components/ScoreTrendChart'
import { PredictionCard } from '@/components/PredictionCard'
import { GoalCard } from '@/components/GoalCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const [results, goal] = await Promise.all([
    prisma.testResult.findMany({ orderBy: { date: 'asc' } }),
    prisma.goal.findFirst({ orderBy: { createdAt: 'desc' } }),
  ])

  if (results.length === 0) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h1 className="text-3xl font-extrabold mb-2">Welcome to ACT Optimizer</h1>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Log your first practice test to start tracking your path to a 36.
        </p>
        <Link href="/log" className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:opacity-90 transition-opacity">
          Log First Test
        </Link>
      </main>
    )
  }

  const latest = results[results.length - 1]
  const prev = results.length > 1 ? results[results.length - 2] : null
  const delta = prev !== null ? latest.compositeScore - prev.compositeScore : null
  const compositeGap = 36 - latest.compositeScore
  const compositePct = Math.round((latest.compositeScore / 36) * 100)
  const percentile = getPercentile(latest.compositeScore)

  const dates = results.map((r) => r.date)
  const compositeScores = results.map((r) => r.compositeScore)
  const projectedDate = computeProjectedDate(dates, compositeScores)
  const testsNeeded = computeTestsNeeded(compositeScores)

  const avgDaysBetweenTests = dates.length >= 2
    ? dates.slice(1).reduce((sum, d, i) =>
        sum + (d.getTime() - dates[i].getTime()) / (1000 * 60 * 60 * 24), 0
      ) / (dates.length - 1)
    : null

  const stats = [
    computeSectionStats('english', results.map((r) => r.englishScore)),
    computeSectionStats('math',    results.map((r) => r.mathScore)),
    computeSectionStats('reading', results.map((r) => r.readingScore)),
  ]
  const entries = computeScoreEntries(results)

  const goalForClient = goal
    ? { id: goal.id, testDate: goal.testDate.toISOString() }
    : null

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">

      {/* Hero */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-1">Current Composite</p>
          <div className="flex items-end gap-3 flex-wrap">
            <span className="text-7xl font-extrabold leading-none">{latest.compositeScore}</span>
            <span className="text-3xl font-bold text-muted-foreground mb-2">/ 36</span>
            <span className="mb-2 px-3 py-1 rounded-full text-sm font-bold bg-primary/10 text-primary">
              {percentile}th percentile
            </span>
            {delta !== null && (
              <span className={`mb-2 px-3 py-1 rounded-full text-sm font-bold ${
                delta > 0 ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' :
                delta < 0 ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400' :
                'bg-muted text-muted-foreground'
              }`}>
                {delta > 0 ? `+${delta}` : delta} from last test
              </span>
            )}
          </div>
          <div className="mt-4 space-y-1.5 max-w-md">
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${compositePct}%` }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{compositeGap === 0 ? '🎉 Perfect score!' : `${compositeGap} point${compositeGap !== 1 ? 's' : ''} to 36`}</span>
              <span>
                Last tested {latest.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                {' · '}{results.length} test{results.length !== 1 ? 's' : ''} logged
              </span>
            </div>
          </div>
          {projectedDate && (
            <p className="mt-2 text-sm text-muted-foreground">
              On track to reach 36 by{' '}
              <span className="font-semibold text-foreground">
                {projectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              {' '}at your current pace
            </p>
          )}
        </div>
        <Link href="/log" className="px-5 py-2.5 rounded-full bg-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity shrink-0 self-start">
          + Log Test
        </Link>
      </div>

      {/* Goal tracker */}
      <GoalCard
        goal={goalForClient}
        testsNeeded={testsNeeded}
        avgDaysBetweenTests={avgDaysBetweenTests}
      />

      <a
        href="https://www.act.org/content/act/en/products-and-services/the-act/registration.html"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border font-semibold text-sm hover:bg-muted transition-colors"
      >
        Register for the ACT
        <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>

      {/* Section cards */}
      <section>
        <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-widest mb-4">Section Breakdown</h2>
        <PredictionCard stats={stats} />
      </section>

      {/* Score trend */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Score Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ScoreTrendChart data={entries} />
        </CardContent>
      </Card>

    </main>
  )
}
