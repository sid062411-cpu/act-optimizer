import { prisma } from '@/lib/db'
import { computeSectionStats, computeScoreEntries } from '@/lib/analytics'
import { ScoreTrendChart } from '@/components/ScoreTrendChart'
import { WeakPointsChart } from '@/components/WeakPointsChart'
import { PredictionCard } from '@/components/PredictionCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const results = await prisma.testResult.findMany({ orderBy: { date: 'asc' } })

  if (results.length === 0) {
    return (
      <main className="p-6 max-w-2xl mx-auto text-center mt-16">
        <h1 className="text-3xl font-bold mb-4">ACT Optimizer</h1>
        <p className="text-muted-foreground mb-6">No tests logged yet. Log your first practice test to get started.</p>
        <Link href="/log" className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
          Log First Test
        </Link>
      </main>
    )
  }

  const stats = [
    computeSectionStats('english', results.map((r) => r.englishScore)),
    computeSectionStats('math',    results.map((r) => r.mathScore)),
    computeSectionStats('reading', results.map((r) => r.readingScore)),
  ]
  const entries = computeScoreEntries(results)

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">ACT Optimizer</h1>
      <Card>
        <CardHeader><CardTitle>Score Trend</CardTitle></CardHeader>
        <CardContent><ScoreTrendChart data={entries} /></CardContent>
      </Card>
      <section>
        <h2 className="text-xl font-semibold mb-4">Weak Points &amp; Prediction</h2>
        <PredictionCard stats={stats} />
      </section>
      <Card>
        <CardHeader><CardTitle>Section Gaps</CardTitle></CardHeader>
        <CardContent><WeakPointsChart stats={stats} /></CardContent>
      </Card>
    </main>
  )
}
