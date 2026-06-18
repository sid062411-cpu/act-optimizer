import { prisma } from '@/lib/db'
import { getPercentile } from '@/lib/actScales'

export const dynamic = 'force-dynamic'

export default async function InsightsPage() {
  const results = await prisma.testResult.findMany({ orderBy: { date: 'asc' } })

  if (results.length === 0) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-10 text-center">
        <p className="text-muted-foreground mt-20">Log some tests first to see insights.</p>
      </main>
    )
  }

  // Personal records
  const bestComposite = Math.max(...results.map((r) => r.compositeScore))
  const bestEnglish   = Math.max(...results.map((r) => r.englishScore))
  const bestMath      = Math.max(...results.map((r) => r.mathScore))
  const bestReading   = Math.max(...results.map((r) => r.readingScore))
  const totalImprovement = results[results.length - 1].compositeScore - results[0].compositeScore

  // Accuracy rates per test
  const accuracy = results.map((r, i) => ({
    label: `Test ${i + 1}`,
    english: Math.round((r.englishRaw / 75) * 100),
    math:    Math.round((r.mathRaw    / 60) * 100),
    reading: Math.round((r.readingRaw / 40) * 100),
  }))

  // Missed question frequency
  const missedFreq: Record<string, Record<number, number>> = { english: {}, math: {}, reading: {} }
  for (const r of results) {
    const missed = JSON.parse(r.missedQuestions || '{}') as Record<string, number[]>
    for (const section of ['english', 'math', 'reading'] as const) {
      for (const q of (missed[section] || [])) {
        missedFreq[section][q] = (missedFreq[section][q] || 0) + 1
      }
    }
  }

  // Repeated misses (missed in 2+ tests)
  const repeatedMisses = {
    english: Object.entries(missedFreq.english).filter(([, c]) => c >= 2).sort((a, b) => b[1] - a[1]),
    math:    Object.entries(missedFreq.math).filter(([, c]) => c >= 2).sort((a, b) => b[1] - a[1]),
    reading: Object.entries(missedFreq.reading).filter(([, c]) => c >= 2).sort((a, b) => b[1] - a[1]),
  }
  const hasRepeats = Object.values(repeatedMisses).some((arr) => arr.length > 0)

  // Study topic impact
  const topicMap: Record<string, { total: number; count: number }> = {}
  for (let i = 1; i < results.length; i++) {
    const topics = JSON.parse(results[i].studyTopics || '[]') as string[]
    const delta = results[i].compositeScore - results[i - 1].compositeScore
    for (const t of topics) {
      if (!topicMap[t]) topicMap[t] = { total: 0, count: 0 }
      topicMap[t].total += delta
      topicMap[t].count++
    }
  }
  const topicImpact = Object.entries(topicMap)
    .map(([topic, { total, count }]) => ({ topic, avg: Math.round((total / count) * 10) / 10, count }))
    .sort((a, b) => b.avg - a.avg)

  const pct = getPercentile(bestComposite)

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold mb-1">Insights</h1>
        <p className="text-muted-foreground">Deep analysis of your ACT performance across {results.length} tests.</p>
      </div>

      {/* Personal Records */}
      <section>
        <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-widest mb-4">Personal Records</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Best Composite', value: bestComposite, sub: `Top ${100 - pct + 1}%`, color: 'text-primary' },
            { label: 'Best English',   value: bestEnglish,   sub: '/ 36', color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Best Math',      value: bestMath,      sub: '/ 36', color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Best Reading',   value: bestReading,   sub: '/ 36', color: 'text-amber-600 dark:text-amber-400' },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="bg-white dark:bg-card rounded-2xl border border-border/60 shadow-sm p-5 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{label}</p>
              <p className={`text-5xl font-extrabold ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{sub}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-white dark:bg-card rounded-2xl border border-border/60 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-2xl">🚀</div>
          <div>
            <p className="font-bold text-lg">+{totalImprovement} points overall</p>
            <p className="text-sm text-muted-foreground">
              From {results[0].compositeScore} on Test 1 to {results[results.length - 1].compositeScore} on Test {results.length}
            </p>
          </div>
        </div>
      </section>

      {/* Accuracy Rates */}
      <section>
        <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-widest mb-4">Accuracy Rate per Test</h2>
        <div className="bg-white dark:bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-foreground">Test</th>
                <th className="text-left px-5 py-3 font-semibold text-blue-600 dark:text-blue-400">English</th>
                <th className="text-left px-5 py-3 font-semibold text-emerald-600 dark:text-emerald-400">Math</th>
                <th className="text-left px-5 py-3 font-semibold text-amber-600 dark:text-amber-400">Reading</th>
              </tr>
            </thead>
            <tbody>
              {accuracy.map((row, i) => (
                <tr key={i} className="border-t border-border/50">
                  <td className="px-5 py-3 font-medium">{row.label}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${row.english}%` }} />
                      </div>
                      <span className="tabular-nums">{row.english}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${row.math}%` }} />
                      </div>
                      <span className="tabular-nums">{row.math}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${row.reading}%` }} />
                      </div>
                      <span className="tabular-nums">{row.reading}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Repeated Misses */}
      {hasRepeats && (
        <section>
          <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-widest mb-4">Repeated Missed Questions</h2>
          <p className="text-sm text-muted-foreground mb-4">Questions you&apos;ve missed on 2 or more tests — these are your priority practice targets.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: 'english', label: 'English', color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300', items: repeatedMisses.english },
              { key: 'math',    label: 'Math',    color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300', items: repeatedMisses.math },
              { key: 'reading', label: 'Reading', color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300', items: repeatedMisses.reading },
            ].map(({ key, label, color, items }) => (
              <div key={key} className="bg-white dark:bg-card rounded-2xl border border-border/60 shadow-sm p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{label}</p>
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No repeated misses yet</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {items.map(([q, count]) => (
                      <span key={q} className={`px-2.5 py-1 rounded-full text-xs font-bold ${color}`}>
                        Q{q} ×{count}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Study Topic Impact */}
      {topicImpact.length > 0 && (
        <section>
          <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-widest mb-4">Study Topic Impact</h2>
          <p className="text-sm text-muted-foreground mb-4">Average composite score change on tests where you studied each topic.</p>
          <div className="bg-white dark:bg-card rounded-2xl border border-border/60 shadow-sm divide-y divide-border/50">
            {topicImpact.map(({ topic, avg, count }) => (
              <div key={topic} className="flex items-center justify-between px-5 py-3">
                <div>
                  <span className="font-medium text-sm">{topic}</span>
                  <span className="text-xs text-muted-foreground ml-2">{count} test{count !== 1 ? 's' : ''}</span>
                </div>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  avg > 0 ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' :
                  avg < 0 ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {avg > 0 ? '+' : ''}{avg} pts
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {!hasRepeats && topicImpact.length === 0 && (
        <div className="bg-muted/50 rounded-2xl p-8 text-center">
          <p className="text-4xl mb-3">📝</p>
          <p className="font-medium">Log missed questions and study topics when you log tests</p>
          <p className="text-sm text-muted-foreground mt-1">Insights will appear here once you have that data.</p>
        </div>
      )}
    </main>
  )
}
