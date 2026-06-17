export type Question = {
  id: number
  prompt: string
  choices: { A: string; B: string; C: string; D: string; E?: string }
  answer: 'A' | 'B' | 'C' | 'D' | 'E'
  passage?: string
}

export type GeneratedTestContent = {
  english: Question[]
  math: Question[]
  reading: Question[]
}

export type SectionKey = 'english' | 'math' | 'reading'

export type SectionStats = {
  section: SectionKey
  averageScore: number
  latestScore: number
  gap: number
  trend: 'up' | 'stable' | 'down' | null
  testsNeeded: number | null
}

export type ScoreEntry = {
  date: string
  englishScore: number
  mathScore: number
  readingScore: number
  compositeScore: number
}
