'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const PRESETS = [
  { label: 'English', minutes: 45, color: 'bg-blue-500',    ring: 'text-blue-500'    },
  { label: 'Math',    minutes: 60, color: 'bg-emerald-500', ring: 'text-emerald-500' },
  { label: 'Reading', minutes: 35, color: 'bg-amber-500',   ring: 'text-amber-500'   },
]

function beep(ctx: AudioContext) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.frequency.value = 880
  gain.gain.setValueAtTime(0.4, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.6)
}

function fmt(s: number) {
  const m = Math.floor(Math.abs(s) / 60).toString().padStart(2, '0')
  const sec = (Math.abs(s) % 60).toString().padStart(2, '0')
  return `${s < 0 ? '-' : ''}${m}:${sec}`
}

export default function TimerPage() {
  const [totalSeconds, setTotalSeconds] = useState(45 * 60)
  const [remaining, setRemaining] = useState(45 * 60)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [activePreset, setActivePreset] = useState(0)
  const [customMin, setCustomMin] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioRef = useRef<AudioContext | null>(null)

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setRunning(false)
  }, [])

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          stop()
          setDone(true)
          if (!audioRef.current) audioRef.current = new AudioContext()
          beep(audioRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, stop])

  function selectPreset(idx: number) {
    stop()
    setDone(false)
    const secs = PRESETS[idx].minutes * 60
    setTotalSeconds(secs)
    setRemaining(secs)
    setActivePreset(idx)
    setCustomMin('')
  }

  function applyCustom() {
    const m = parseInt(customMin)
    if (!m || m <= 0 || m > 180) return
    stop()
    setDone(false)
    const secs = m * 60
    setTotalSeconds(secs)
    setRemaining(secs)
    setActivePreset(-1)
  }

  function reset() {
    stop()
    setDone(false)
    setRemaining(totalSeconds)
  }

  const pct = totalSeconds > 0 ? (remaining / totalSeconds) * 100 : 0
  const urgent = remaining <= 300 && remaining > 0
  const color = done ? 'text-red-500' : urgent ? 'text-amber-500' : activePreset >= 0 ? PRESETS[activePreset].ring : 'text-primary'
  const circumference = 2 * Math.PI * 120

  return (
    <main className="max-w-lg mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold mb-1">Section Timer</h1>
      <p className="text-muted-foreground mb-8">Time your practice sections just like the real ACT.</p>

      {/* Presets */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => selectPreset(i)}
            className={`rounded-2xl border py-4 text-center transition-all ${
              activePreset === i
                ? `${p.color} text-white border-transparent shadow-md`
                : 'bg-white border-border/60 hover:border-primary/40'
            }`}
          >
            <p className="font-bold">{p.label}</p>
            <p className={`text-sm ${activePreset === i ? 'text-white/80' : 'text-muted-foreground'}`}>{p.minutes} min</p>
          </button>
        ))}
      </div>

      {/* Clock */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 264 264">
            <circle cx="132" cy="132" r="120" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/40" />
            <circle
              cx="132" cy="132" r="120" fill="none"
              stroke="currentColor" strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - pct / 100)}
              strokeLinecap="round"
              className={`transition-all duration-1000 ${color}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-extrabold tabular-nums ${color}`}>{fmt(remaining)}</span>
            {done && <span className="text-sm font-semibold text-red-500 mt-1">Time&apos;s up!</span>}
            {urgent && !done && <span className="text-xs font-semibold text-amber-500 mt-1">Almost done</span>}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center mb-8">
        <button
          onClick={() => { if (!audioRef.current) audioRef.current = new AudioContext(); setRunning(true) }}
          disabled={running || done || remaining === 0}
          className="px-8 py-3 rounded-full bg-primary text-white font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          Start
        </button>
        <button
          onClick={stop}
          disabled={!running}
          className="px-8 py-3 rounded-full border border-border font-semibold disabled:opacity-40 hover:bg-muted transition-colors"
        >
          Pause
        </button>
        <button
          onClick={reset}
          className="px-8 py-3 rounded-full border border-border font-semibold hover:bg-muted transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Custom time */}
      <div className="bg-white rounded-2xl border border-border/60 p-5">
        <p className="text-sm font-semibold mb-3">Custom Duration</p>
        <div className="flex gap-3">
          <input
            type="number" min={1} max={180} placeholder="Minutes"
            value={customMin}
            onChange={(e) => setCustomMin(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyCustom()}
            className="flex-1 border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            onClick={applyCustom}
            className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Set
          </button>
        </div>
      </div>
    </main>
  )
}
