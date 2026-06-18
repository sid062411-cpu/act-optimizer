'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { rawToScaled } from '@/lib/actScales'

type Props = {
  test: {
    id: string
    date: string
    englishRaw: number; englishScore: number
    mathRaw: number;    mathScore: number
    readingRaw: number; readingScore: number
    notes: string | null
    studyTopics: string
    missedQuestions: string
  }
}

export function EditTestForm({ test }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [date, setDate] = useState(new Date(test.date).toISOString().split('T')[0])
  const [englishRaw, setEnglishRaw] = useState(String(test.englishRaw))
  const [mathRaw, setMathRaw] = useState(String(test.mathRaw))
  const [readingRaw, setReadingRaw] = useState(String(test.readingRaw))
  const [notes, setNotes] = useState(test.notes ?? '')
  const [topicsInput, setTopicsInput] = useState(
    (JSON.parse(test.studyTopics || '[]') as string[]).join(', ')
  )

  const eScore = englishRaw !== '' ? rawToScaled('english', Number(englishRaw)) : test.englishScore
  const mScore = mathRaw    !== '' ? rawToScaled('math',    Number(mathRaw))    : test.mathScore
  const rScore = readingRaw !== '' ? rawToScaled('reading', Number(readingRaw)) : test.readingScore
  const composite = Math.round((eScore + mScore + rScore) / 3)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const topics = topicsInput.split(',').map((t) => t.trim()).filter(Boolean)
    const res = await fetch(`/api/test-results/${test.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date,
        englishRaw: Number(englishRaw), englishScore: eScore,
        mathRaw: Number(mathRaw),       mathScore: mScore,
        readingRaw: Number(readingRaw), readingScore: rScore,
        notes: notes || null,
        studyTopics: topics,
        missedQuestions: JSON.parse(test.missedQuestions || '{}'),
      }),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Save failed')
      setSaving(false)
      return
    }
    router.push('/history')
    router.refresh()
  }

  const inputCls = 'w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">{error}</div>
      )}

      <div className="bg-white dark:bg-card rounded-2xl border border-border/60 shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Test Info</h2>
        <div>
          <label className="block text-sm font-medium mb-1.5">Test Date</label>
          <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </div>
      </div>

      <div className="bg-white dark:bg-card rounded-2xl border border-border/60 shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Raw Scores</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'English', max: 75, val: englishRaw, set: setEnglishRaw, scaled: eScore, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Math',    max: 60, val: mathRaw,    set: setMathRaw,    scaled: mScore, color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Reading', max: 40, val: readingRaw, set: setReadingRaw, scaled: rScore, color: 'text-amber-600 dark:text-amber-400' },
          ].map(({ label, max, val, set, scaled, color }) => (
            <div key={label}>
              <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">{label} / {max}</label>
              <input
                type="number" min={0} max={max} required
                value={val}
                onChange={(e) => set(e.target.value)}
                className={inputCls}
              />
              <p className={`text-xs mt-1 font-semibold ${color}`}>→ {scaled} scaled</p>
            </div>
          ))}
        </div>
        <div className="mt-2 pt-4 border-t border-border/50 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Estimated composite:</span>
          <span className="text-2xl font-extrabold text-primary">{composite}</span>
          <span className="text-muted-foreground text-sm">/ 36</span>
        </div>
      </div>

      <div className="bg-white dark:bg-card rounded-2xl border border-border/60 shadow-sm p-6 space-y-4">
        <h2 className="font-semibold text-sm uppercase tracking-widest text-muted-foreground">Notes & Topics</h2>
        <div>
          <label className="block text-sm font-medium mb-1.5">Notes</label>
          <textarea
            value={notes} onChange={(e) => setNotes(e.target.value)}
            rows={3} placeholder="Any observations about this test..."
            className={`${inputCls} resize-none`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Study Topics</label>
          <input
            type="text" value={topicsInput} onChange={(e) => setTopicsInput(e.target.value)}
            placeholder="e.g. Punctuation, Quadratics, Inference (comma-separated)"
            className={inputCls}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit" disabled={saving}
          className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
        <a href="/history" className="px-6 py-2.5 rounded-full border border-border font-semibold text-sm hover:bg-muted transition-colors">
          Cancel
        </a>
      </div>
    </form>
  )
}
