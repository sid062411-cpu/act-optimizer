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
