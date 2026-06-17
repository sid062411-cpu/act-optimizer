# ACT Optimizer — Design Spec
**Date:** 2026-06-17

## Overview

A personal web app to help the user reach a perfect 36 on the ACT (English, Math, Reading — no Science section). The app tracks practice test scores, identifies weak points, predicts time to 36-confidence, and generates AI-powered full practice tests when existing tests run out.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | SQLite via Prisma ORM |
| AI | Claude API (`claude-sonnet-4-6`), called server-side via Next.js API routes |
| Deployment | Vercel |

---

## Pages & Routes

| Route | Purpose |
|---|---|
| `/` | Dashboard: score trend chart, weak points breakdown, time-to-36 prediction |
| `/log` | Log a new test result (raw + scaled scores for each section) |
| `/history` | Table of all past tests with scores and date |
| `/generate` | Trigger AI test generation with per-section progress feedback |
| `/tests/[id]` | View a previously generated test, paginated by section |

---

## Data Model

### `TestResult`

| Field | Type | Notes |
|---|---|---|
| `id` | String (cuid) | Primary key |
| `date` | DateTime | When the test was taken |
| `englishRaw` | Int | Questions correct (0–75) |
| `englishScore` | Int | Scaled score (1–36) |
| `mathRaw` | Int | Questions correct (0–60) |
| `mathScore` | Int | Scaled score (1–36) |
| `readingRaw` | Int | Questions correct (0–40) |
| `readingScore` | Int | Scaled score (1–36) |
| `compositeScore` | Int | Auto-calculated: round((english + math + reading) / 3) |
| `source` | Enum | `EXISTING` or `GENERATED` |

**Fixed totals (constants, not stored):** English = 75, Math = 60, Reading = 40.

### `GeneratedTest`

| Field | Type | Notes |
|---|---|---|
| `id` | String (cuid) | Primary key |
| `createdAt` | DateTime | Generation timestamp |
| `content` | JSON | `{ english: Question[], math: Question[], reading: Question[] }` |

**Question shape:**
```ts
type Question = {
  id: number;
  prompt: string;
  choices: { A: string; B: string; C: string; D: string; E?: string };
  answer: "A" | "B" | "C" | "D" | "E";
  passage?: string; // for English and Reading questions
}
```

---

## Core Feature Logic

### Weak Points

- For each section, compute `gap = 36 - averageScaledScore` across all logged tests.
- Display as a bar chart (three bars: English, Math, Reading), colored by urgency:
  - Red: gap ≥ 5
  - Yellow: gap 2–4
  - Green: gap ≤ 1
- Show a trend arrow per section comparing the average of the last 3 tests to all tests before them:
  - Improving (↑), Stable (→), Declining (↓)
  - Hidden if fewer than 4 total tests (need at least 1 "before" and 3 "after" data points).
- Priority list: sections ranked by gap, largest first.

### Study Recommendations

- One-line recommendation per section based on gap rank: "Focus on Math first, then English."
- Each section note references the heaviest-weighted ACT subscore area:
  - English → Production of Writing + Conventions of Standard English
  - Math → Algebra & Functions
  - Reading → Key Ideas & Details

### Time-to-36 Prediction

- Per section: compute average scaled score improvement per test (e.g., +3.5 points/test).
- Extrapolate: `testsNeeded = ceil(gap / avgImprovement)`.
- Display as: "At your current pace, you'll reach 36-confidence in English in ~N more tests."
- If `avgImprovement ≤ 0`: show "Your score in this section is plateauing — consider changing your study approach."
- If gap is 0 (score already 36): show "Mastered" badge; exclude from priority list.
- Requires at least 2 tests to show prediction; otherwise show "Log more tests to unlock prediction."

### AI Test Generation

- Three sequential API calls to Claude, one per section, to stay within token limits.
- Section specs:
  - **English:** 5 passages, 15 questions each = 75 questions total
  - **Math:** 60 questions (no passages)
  - **Reading:** 4 passages, 10 questions each = 40 questions total
- Each API call returns a validated JSON array matching the `Question` type above.
- Validation: check structure before saving; retry once with a stricter prompt on malformed response.
- Retry on failure: up to 2 attempts per section. On persistent failure, surface an error message specifying which section failed with a "Retry this section" button.
- Loading screen shows per-section progress: "Generating English... ✓ | Generating Math... | Reading pending"
- Completed test saved to `GeneratedTest` table and immediately navigable at `/tests/[id]`.

---

## Error Handling & Edge Cases

| Scenario | Behavior |
|---|---|
| No tests logged | Dashboard shows empty state with CTA to log first test |
| Only 1 test logged | Trend arrows hidden; prediction replaced with "Log more tests" prompt |
| Section already at 36 | Marked "Mastered"; excluded from recommendations |
| Claude API failure | Retry up to 2×; show per-section retry button on persistent failure |
| Malformed Claude JSON | Retry once with stricter prompt; error if still invalid |
| Score inputs out of range | Form validation: raw score ≤ section max, scaled score 1–36 |

---

## Real Progress Context

The user's actual test history at time of design (for seeding / validation):

| Date | English (raw/scaled) | Math (raw/scaled) | Reading (raw/scaled) | Composite |
|---|---|---|---|---|
| Jun 9–10 | 54/75 → 23 | 44/60 → 28 | 32/40 → 28 | 26 |
| Jun 11–12 | 65/75 → 30 | 53/60 → 32 | 35/40 → 32 | 31 |
| Jun 13–14 | 69/75 → 34 | 57/60 → 34 | 37/40 → 35 | 34 |

Current gaps: English −2, Math −2, Reading −1. At this improvement rate, 36-confidence is ~1–2 tests away.
