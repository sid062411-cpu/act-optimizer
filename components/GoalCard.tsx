'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Goal = { id: string; testDate: string } | null

type Props = {
  goal: Goal
  testsNeeded: number | null
  avgDaysBetweenTests: number | null
}

export function GoalCard({ goal, testsNeeded, avgDaysBetweenTests }: Props) {
  const router = useRouter()
  const [editing, setEditing] = useState(!goal)
  const [date, setDate] = useState(
    goal ? new Date(goal.testDate).toISOString().split('T')[0] : ''
  )
  const [saving, setSaving] = useState(false)

  const daysLeft = goal
    ? Math.ceil((new Date(goal.testDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null

  const testsAvailable =
    daysLeft !== null && avgDaysBetweenTests
      ? Math.floor(daysLeft / avgDaysBetweenTests)
      : null

  const onTrack =
    testsAvailable !== null && testsNeeded !== null
      ? testsAvailable >= testsNeeded
      : null

  async function save() {
    if (!date) return
    setSaving(true)
    await fetch('/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ testDate: date }),
    })
    setSaving(false)
    setEditing(false)
    router.refresh()
  }

  async function remove() {
    await fetch('/api/goals', { method: 'DELETE' })
    setEditing(true)
    setDate('')
    router.refresh()
  }

  if (editing) {
    return (
      <div className="bg-white rounded-2xl border border-primary/30 shadow-sm p-5">
        <p className="text-sm font-bold uppercase tracking-widest text-primary mb-1">Target Test Date</p>
        <p className="text-sm text-muted-foreground mb-4">Set your ACT date to see if you&apos;re on pace for 36.</p>
        <div className="flex gap-3 items-center flex-wrap">
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            className="border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            onClick={save}
            disabled={!date || saving}
            className="px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            {saving ? 'Saving…' : 'Set Date'}
          </button>
          {goal && (
            <button onClick={() => setEditing(false)} className="text-sm text-muted-foreground hover:text-foreground">
              Cancel
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-5 ${onTrack === false ? 'border-amber-300' : 'border-emerald-300'}`}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-1">Target Test Date</p>
          <p className="text-2xl font-extrabold">
            {new Date(goal!.testDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setEditing(true)} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 border border-border rounded-full">Edit</button>
          <button onClick={remove} className="text-xs text-red-500 hover:text-red-600 px-3 py-1.5 border border-red-200 rounded-full">Remove</button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-3xl font-extrabold">{daysLeft !== null && daysLeft >= 0 ? daysLeft : '—'}</p>
          <p className="text-xs text-muted-foreground mt-0.5">days left</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-extrabold">{testsAvailable ?? '—'}</p>
          <p className="text-xs text-muted-foreground mt-0.5">tests you can fit</p>
        </div>
        <div className="text-center">
          <p className={`text-lg font-extrabold ${onTrack === true ? 'text-emerald-600 dark:text-emerald-400' : onTrack === false ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground'}`}>
            {onTrack === true ? '✓ On Track' : onTrack === false ? '⚠ Tight' : '—'}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">pace to 36</p>
        </div>
      </div>

      {onTrack === false && testsNeeded !== null && testsAvailable !== null && (
        <p className="mt-3 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/30 rounded-lg px-3 py-2">
          You need ~{testsNeeded} more test{testsNeeded !== 1 ? 's' : ''} but only have time for ~{testsAvailable}. Consider testing more frequently.
        </p>
      )}
    </div>
  )
}
