# ACT Optimizer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Next.js web app that tracks ACT practice test scores, identifies weak points, predicts time to a 36, and generates AI-powered full practice tests.

**Architecture:** Next.js 14 App Router with TypeScript. SQLite via Prisma for persistence. Claude API called exclusively from server-side API routes. Pure analytics functions (gap, trend, prediction) are isolated in `lib/analytics.ts` and unit-tested with Jest before any UI is built.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Prisma + SQLite, Anthropic SDK (`@anthropic-ai/sdk`), Recharts, Jest + ts-jest

## Global Constraints

- Next.js 14 App Router (not Pages Router). TypeScript strict mode.
- ACT sections: English (max raw 75), Math (max raw 60), Reading (max raw 40). No Science.
- Scaled scores: integer 1–36. Composite = `Math.round((english + math + reading) / 3)`.
- Claude model: `claude-sonnet-4-6`. API key in `.env.local` as `ANTHROPIC_API_KEY` — never exposed to the client.
- English test: 5 passages × 15 questions = 75. Math: 60 standalone questions. Reading: 4 passages × 10 questions = 40.

---

### Task 1: Project Scaffold + Database Schema

**Files:**
- Create: `prisma/schema.prisma`
- Create: `prisma/seed.ts`
- Create: `.env.local`
- Create: `lib/db.ts`
- Create: `types/index.ts`
- Create: `jest.config.ts`

**Interfaces:**
- Produces: `TestResult`, `GeneratedTest` Prisma models; `Question`, `GeneratedTestContent`, `SectionKey`, `SectionStats`, `ScoreEntry` TypeScript types used by all subsequent tasks.

- [ ] **Step 1: Scaffold Next.js app**

