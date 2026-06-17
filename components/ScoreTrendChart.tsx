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
