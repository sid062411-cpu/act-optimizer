import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SectionStats } from '@/types'

const TREND_ICON: Record<string, string> = { up: '↑', stable: '→', down: '↓' }

const STUDY_TIPS: Record<string, string> = {
  english: 'Production of Writing + Standard English Conventions',
  math:    'Algebra & Functions',
  reading: 'Key Ideas & Details',
}

export function PredictionCard({ stats }: { stats: SectionStats[] }) {
  const sorted = [...stats].sort((a, b) => b.gap - a.gap)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {sorted.map((s) => (
        <Card key={s.section}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-base capitalize">
              {s.section}
              {s.gap === 0
                ? <Badge className="bg-green-500">Mastered</Badge>
                : s.trend && <span className="text-lg">{TREND_ICON[s.trend]}</span>}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p>Latest: <strong>{s.latestScore}</strong> / 36</p>
            <p>Gap: <strong>{s.gap}</strong></p>
            {s.gap > 0 && (
              <>
                {s.testsNeeded !== null
                  ? <p>~{s.testsNeeded} more test{s.testsNeeded !== 1 ? 's' : ''} to reach 36</p>
                  : <p className="text-amber-600">Plateauing — change study approach</p>}
                <p className="text-muted-foreground text-xs mt-1">
                  Focus: {STUDY_TIPS[s.section]}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
