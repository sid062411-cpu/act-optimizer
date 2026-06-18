import type { SectionStats } from '@/types'

const TREND_LABEL: Record<string, string> = { up: '↑ Improving', stable: '→ Stable', down: '↓ Declining' }
const TREND_COLOR: Record<string, string> = { up: 'text-emerald-600 dark:text-emerald-400', stable: 'text-amber-600 dark:text-amber-400', down: 'text-red-500 dark:text-red-400' }

const STUDY_TIPS: Record<string, string> = {
  english: 'Punctuation, sentence structure & rhetorical skills',
  math:    'Algebra, functions & coordinate geometry',
  reading: 'Main idea, inference & author purpose questions',
}

const SECTION_COLOR: Record<string, string> = {
  english: 'bg-blue-500',
  math:    'bg-emerald-500',
  reading: 'bg-amber-500',
}

export function PredictionCard({ stats }: { stats: SectionStats[] }) {
  const sorted = [...stats].sort((a, b) => b.gap - a.gap)
  const prioritySection = sorted[0]?.gap > 0 ? sorted[0].section : null

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {sorted.map((s) => {
        const pct = Math.round((s.latestScore / 36) * 100)
        const isPriority = s.section === prioritySection

        return (
          <div
            key={s.section}
            className={`bg-white dark:bg-card rounded-2xl border shadow-sm p-5 space-y-4 ${
              isPriority ? 'border-primary/40 ring-1 ring-primary/20' : 'border-border/60'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${SECTION_COLOR[s.section]}`} />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {s.section}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                {isPriority && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    Priority
                  </span>
                )}
                {s.gap === 0 ? (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">Mastered ✓</span>
                ) : s.trend ? (
                  <span className={`text-xs font-semibold ${TREND_COLOR[s.trend]}`}>{TREND_LABEL[s.trend]}</span>
                ) : null}
              </div>
            </div>

            {/* Score */}
            <div className="flex items-end gap-1">
              <span className="text-5xl font-extrabold leading-none">{s.latestScore}</span>
              <span className="text-xl font-bold text-muted-foreground mb-1">/ 36</span>
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${SECTION_COLOR[s.section]}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{pct}% to 36</span>
                {s.improvementRate !== null && (
                  <span className={s.improvementRate > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}>
                    avg {s.improvementRate > 0 ? '+' : ''}{s.improvementRate} pts/test
                  </span>
                )}
              </div>
            </div>

            {/* Prediction */}
            {s.gap > 0 && (
              <div className="pt-1 border-t border-border/50 space-y-1">
                {s.testsNeeded !== null ? (
                  <p className="text-sm font-semibold">~{s.testsNeeded} more test{s.testsNeeded !== 1 ? 's' : ''} to reach 36</p>
                ) : (
                  <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Score plateauing — mix up your practice</p>
                )}
                <p className="text-xs text-muted-foreground">Focus: {STUDY_TIPS[s.section]}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
