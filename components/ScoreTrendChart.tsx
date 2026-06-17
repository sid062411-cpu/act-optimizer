'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import type { ScoreEntry } from '@/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const entry = payload[0]?.payload as ScoreEntry | undefined
  return (
    <div className="bg-white border border-border/60 shadow-lg rounded-xl p-3 text-sm min-w-[160px]">
      <p className="font-semibold mb-1 text-muted-foreground">{label}</p>
      {entry && (
        <p className="text-xs text-muted-foreground mb-2">{entry.date}</p>
      )}
      {payload.map((e: { name: string; value: number; color: string }) => (
        <div key={e.name} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: e.color }} />
            <span className="text-muted-foreground">{e.name}</span>
          </div>
          <span className="font-semibold tabular-nums">{e.value}</span>
        </div>
      ))}
    </div>
  )
}

export function ScoreTrendChart({ data }: { data: ScoreEntry[] }) {
  if (data.length === 0) return null
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 8, right: 24, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7f0" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          domain={[18, 36]}
          tick={{ fontSize: 12, fill: '#94a3b8' }}
          tickLine={false}
          axisLine={false}
          ticks={[18, 24, 30, 36]}
        />
        <ReferenceLine
          y={36}
          stroke="#6366f1"
          strokeDasharray="5 3"
          strokeWidth={1.5}
          label={{ value: '36 target', position: 'right', fill: '#6366f1', fontSize: 11, fontWeight: 600 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
        />
        <Line type="monotone" dataKey="englishScore"   name="English"   stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 0, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="mathScore"      name="Math"      stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 0, fill: '#10b981' }} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="readingScore"   name="Reading"   stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 0, fill: '#f59e0b' }} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="compositeScore" name="Composite" stroke="#6366f1" strokeWidth={3}   dot={{ r: 5, strokeWidth: 0, fill: '#6366f1' }} activeDot={{ r: 7 }} strokeDasharray="6 3" />
      </LineChart>
    </ResponsiveContainer>
  )
}
