'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { computeComposite } from '@/lib/analytics'

type SectionInputs = { raw: string; score: string; missed: string }
type FormState = {
  date: string
  english: SectionInputs
  math: SectionInputs
  reading: SectionInputs
  notes: string
  studyTopics: string[]
}

const SECTIONS = [
  { key: 'english' as const, label: 'English',  max: 75, color: 'bg-blue-500'    },
  { key: 'math'    as const, label: 'Math',      max: 60, color: 'bg-emerald-500' },
  { key: 'reading' as const, label: 'Reading',   max: 40, color: 'bg-amber-500'   },
]

const STUDY_OPTIONS: Record<string, string[]> = {
  English: ['Grammar & Usage', 'Punctuation', 'Sentence Structure', 'Rhetorical Skills'],
  Math:    ['Pre-Algebra', 'Algebra', 'Geometry', 'Functions', 'Statistics'],
  Reading: ['Fiction', 'Social Science', 'Humanities', 'Natural Science'],
}

const FIELD_ORDER = ['date', 'english-raw', 'english-score', 'math-raw', 'math-score', 'reading-raw', 'reading-score']

function advanceFocus(currentId: string) {
  const idx = FIELD_ORDER.indexOf(currentId)
  if (idx === -1 || idx === FIELD_ORDER.length - 1) return
  document.getElementById(FIELD_ORDER[idx + 1])?.focus()
}

export function TestLogForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    date: new Date().toISOString().split('T')[0],
    english: { raw: '', score: '', missed: '' },
    math:    { raw: '', score: '', missed: '' },
    reading: { raw: '', score: '', missed: '' },
    notes: '',
    studyTopics: [],
  })
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function update(section: 'english' | 'math' | 'reading', field: keyof SectionInputs, value: string) {
    setForm((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }))
  }

  function toggleTopic(topic: string) {
    setForm((prev) => ({
      ...prev,
      studyTopics: prev.studyTopics.includes(topic)
        ? prev.studyTopics.filter((t) => t !== topic)
        : [...prev.studyTopics, topic],
    }))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, fieldId: string) {
    if (e.key === 'Enter') { e.preventDefault(); advanceFocus(fieldId) }
  }

  function parseMissed(str: string): number[] {
    return str.split(',').map((s) => parseInt(s.trim())).filter((n) => !isNaN(n) && n > 0)
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
        notes: form.notes || undefined,
        studyTopics: form.studyTopics,
        missedQuestions: {
          english: parseMissed(form.english.missed),
          math:    parseMissed(form.math.missed),
          reading: parseMissed(form.reading.missed),
        },
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

  const eScore = Number(form.english.score)
  const mScore = Number(form.math.score)
  const rScore = Number(form.reading.score)
  const previewComposite =
    eScore >= 1 && eScore <= 36 && mScore >= 1 && mScore <= 36 && rScore >= 1 && rScore <= 36
      ? computeComposite(eScore, mScore, rScore)
      : null

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-8">
        <h2 className="text-xl font-bold mb-1">Log Practice Test</h2>
        <p className="text-sm text-muted-foreground mb-6">Enter your scores, missed questions, and what you studied.</p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Date */}
          <div className="space-y-1.5">
            <Label htmlFor="date" className="text-sm font-semibold">Test Date</Label>
            <Input
              id="date" type="date" value={form.date} required className="max-w-xs"
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              onKeyDown={(e) => handleKeyDown(e, 'date')}
            />
          </div>

          {/* Scores + missed questions */}
          <div className="border-t border-border/60 pt-5 space-y-5">
            {SECTIONS.map(({ key, label, max, color }) => (
              <div key={key}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="space-y-1.5">
                    <Label htmlFor={`${key}-raw`} className="text-xs font-medium">Raw Score (/{max})</Label>
                    <Input
                      id={`${key}-raw`} type="number" min={0} max={max} required
                      placeholder={`0 – ${max}`} value={form[key].raw}
                      onChange={(e) => update(key, 'raw', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, `${key}-raw`)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`${key}-score`} className="text-xs font-medium">Scaled Score (1–36)</Label>
                    <Input
                      id={`${key}-score`} type="number" min={1} max={36} required
                      placeholder="1 – 36" value={form[key].score}
                      onChange={(e) => update(key, 'score', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, `${key}-score`)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`${key}-missed`} className="text-xs font-medium">Missed Questions (optional, comma-separated)</Label>
                  <Input
                    id={`${key}-missed`} type="text" placeholder="e.g. 12, 34, 45"
                    value={form[key].missed}
                    onChange={(e) => update(key, 'missed', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Study topics */}
          <div className="border-t border-border/60 pt-5">
            <p className="text-sm font-semibold mb-3">What did you study? <span className="font-normal text-muted-foreground">(optional)</span></p>
            {Object.entries(STUDY_OPTIONS).map(([section, topics]) => (
              <div key={section} className="mb-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{section}</p>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <button
                      key={topic} type="button"
                      onClick={() => toggleTopic(topic)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        form.studyTopics.includes(topic)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-muted-foreground border-border hover:border-primary/40'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="border-t border-border/60 pt-5 space-y-1.5">
            <Label htmlFor="notes" className="text-sm font-semibold">Notes <span className="font-normal text-muted-foreground">(optional)</span></Label>
            <textarea
              id="notes"
              placeholder="e.g. Ran out of time on Reading, felt confident on Math..."
              value={form.notes}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              rows={3}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>

          {/* Live composite preview */}
          {previewComposite !== null && (
            <div className="rounded-xl bg-primary/5 border border-primary/20 px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-primary">Estimated Composite</span>
              <span className="text-2xl font-extrabold text-primary">{previewComposite}<span className="text-sm font-semibold text-primary/60"> / 36</span></span>
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div>
          )}

          <Button type="submit" disabled={submitting} className="w-full rounded-full py-5 font-semibold text-base">
            {submitting ? 'Saving…' : 'Save Test Result'}
          </Button>
        </form>
      </div>
    </div>
  )
}
