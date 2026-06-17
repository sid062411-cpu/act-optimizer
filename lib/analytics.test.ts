import {
  computeComposite,
  computeGap,
  computeTrend,
  computeTestsNeeded,
  computeImprovementRate,
  computeProjectedDate,
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
    expect(computeTrend([20, 22, 28, 30, 33])).toBe('up')
  })
  it('returns down when recent average is lower than prior by more than 1', () => {
    expect(computeTrend([34, 33, 30, 28, 25])).toBe('down')
  })
  it('returns stable when difference is 1 or less', () => {
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
    expect(computeTestsNeeded([23, 30, 34])).toBe(1)
  })
  it('returns 0 when latest score is already 36', () => {
    expect(computeTestsNeeded([30, 36])).toBe(0)
  })
})

describe('computeImprovementRate', () => {
  it('returns null when fewer than 2 scores', () => {
    expect(computeImprovementRate([34])).toBeNull()
  })
  it('computes average improvement per test to 1 decimal', () => {
    // improvements: [7, 4], avg = 5.5
    expect(computeImprovementRate([23, 30, 34])).toBe(5.5)
  })
  it('returns negative rate when scores are declining', () => {
    // improvements: [-2, -3], avg = -2.5
    expect(computeImprovementRate([34, 32, 29])).toBe(-2.5)
  })
})

describe('computeProjectedDate', () => {
  it('returns null when fewer than 2 dates', () => {
    expect(computeProjectedDate([new Date()], [34])).toBeNull()
  })
  it('returns null when improvement is zero or negative', () => {
    const dates = [new Date('2026-06-01'), new Date('2026-06-03')]
    expect(computeProjectedDate(dates, [34, 34])).toBeNull()
  })
  it('returns a future Date when there is positive improvement and gap remaining', () => {
    const dates = [new Date('2026-06-01'), new Date('2026-06-03'), new Date('2026-06-05')]
    const result = computeProjectedDate(dates, [23, 30, 34])
    expect(result).toBeInstanceOf(Date)
    expect(result!.getTime()).toBeGreaterThan(Date.now())
  })
})
