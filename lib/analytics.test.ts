import {
  computeComposite,
  computeGap,
  computeTrend,
  computeTestsNeeded,
} from './analytics'

describe('computeComposite', () => {
  it('averages three section scores and rounds', () => {
    expect(computeComposite(30, 32, 32)).toBe(31) // 94/3 = 31.3 → 31
    expect(computeComposite(34, 34, 35)).toBe(34) // 103/3 = 34.3 → 34
    expect(computeComposite(36, 36, 36)).toBe(36)
  })
})

describe('computeGap', () => {
  it('returns 36 minus rounded average', () => {
    // avg([23,30,34]) = 29, gap = 36-29 = 7
    expect(computeGap([23, 30, 34])).toBe(7)
  })
  it('returns 0 when average rounds to 36', () => {
    expect(computeGap([36, 36, 36])).toBe(0)
  })
  it('returns 36 for empty array', () => {
    expect(computeGap([])).toBe(36)
  })
})

describe('computeTrend', () => {
  it('returns null when fewer than 4 scores', () => {
    expect(computeTrend([23, 30, 34])).toBeNull()
  })
  it('returns up when recent 3 average exceeds prior average by more than 1', () => {
    // prior avg([20,22]) = 21, recent avg([28,30,33]) = 30.3, diff > 1
    expect(computeTrend([20, 22, 28, 30, 33])).toBe('up')
  })
  it('returns down when recent average is lower than prior by more than 1', () => {
    // prior avg([34,33]) = 33.5, recent avg([30,28,25]) = 27.7, diff < -1
    expect(computeTrend([34, 33, 30, 28, 25])).toBe('down')
  })
  it('returns stable when difference is 1 or less', () => {
    // prior avg([30,31]) = 30.5, recent avg([30,31,30]) = 30.3, diff ≈ -0.2
    expect(computeTrend([30, 31, 30, 31, 30])).toBe('stable')
  })
})

describe('computeTestsNeeded', () => {
  it('returns null when fewer than 2 scores', () => {
    expect(computeTestsNeeded([34])).toBeNull()
  })
  it('returns null when average improvement is 0 or negative', () => {
    expect(computeTestsNeeded([34, 34])).toBeNull()
    expect(computeTestsNeeded([34, 33])).toBeNull()
  })
  it('returns ceiling of gap divided by average improvement', () => {
    // improvements: [7, 4], avg: 5.5, latest: 34, gap: 2, ceil(2/5.5) = 1
    expect(computeTestsNeeded([23, 30, 34])).toBe(1)
  })
  it('returns 0 when latest score is already 36', () => {
    expect(computeTestsNeeded([30, 36])).toBe(0)
  })
})
