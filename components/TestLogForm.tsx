'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { computeComposite } from '@/lib/analytics'

type SectionInputs = { raw: string; score: string }
type FormState = {
  date: string
  english: SectionInputs
  math: SectionInputs
  reading: SectionInputs
}

const SECTIONS = [
  { key: 'english' as const, label: 'English',  max: 75, color: 'bg-blue-500'    },
  { key: 'math'    as const, label: 'Math',      max: 60, color: 'bg-emerald-500' },
  { key: 'reading' as const, label: 'Reading',   max: 40, color: 'bg-amber-500'   },
]

const FIELD_ORDER = ['date', 'english-raw', 'english-score', 'math-raw', 'math-score', 'reading-raw', 'reading-score']

function advanceFocus(currentId: string) {
  const idx = FIELD_ORDER.indexOf(currentId)
  if (idx === -1 || idx === FIELD_ORDER.length - 1) return
  const next = document.getElementById(FIELD_ORDER[idx + 1])
  next?.focus()
}

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

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, fieldId: string) {
    if (e.key === 'Enter') {
      e.preventDefault()
      advanceFocus(fieldId)
    }
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

  const eScore = Number(form.english.score)
  const mScore = Number(form.math.score)
  const rScore = Number(form.reading.score)
  const previewComposite =
    eScore >= 1 && eScore <= 36 &&
    mScore >= 1 && mScore <= 36 &&
    rScore >= 1 && rScore <= 36
      ? computeComposite(eScore, mScore, rScore)
      : null

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-8">
        <h2 className="text-xl font-bold mb-1">Log Practice Test</h2>
        <p className="text-sm text-muted-foreground mb-6">Enter your raw and scaled scores for each section.</p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Date */}
          <div className="space-y-1.5">
            <Label htmlFor="date" className="text-sm font-semibold">Test Date</Label>
            <Input
              id="date" type="date" value={form.date} required
              className="max-w-xs"
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              onKeyDown={(e) => handleKeyDown(e, 'date')}
            />
          </div>

          <div className="border-t border-border/60 pt-5 space-y-5">
            {SECTIONS.map(({ key, label, max, color }) => (
              <div key={key}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                  <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor={`${key}-raw`} className="text-xs font-medium">Raw Score (/{max})</Label>
                    <Input
                      id={`${key}-raw`} type="number" min={0} max={max} required
                      placeholder={`0 – ${max}`}
                      value={form[key].raw}
                      onChange={(e) => update(key, 'raw', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, `${key}-raw`)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`${key}-score`} className="text-xs font-medium">Scaled Score (1–36)</Label>
                    <Input
                      id={`${key}-score`} type="number" min={1} max={36} required
                      placeholder="1 – 36"
                      value={form[key].score}
                      onChange={(e) => update(key, 'score', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, `${key}-score`)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Live composite preview */}
          {previewComposite !== null && (
            <div className="rounded-xl bg-primary/5 border border-primary/20 px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-primary">Estimated Composite</span>
              <span className="text-2xl font-extrabold text-primary">{previewComposite}<span className="text-sm font-semibold text-primary/60"> / 36</span></span>
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full py-5 font-semibold text-base"
          >
            {submitting ? 'Saving…' : 'Save Test Result'}
          </Button>
        </form>
      </div>
    </div>
  )
}
