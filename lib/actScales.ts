// Approximate ACT score conversions based on typical published forms
// Actual conversion varies slightly per test date

export const PERCENTILES: Record<number, number> = {
  36: 99, 35: 99, 34: 99, 33: 98, 32: 96, 31: 95, 30: 93, 29: 91,
  28: 88, 27: 85, 26: 82, 25: 79, 24: 74, 23: 69, 22: 63, 21: 57,
  20: 51, 19: 44, 18: 38, 17: 32, 16: 27, 15: 21, 14: 16, 13: 12,
  12: 8,  11: 6,  10: 4,  9: 3,   8: 2,   7: 1,   6: 1,
}

export function getPercentile(score: number): number {
  return PERCENTILES[Math.round(score)] ?? 1
}

// English (0–75)
const ENGLISH_CONV = [
  1, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 11,
  12, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 16, 16, 16,
  17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 21,
  22, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28,
  29, 29, 30, 30, 31, 31, 32, 32, 33, 33, 34, 35, 36,
]

// Math (0–60)
const MATH_CONV = [
  1, 10, 10, 10, 11, 11, 11, 12, 12, 12, 13, 13, 13, 14, 14, 14,
  15, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19,
  20, 20, 20, 21, 21, 21, 22, 22, 22, 23, 23, 24, 24, 25, 25,
  26, 26, 27, 27, 28, 28, 29, 29, 30, 31, 32, 33, 34, 35, 36,
]

// Reading (0–40)
const READING_CONV = [
  1, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20,
  21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28,
  29, 29, 30, 31, 32, 33, 34, 35, 36,
]

export function rawToScaled(section: 'english' | 'math' | 'reading', raw: number): number {
  const table = section === 'english' ? ENGLISH_CONV : section === 'math' ? MATH_CONV : READING_CONV
  const clamped = Math.max(0, Math.min(Math.round(raw), table.length - 1))
  return table[clamped]
}

export function rawNeededForScore(section: 'english' | 'math' | 'reading', targetScaled: number): number {
  const table = section === 'english' ? ENGLISH_CONV : section === 'math' ? MATH_CONV : READING_CONV
  const idx = table.findIndex((s) => s >= targetScaled)
  return idx === -1 ? table.length - 1 : idx
}
