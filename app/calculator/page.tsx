'use client'

import { useState } from 'react'
import { rawToScaled, getPercentile, rawNeededForScore } from '@/lib/actScales'
import { computeComposite } from '@/lib/analytics'

const SECTIONS = [
  { key: 'english' as const, label: 'English', max: 75, color: 'text-blue-600 dark:text-blue-400' },
  { key: 'math'    as const, label: 'Math',    max: 60, color: 'text-emerald-600 dark:text-emerald-400' },
  { key: 'reading' as const, label: 'Reading', max: 40, color: 'text-amber-600 dark:text-amber-400' },
]

export default function CalculatorPage() {
  const [raw, setRaw] = useState({ english: '', math: '', reading: '' })

  const scaled = {
    english: raw.english !== '' ? rawToScaled('english', Number(raw.english)) : null,
    math:    raw.math    !== '' ? rawToScaled('math',    Number(raw.math))    : null,
    reading: raw.reading !== '' ? rawToScaled('reading', Number(raw.reading)) : null,
  }

  const composite =
    scaled.english !== null && scaled.math !== null && scaled.reading !== null
      ? computeComposite(scaled.english, scaled.math, scaled.reading)
      : null

  const percentile = composite !== null ? getPercentile(composite) : null

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold mb-1">Score Calculator</h1>
      <p className="text-muted-foreground mb-8">
        Enter your raw scores to estimate scaled scores, composite, and percentile.
        <span className="ml-1 text-xs">(Based on typical ACT curves — actual varies by test form.)</span>
      </p>

      <div className="space-y-4 mb-8">
        {SECTIONS.map(({ key, label, max, color }) => (
          <div key={key} className="bg-white dark:bg-card rounded-2xl border border-border/60 shadow-sm p-5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{label}</p>
                <div className="flex items-center gap-3">
                  <input
                    type="number" min={0} max={max}
                    placeholder={`Raw (0–${max})`}
                    value={raw[key]}
                    onChange={(e) => setRaw((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-36 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
                  />
                  <span className="text-muted-foreground text-sm">/ {max}</span>
                </div>
              </div>

              {scaled[key] !== null && (
                <div className="text-right">
                  <p className={`text-5xl font-extrabold ${color}`}>{scaled[key]}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">scaled / 36</p>
                  {raw[key] !== '' && Number(raw[key]) < max && (
                    <p className="text-xs text-muted-foreground mt-1">
                      +{rawNeededForScore(key, (scaled[key] ?? 0) + 1) - Number(raw[key])} more → {(scaled[key] ?? 0) + 1}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Mini progress */}
            {raw[key] !== '' && (
              <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${(Number(raw[key]) / max) * 100}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Composite result */}
      {composite !== null && (
        <div className="bg-primary rounded-2xl p-6 text-white text-center shadow-md">
          <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Estimated Composite</p>
          <p className="text-7xl font-extrabold leading-none mb-1">{composite}</p>
          <p className="text-xl opacity-80">/ 36</p>
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-2xl font-bold">Top {100 - percentile! + 1}%</p>
            <p className="text-sm opacity-70 mt-0.5">{percentile}th percentile nationally</p>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full rounded-full bg-white" style={{ width: `${(composite / 36) * 100}%` }} />
          </div>
          <p className="text-sm opacity-70 mt-1">{36 - composite} point{36 - composite !== 1 ? 's' : ''} to a perfect 36</p>
        </div>
      )}

      {composite === null && (
        <div className="bg-white dark:bg-card rounded-2xl border border-border/60 p-6 text-center text-muted-foreground">
          <p className="text-4xl mb-3">🎯</p>
          <p className="font-medium">Enter all three raw scores to see your composite and percentile.</p>
        </div>
      )}
    </main>
  )
}
