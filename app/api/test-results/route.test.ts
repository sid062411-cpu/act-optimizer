import { validateTestInput } from './route'

const valid = {
  date: '2026-06-17',
  englishRaw: 54, englishScore: 23,
  mathRaw: 44,    mathScore: 28,
  readingRaw: 32, readingScore: 28,
}

describe('validateTestInput', () => {
  it('accepts valid input without throwing', () => {
    expect(() => validateTestInput(valid)).not.toThrow()
  })
  it('rejects englishRaw > 75', () => {
    expect(() => validateTestInput({ ...valid, englishRaw: 76 })).toThrow()
  })
  it('rejects mathRaw > 60', () => {
    expect(() => validateTestInput({ ...valid, mathRaw: 61 })).toThrow()
  })
  it('rejects readingRaw > 40', () => {
    expect(() => validateTestInput({ ...valid, readingRaw: 41 })).toThrow()
  })
  it('rejects scaled score of 0', () => {
    expect(() => validateTestInput({ ...valid, englishScore: 0 })).toThrow()
  })
  it('rejects scaled score of 37', () => {
    expect(() => validateTestInput({ ...valid, mathScore: 37 })).toThrow()
  })
})