```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

When prompted: use App Router = Yes, customize default import alias = Yes (`@/*`).

- [ ] **Step 2: Install dependencies**

```bash
npm install prisma @prisma/client @anthropic-ai/sdk recharts
npm install --save-dev jest ts-jest @types/jest ts-node @testing-library/react @testing-library/jest-dom jest-environment-jsdom
npx shadcn@latest init
```

For shadcn init: Style = Default, Base color = Slate, CSS variables = Yes.

Then add components:
```bash
npx shadcn@latest add card button input label table badge progress
```

- [ ] **Step 3: Initialize Prisma**

```bash
npx prisma init --datasource-provider sqlite
```

- [ ] **Step 4: Write the Prisma schema**

Replace `prisma/schema.prisma` with:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model TestResult {
  id             String   @id @default(cuid())
  date           DateTime
  englishRaw     Int
  englishScore   Int
  mathRaw        Int
  mathScore      Int
  readingRaw     Int
  readingScore   Int
  compositeScore Int
  source         String   @default("EXISTING")
  createdAt      DateTime @default(now())
}

model GeneratedTest {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  content   String
}
```

Note: Prisma SQLite doesn't support native enums — `source` is stored as a plain string (`"EXISTING"` or `"GENERATED"`).

- [ ] **Step 5: Create .env.local**

```
DATABASE_URL="file:./dev.db"
ANTHROPIC_API_KEY="your-key-here"
```

- [ ] **Step 6: Write seed script**

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.testResult.createMany({
    data: [
      {
        date: new Date('2026-06-09'),
        englishRaw: 54, englishScore: 23,
        mathRaw: 44,    mathScore: 28,
        readingRaw: 32, readingScore: 28,
        compositeScore: 26,
        source: 'EXISTING',
      },
      {
        date: new Date('2026-06-11'),
        englishRaw: 65, englishScore: 30,
        mathRaw: 53,    mathScore: 32,
        readingRaw: 35, readingScore: 32,
        compositeScore: 31,
        source: 'EXISTING',
      },
      {
        date: new Date('2026-06-13'),
        englishRaw: 69, englishScore: 34,
        mathRaw: 57,    mathScore: 34,
        readingRaw: 37, readingScore: 35,
        compositeScore: 34,
        source: 'EXISTING',
      },
    ],
  })
  console.log('Seeded 3 test results')
}

main().catch(console.error).finally(() => prisma.$disconnect())
```

Add to `package.json` (in the root object, not inside `scripts`):

```json
"prisma": {
  "seed": "ts-node --compiler-options '{\"module\":\"CommonJS\"}' prisma/seed.ts"
}
```

- [ ] **Step 7: Run migrations and seed**

```bash
npx prisma db push
npx prisma db seed
```

Expected output: `Seeded 3 test results`

- [ ] **Step 8: Create Prisma client singleton**

Create `lib/db.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

- [ ] **Step 9: Define shared TypeScript types**

Create `types/index.ts`:

```typescript
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
```

- [ ] **Step 10: Configure Jest**

Create `jest.config.ts`:

```typescript
import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { module: 'CommonJS' } }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

export default config
```

Add to `package.json` scripts:

```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 11: Commit**

```bash
git init
git add .
git commit -m "feat: project scaffold, Prisma schema, seed data, Jest config"
```

---

### Task 2: Analytics Functions (TDD)

**Files:**
- Create: `lib/analytics.ts`
- Create: `lib/analytics.test.ts`

**Interfaces:**
- Consumes: `SectionKey`, `SectionStats`, `ScoreEntry` from `types/index.ts`
- Produces:
  - `computeComposite(english: number, math: number, reading: number): number`
  - `computeGap(scores: number[]): number`
  - `computeTrend(scores: number[]): 'up' | 'stable' | 'down' | null`
  - `computeTestsNeeded(scores: number[]): number | null`
  - `computeSectionStats(section: SectionKey, scores: number[]): SectionStats`
  - `computeScoreEntries(results: { date: Date; englishScore: number; mathScore: number; readingScore: number; compositeScore: number }[]): ScoreEntry[]`

- [ ] **Step 1: Write failing tests**

Create `lib/analytics.test.ts`:

```typescript
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
```

- [ ] **Step 2: Run to verify they fail**

```bash
npm test lib/analytics.test.ts
```

Expected: FAIL — `Cannot find module './analytics'`

- [ ] **Step 3: Implement analytics functions**

Create `lib/analytics.ts`:

```typescript
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
  return results.map((r) => ({
    date: r.date.toISOString().split('T')[0],
    englishScore: r.englishScore,
    mathScore: r.mathScore,
    readingScore: r.readingScore,
    compositeScore: r.compositeScore,
  }))
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test lib/analytics.test.ts
```

Expected: PASS (all 10 assertions)

- [ ] **Step 5: Commit**

```bash
git add lib/analytics.ts lib/analytics.test.ts
git commit -m "feat: analytics functions with full unit test coverage"
```

---

### Task 3: Test Result API + Log Page

**Files:**
- Create: `app/api/test-results/route.ts`
- Create: `app/api/test-results/route.test.ts`
- Create: `app/log/page.tsx`
- Create: `components/TestLogForm.tsx`

**Interfaces:**
- Consumes: `prisma` from `lib/db.ts`; `computeComposite` from `lib/analytics.ts`
- Produces:
  - `GET /api/test-results` → `TestResult[]` ordered by date ascending
  - `POST /api/test-results` body: `{ date, englishRaw, englishScore, mathRaw, mathScore, readingRaw, readingScore }` → created `TestResult` (201) or `{ error }` (400)
  - `validateTestInput(input)` — exported for testing

- [ ] **Step 1: Write failing validation test**

Create `app/api/test-results/route.test.ts`:

```typescript
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
```

- [ ] **Step 2: Run to confirm fail**

```bash
npm test app/api/test-results/route.test.ts
```

Expected: FAIL — `Cannot find module './route'`

- [ ] **Step 3: Implement the API route**

Create `app/api/test-results/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { computeComposite } from '@/lib/analytics'

type TestResultInput = {
  date: string
  englishRaw: number; englishScore: number
  mathRaw: number;    mathScore: number
  readingRaw: number; readingScore: number
}

export function validateTestInput(input: TestResultInput): void {
  if (input.englishRaw < 0 || input.englishRaw > 75)   throw new Error('englishRaw must be 0–75')
  if (input.mathRaw < 0    || input.mathRaw > 60)       throw new Error('mathRaw must be 0–60')
  if (input.readingRaw < 0 || input.readingRaw > 40)    throw new Error('readingRaw must be 0–40')
  if (input.englishScore < 1 || input.englishScore > 36) throw new Error('englishScore must be 1–36')
  if (input.mathScore < 1    || input.mathScore > 36)    throw new Error('mathScore must be 1–36')
  if (input.readingScore < 1 || input.readingScore > 36) throw new Error('readingScore must be 1–36')
}

export async function GET() {
  const results = await prisma.testResult.findMany({ orderBy: { date: 'asc' } })
  return NextResponse.json(results)
}

export async function POST(req: Request) {
  const body: TestResultInput = await req.json()
  try {
    validateTestInput(body)
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 })
  }
  const composite = computeComposite(body.englishScore, body.mathScore, body.readingScore)
  const result = await prisma.testResult.create({
    data: {
      date: new Date(body.date),
      englishRaw: body.englishRaw, englishScore: body.englishScore,
      mathRaw: body.mathRaw,       mathScore: body.mathScore,
      readingRaw: body.readingRaw, readingScore: body.readingScore,
      compositeScore: composite,
      source: 'EXISTING',
    },
  })
  return NextResponse.json(result, { status: 201 })
}
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npm test app/api/test-results/route.test.ts
```

Expected: PASS (all 6 assertions)

- [ ] **Step 5: Build the log form component**

Create `components/TestLogForm.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type SectionInputs = { raw: string; score: string }
type FormState = {
  date: string
  english: SectionInputs
  math: SectionInputs
  reading: SectionInputs
}

const SECTIONS = [
  { key: 'english' as const, label: 'English', max: 75 },
  { key: 'math'    as const, label: 'Math',    max: 60 },
  { key: 'reading' as const, label: 'Reading', max: 40 },
]

export function TestLogForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    date: new Date().toISOString().split('T')[0],
    english: { raw: '', score: '' },
    math:    { raw: '', score: '' },
    reading: { raw: '', score: '' },
  })
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function update(section: keyof Omit<FormState, 'date'>, field: keyof SectionInputs, value: string) {
    setForm((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const res = await fetch('/api/test-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: form.date,
        englishRaw: Number(form.english.raw), englishScore: Number(form.english.score),
        mathRaw:    Number(form.math.raw),    mathScore:    Number(form.math.score),
        readingRaw: Number(form.reading.raw), readingScore: Number(form.reading.score),
      }),
    })
    setSubmitting(false)
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong')
      return
    }
    router.push('/history')
    router.refresh()
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader><CardTitle>Log Practice Test</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="date">Test Date</Label>
            <Input
              id="date" type="date" value={form.date} required
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
            />
          </div>
          {SECTIONS.map(({ key, label, max }) => (
            <div key={key} className="space-y-1">
              <p className="font-medium text-sm">{label}</p>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor={`${key}-raw`}>Raw (/{max})</Label>
                  <Input
                    id={`${key}-raw`} type="number" min={0} max={max} required
                    value={form[key].raw}
                    onChange={(e) => update(key, 'raw', e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor={`${key}-score`}>Scaled (1–36)</Label>
                  <Input
                    id={`${key}-score`} type="number" min={1} max={36} required
                    value={form[key].score}
                    onChange={(e) => update(key, 'score', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Saving...' : 'Save Test Result'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 6: Create log page**

Create `app/log/page.tsx`:

```typescript
import { TestLogForm } from '@/components/TestLogForm'

export default function LogPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Log a Practice Test</h1>
      <TestLogForm />
    </main>
  )
}
```

- [ ] **Step 7: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000/log`. Submit test data, confirm redirect to `/history`. Inspect the DB:

```bash
npx prisma studio
```

Expected: New `TestResult` row appears.

- [ ] **Step 8: Commit**

```bash
git add app/api/test-results/ app/log/ components/TestLogForm.tsx
git commit -m "feat: test result API with validation and log form"
```

---

### Task 4: Dashboard Page

**Files:**
- Create: `app/page.tsx`
- Create: `components/ScoreTrendChart.tsx`
- Create: `components/WeakPointsChart.tsx`
- Create: `components/PredictionCard.tsx`

**Interfaces:**
- Consumes: `prisma` from `lib/db.ts`; `computeSectionStats`, `computeScoreEntries` from `lib/analytics.ts`; `SectionStats`, `ScoreEntry` from `types/index.ts`
- Produces: Server-rendered dashboard page. Chart components are client components (marked `'use client'`).

- [ ] **Step 1: Build score trend chart**

Create `components/ScoreTrendChart.tsx`:

```typescript
'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import type { ScoreEntry } from '@/types'

export function ScoreTrendChart({ data }: { data: ScoreEntry[] }) {
  if (data.length === 0) return null
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 36]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="englishScore"   name="English"   stroke="#3b82f6" strokeWidth={2} />
        <Line type="monotone" dataKey="mathScore"      name="Math"      stroke="#10b981" strokeWidth={2} />
        <Line type="monotone" dataKey="readingScore"   name="Reading"   stroke="#f59e0b" strokeWidth={2} />
        <Line type="monotone" dataKey="compositeScore" name="Composite" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

- [ ] **Step 2: Build weak points bar chart**

Create `components/WeakPointsChart.tsx`:

```typescript
'use client'

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Cell, ResponsiveContainer,
} from 'recharts'
import type { SectionStats } from '@/types'

function gapColor(gap: number): string {
  if (gap >= 5) return '#ef4444'
  if (gap >= 2) return '#f59e0b'
  return '#22c55e'
}

export function WeakPointsChart({ stats }: { stats: SectionStats[] }) {
  const data = stats.map((s) => ({
    name: s.section.charAt(0).toUpperCase() + s.section.slice(1),
    score: s.latestScore,
    gap: s.gap,
  }))
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 36]} />
        <Tooltip formatter={(value, name) => [value, name === 'score' ? 'Latest Score' : 'Gap']} />
        <Bar dataKey="score" name="score">
          {data.map((entry, i) => (
            <Cell key={i} fill={gapColor(entry.gap)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
```

- [ ] **Step 3: Build prediction cards**

Create `components/PredictionCard.tsx`:

```typescript
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
```

- [ ] **Step 4: Build the dashboard page**

Create `app/page.tsx`:

```typescript
import { prisma } from '@/lib/db'
import { computeSectionStats, computeScoreEntries } from '@/lib/analytics'
import { ScoreTrendChart } from '@/components/ScoreTrendChart'
import { WeakPointsChart } from '@/components/WeakPointsChart'
import { PredictionCard } from '@/components/PredictionCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const results = await prisma.testResult.findMany({ orderBy: { date: 'asc' } })

  if (results.length === 0) {
    return (
      <main className="p-6 max-w-2xl mx-auto text-center mt-16">
        <h1 className="text-3xl font-bold mb-4">ACT Optimizer</h1>
        <p className="text-muted-foreground mb-6">No tests logged yet. Log your first practice test to get started.</p>
        <Link href="/log" className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
          Log First Test
        </Link>
      </main>
    )
  }

  const stats = [
    computeSectionStats('english', results.map((r) => r.englishScore)),
    computeSectionStats('math',    results.map((r) => r.mathScore)),
    computeSectionStats('reading', results.map((r) => r.readingScore)),
  ]
  const entries = computeScoreEntries(results)

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">ACT Optimizer</h1>
      <Card>
        <CardHeader><CardTitle>Score Trend</CardTitle></CardHeader>
        <CardContent><ScoreTrendChart data={entries} /></CardContent>
      </Card>
      <section>
        <h2 className="text-xl font-semibold mb-4">Weak Points & Prediction</h2>
        <PredictionCard stats={stats} />
      </section>
      <Card>
        <CardHeader><CardTitle>Section Gaps</CardTitle></CardHeader>
        <CardContent><WeakPointsChart stats={stats} /></CardContent>
      </Card>
    </main>
  )
}
```

- [ ] **Step 5: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm:
- Score trend chart plots 3 data points for the 3 seeded tests
- Prediction cards show: English ~1 test, Math ~1 test, Reading ~1 test (based on seeded improvement rates)
- Bar chart shows English and Math colored yellow (gap 2), Reading green (gap 1)

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx components/ScoreTrendChart.tsx components/WeakPointsChart.tsx components/PredictionCard.tsx
git commit -m "feat: dashboard with score trend, weak points chart, and predictions"
```

---

### Task 5: History Page

**Files:**
- Create: `app/history/page.tsx`

**Interfaces:**
- Consumes: `prisma` from `lib/db.ts`

- [ ] **Step 1: Create history page**

Create `app/history/page.tsx`:

```typescript
import { prisma } from '@/lib/db'
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
  const results = await prisma.testResult.findMany({ orderBy: { date: 'desc' } })

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Test History</h1>
        <Link href="/log" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm">
          Log New Test
        </Link>
      </div>
      {results.length === 0 ? (
        <p className="text-muted-foreground">No tests logged yet.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>English</TableHead>
              <TableHead>Math</TableHead>
              <TableHead>Reading</TableHead>
              <TableHead>Composite</TableHead>
              <TableHead>Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{new Date(r.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  {r.englishScore}
                  <span className="text-muted-foreground text-xs ml-1">({r.englishRaw}/75)</span>
                </TableCell>
                <TableCell>
                  {r.mathScore}
                  <span className="text-muted-foreground text-xs ml-1">({r.mathRaw}/60)</span>
                </TableCell>
                <TableCell>
                  {r.readingScore}
                  <span className="text-muted-foreground text-xs ml-1">({r.readingRaw}/40)</span>
                </TableCell>
                <TableCell><strong>{r.compositeScore}</strong></TableCell>
                <TableCell>
                  <Badge variant={r.source === 'GENERATED' ? 'secondary' : 'outline'}>
                    {r.source}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  )
}
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:3000/history`. Confirm:
- Table shows all 3 seeded tests, most recent first
- Each row shows raw score in smaller text beside scaled score
- Source badge shows "EXISTING"

- [ ] **Step 3: Commit**

```bash
git add app/history/page.tsx
git commit -m "feat: test history page"
```

---

### Task 6: Claude Test Generation

**Files:**
- Create: `lib/claude.ts`
- Create: `app/api/generate/route.ts`
- Create: `app/api/generated-tests/[id]/route.ts`

**Interfaces:**
- Consumes: `Question`, `GeneratedTestContent` from `types/index.ts`; `prisma` from `lib/db.ts`
- Produces:
  - `generateSection(section: 'english' | 'math' | 'reading'): Promise<Question[]>`
  - `POST /api/generate` → `{ id: string }` (201) or `{ error: string }` (500)
  - `GET /api/generated-tests/[id]` → `GeneratedTestContent` (200) or `{ error }` (404)

- [ ] **Step 1: Implement Claude generation functions**

Create `lib/claude.ts`:

```typescript
import Anthropic from '@anthropic-ai/sdk'
import type { Question } from '@/types'

const client = new Anthropic()

const SECTION_COUNTS = { english: 75, math: 60, reading: 40 }

const PROMPTS: Record<'english' | 'math' | 'reading', string> = {
  english: `Generate an ACT English section. It must have exactly 5 passages with 15 questions each (75 questions total).
Questions should test grammar, punctuation, sentence structure, and rhetorical skills on the passage text.
Return a JSON array of 75 objects with this exact shape (no other text, no markdown fences):
{ "id": number, "passage": "full passage text — questions 1-15 share passage 1, 16-30 share passage 2, etc.", "prompt": "question text", "choices": { "A": "...", "B": "...", "C": "...", "D": "..." }, "answer": "A" | "B" | "C" | "D" }`,

  math: `Generate an ACT Math section with exactly 60 questions covering pre-algebra, elementary algebra, intermediate algebra, coordinate geometry, plane geometry, and trigonometry.
Each question is standalone with no passage.
Return a JSON array of 60 objects with this exact shape (no other text, no markdown fences):
{ "id": number, "prompt": "question text with any equations described inline", "choices": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." }, "answer": "A" | "B" | "C" | "D" | "E" }`,

  reading: `Generate an ACT Reading section with exactly 4 passages and 10 questions per passage (40 questions total).
Passage types (one each): literary narrative, social science, humanities, natural science.
Return a JSON array of 40 objects with this exact shape (no other text, no markdown fences):
{ "id": number, "passage": "full passage text — questions 1-10 share passage 1, 11-20 share passage 2, etc.", "prompt": "question text", "choices": { "A": "...", "B": "...", "C": "...", "D": "..." }, "answer": "A" | "B" | "C" | "D" }`,
}

function parseAndValidate(text: string, section: 'english' | 'math' | 'reading'): Question[] {
  const match = text.match(/\[[\s\S]*\]/)
  if (!match) throw new Error('No JSON array found in response')
  const parsed = JSON.parse(match[0])
  if (!Array.isArray(parsed) || parsed.length !== SECTION_COUNTS[section]) {
    throw new Error(`Expected ${SECTION_COUNTS[section]} questions, got ${Array.isArray(parsed) ? parsed.length : 'non-array'}`)
  }
  return parsed as Question[]
}

export async function generateSection(section: 'english' | 'math' | 'reading'): Promise<Question[]> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    const prompt = attempt === 1
      ? PROMPTS[section]
      : `${PROMPTS[section]}\nIMPORTANT: Return ONLY the raw JSON array. No explanation, no markdown code fences.`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    try {
      return parseAndValidate(text, section)
    } catch (e) {
      if (attempt === 2) throw new Error(`${section} generation failed after 2 attempts: ${(e as Error).message}`)
    }
  }
  throw new Error(`${section} generation failed`)
}
```

- [ ] **Step 2: Implement generate API route**

Create `app/api/generate/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { generateSection } from '@/lib/claude'
import { prisma } from '@/lib/db'
import type { GeneratedTestContent } from '@/types'

export async function POST() {
  try {
    const english = await generateSection('english')
    const math    = await generateSection('math')
    const reading = await generateSection('reading')

    const content: GeneratedTestContent = { english, math, reading }
    const test = await prisma.generatedTest.create({
      data: { content: JSON.stringify(content) },
    })

    return NextResponse.json({ id: test.id }, { status: 201 })
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Generation failed' },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 3: Implement test retrieval route**

Create `app/api/generated-tests/[id]/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const test = await prisma.generatedTest.findUnique({ where: { id: params.id } })
  if (!test) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(JSON.parse(test.content))
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/claude.ts app/api/generate/ app/api/generated-tests/
git commit -m "feat: Claude test generation API with retry and validation"
```

---

### Task 7: Generate Page + Test Viewer

**Files:**
- Create: `app/generate/page.tsx`
- Create: `app/tests/[id]/page.tsx`

**Interfaces:**
- Consumes: `POST /api/generate`; `prisma` from `lib/db.ts`; `GeneratedTestContent`, `Question` from `types/index.ts`

- [ ] **Step 1: Build the generate page**

Create `app/generate/page.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function GeneratePage() {
  const router = useRouter()
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate() {
    setGenerating(true)
    setError(null)
    const res = await fetch('/api/generate', { method: 'POST' })
    setGenerating(false)
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Generation failed')
      return
    }
    const { id } = await res.json()
    router.push(`/tests/${id}`)
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Generate Practice Test</h1>
      <Card>
        <CardHeader><CardTitle>AI-Generated Full ACT Practice Test</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Generates English (75 questions), Math (60 questions), and Reading (40 questions).
            Takes approximately 1–3 minutes.
          </p>
          {generating && (
            <p className="text-sm text-muted-foreground animate-pulse">
              Generating sections... this may take a few minutes.
            </p>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={handleGenerate} disabled={generating} className="w-full">
            {generating ? 'Generating...' : 'Generate Full Practice Test'}
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
```

- [ ] **Step 2: Build the test viewer page**

Create `app/tests/[id]/page.tsx`:

```typescript
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import type { GeneratedTestContent, Question } from '@/types'
import { Card, CardContent } from '@/components/ui/card'

function QuestionBlock({ q, number }: { q: Question; number: number }) {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <p className="font-medium">{number}. {q.prompt}</p>
      <div className="space-y-1 text-sm">
        {(Object.entries(q.choices) as [string, string][]).map(([key, val]) => (
          <p key={key}><span className="font-mono font-semibold">{key}.</span> {val}</p>
        ))}
      </div>
    </div>
  )
}

function PassageGroup({ passage, questions, startNumber }: {
  passage: string
  questions: Question[]
  startNumber: number
}) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-4 text-sm leading-relaxed whitespace-pre-wrap bg-muted/50">
          {passage}
        </CardContent>
      </Card>
      <div className="space-y-3">
        {questions.map((q, i) => (
          <QuestionBlock key={q.id} q={q} number={startNumber + i} />
        ))}
      </div>
    </div>
  )
}

export default async function TestViewerPage({ params }: { params: { id: string } }) {
  const test = await prisma.generatedTest.findUnique({ where: { id: params.id } })
  if (!test) notFound()

  const content: GeneratedTestContent = JSON.parse(test.content)

  const englishGroups = Array.from({ length: 5 }, (_, i) =>
    content.english.slice(i * 15, (i + 1) * 15)
  )
  const readingGroups = Array.from({ length: 4 }, (_, i) =>
    content.reading.slice(i * 10, (i + 1) * 10)
  )

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-12">
      <h1 className="text-2xl font-bold">Generated Practice Test</h1>

      <section>
        <h2 className="text-xl font-bold mb-6 border-b pb-2">English — 75 Questions</h2>
        <div className="space-y-10">
          {englishGroups.map((group, i) => (
            <PassageGroup
              key={i}
              passage={group[0]?.passage ?? ''}
              questions={group}
              startNumber={i * 15 + 1}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-6 border-b pb-2">Math — 60 Questions</h2>
        <div className="space-y-3">
          {content.math.map((q, i) => (
            <QuestionBlock key={q.id} q={q} number={i + 1} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-6 border-b pb-2">Reading — 40 Questions</h2>
        <div className="space-y-10">
          {readingGroups.map((group, i) => (
            <PassageGroup
              key={i}
              passage={group[0]?.passage ?? ''}
              questions={group}
              startNumber={i * 10 + 1}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
```

- [ ] **Step 3: Verify end-to-end with real API key**

With `ANTHROPIC_API_KEY` set in `.env.local`:

```bash
npm run dev
```

1. Go to `http://localhost:3000/generate`
2. Click "Generate Full Practice Test" and wait ~1–3 minutes
3. Confirm redirect to `/tests/[id]` with all three sections rendered
4. Verify English shows 5 passage groups, Reading shows 4, Math shows 60 standalone questions

- [ ] **Step 4: Commit**

```bash
git add app/generate/ app/tests/
git commit -m "feat: generate page and test viewer"
```

---

### Task 8: Root Layout + Navigation

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/Nav.tsx`

**Interfaces:**
- Consumes: all pages via Next.js routing

- [ ] **Step 1: Build the nav component**

Create `components/Nav.tsx`:

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/',          label: 'Dashboard' },
  { href: '/log',       label: 'Log Test'  },
  { href: '/history',   label: 'History'   },
  { href: '/generate',  label: 'Generate'  },
]

export function Nav() {
  const pathname = usePathname()
  return (
    <nav className="border-b px-6 py-3 flex items-center gap-6">
      <span className="font-bold text-lg">ACT Optimizer</span>
      <div className="flex gap-4 text-sm">
        {LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={
              pathname === href
                ? 'font-semibold text-primary'
                : 'text-muted-foreground hover:text-foreground transition-colors'
            }
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Update root layout**

Replace `app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ACT Optimizer',
  description: 'Track your ACT progress and get to 36',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Final full-app check**

```bash
npm run dev
```

Verify each page loads and nav highlights the active link:
- `/` — Dashboard with charts and prediction cards
- `/log` — Form with raw + scaled inputs per section; submits correctly
- `/history` — Table with raw/scaled scores; badge shows source
- `/generate` — Button triggers generation; success redirects to test viewer
- `/tests/[id]` — Sections and passages render correctly

Run the full test suite one last time:
```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx components/Nav.tsx
git commit -m "feat: root layout with navigation — app complete"
```
