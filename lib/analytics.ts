import type { SectionKey, SectionStats, ScoreEntry } from '@/types'

export function computeComposite(english: number, math: number, reading: number): number {
  return Math.round((english + math + reading) / 3)
}

export function computeGap(scores: number[]): number {
  if (scores.length === 0) return 36
  const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length
  return Math.max(0, 36 - Math.round(avg))
}

export function computeTrend(scores: number[]): 'up' | 'stable' | 'down' | null {
  if (scores.length < 4) return null
  const recent = scores.slice(-3)
  const prior = scores.slice(0, -3)
  const recentAvg = recent.reduce((s, x) => s + x, 0) / recent.length
  const priorAvg = prior.reduce((s, x) => s + x, 0) / prior.length
  const diff = recentAvg - priorAvg
  if (diff > 1) return 'up'
  if (diff < -1) return 'down'
  return 'stable'
}

export function computeTestsNeeded(scores: number[]): number | null {
  if (scores.length < 2) return null
  const latest = scores[scores.length - 1]
  if (latest >= 36) return 0
  const improvements = scores.slice(1).map((s, i) => s - scores[i])
  const avgImprovement = improvements.reduce((s, x) => s + x, 0) / improvements.length
  if (avgImprovement <= 0) return null
  return Math.ceil((36 - latest) / avgImprovement)
}

export function computeImprovementRate(scores: number[]): number | null {
  if (scores.length < 2) return null
  const improvements = scores.slice(1).map((s, i) => s - scores[i])
  const avg = improvements.reduce((s, x) => s + x, 0) / improvements.length
  return Math.round(avg * 10) / 10
}

export function computeProjectedDate(dates: Date[], scores: number[]): Date | null {
  const testsNeeded = computeTestsNeeded(scores)
  if (testsNeeded === null || testsNeeded === 0) return null
  if (dates.length < 2) return null
  const dayDiffs = dates.slice(1).map((d, i) =>
    (d.getTime() - dates[i].getTime()) / (1000 * 60 * 60 * 24)
  )
  const avgDays = dayDiffs.reduce((s, x) => s + x, 0) / dayDiffs.length
  const projected = new Date()
  projected.setDate(projected.getDate() + Math.round(testsNeeded * avgDays))
  return projected
}

export function computeSectionStats(section: SectionKey, scores: number[]): SectionStats {
  return {
    section,
    averageScore: scores.length
      ? Math.round(scores.reduce((s, x) => s + x, 0) / scores.length)
      : 0,
    latestScore: scores.length ? scores[scores.length - 1] : 0,
    gap: computeGap(scores),
    trend: computeTrend(scores),
    testsNeeded: computeTestsNeeded(scores),
    improvementRate: computeImprovementRate(scores),
  }
}

export function computeScoreEntries(
  results: {
    date: Date
    englishScore: number
    mathScore: number
    readingScore: number
    compositeScore: number
  }[]
): ScoreEntry[] {
  return results.map((r, i) => ({
    label: `Test ${i + 1}`,
    date: r.date.toISOString().split('T')[0],
    englishScore: r.englishScore,
    mathScore: r.mathScore,
    readingScore: r.readingScore,
    compositeScore: r.compositeScore,
  }))
}
