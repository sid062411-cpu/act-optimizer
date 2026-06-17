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
