export type SectionKey = 'english' | 'math' | 'reading'

export type SectionStats = {
  section: SectionKey
  averageScore: number
  latestScore: number
  gap: number
  trend: 'up' | 'stable' | 'down' | null
  testsNeeded: number | null
  improvementRate: number | null
}

export type ScoreEntry = {
  label: string
  date: string
  englishScore: number
  mathScore: number
  readingScore: number
  compositeScore: number
}
