'use client'

import { useState, useEffect, useCallback, use } from 'react'
import { useRouter } from 'next/navigation'

type Choice = Record<string, string>
type Question = {
  id: string; section: string; number: number
  passageTitle: string | null; passage: string | null
  stem: string; choices: string; answer: string; topic: string | null
}
type Test = { id: string; title: string; questions: Question[] }

const SECTION_ORDER = ['english', 'math', 'reading'] as const
type Section = (typeof SECTION_ORDER)[number]
const SECTION_TIMES: Record<Section, number> = { english: 45 * 60, math: 60 * 60, reading: 35 * 60 }
const SECTION_COLORS: Record<Section, string> = {
  english: 'text-blue-600 dark:text-blue-400',
  math: 'text-emerald-600 dark:text-emerald-400',
  reading: 'text-amber-600 dark:text-amber-400',
}

function fmt(s: number) {
  const m = Math.floor(Math.abs(s) / 60).toString().padStart(2, '0')
  const sec = (Math.abs(s) % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

export default function TakePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: testId } = use(params)
  const router = useRouter()

  const [test, setTest] = useState<Test | null>(null)
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [section, setSection] = useState<Section>('english')
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(SECTION_TIMES.english)
  const [sectionDone, setSectionDone] = useState<Record<string, boolean>>({})
  const [submitting, setSubmitting] = useState(false)
  const [phase, setPhase] = useState<'loading' | 'intro' | 'test' | 'done'>('loading')

  // Load test and create attempt
  useEffect(() => {
    fetch(`/api/tests/${testId}`)
      .then((r) => r.json())
      .then((data) => { setTest(data); setPhase('intro') })
  }, [testId])

  // Timer per section
  useEffect(() => {
    if (phase !== 'test') return
    setTimeLeft(SECTION_TIMES[section])
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(id); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [section, phase])

  async function startTest() {
    const res = await fetch('/api/attempts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ testId }),
    })
    const data = await res.json()
    setAttemptId(data.id)
    setPhase('test')
    setSection('english')
    setQIdx(0)
  }

  const saveAnswer = useCallback(async (questionId: string, selected: string) => {
    if (!attemptId) return
    setAnswers((prev) => ({ ...prev, [questionId]: selected }))
    fetch(`/api/attempts/${attemptId}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, selected }),
    })
  }, [attemptId])

  async function finishTest() {
    if (!attemptId) return
    setSubmitting(true)
    const res = await fetch(`/api/attempts/${attemptId}/submit`, { method: 'POST' })
    const data = await res.json()
    router.push(`/tests/${testId}/results?attempt=${data.attemptId}`)
  }

  function advanceSection() {
    const idx = SECTION_ORDER.indexOf(section)
    if (idx < SECTION_ORDER.length - 1) {
      setSectionDone((p) => ({ ...p, [section]: true }))
      const next = SECTION_ORDER[idx + 1]
      setSection(next)
      setQIdx(0)
    } else {
      finishTest()
    }
  }

  if (phase === 'loading') {
    return (
      <main className="min-h-[80vh] flex items-center justify-center">
        <p className="text-muted-foreground">Loading test…</p>
      </main>
    )
  }

  if (phase === 'intro' && test) {
    const bySection = SECTION_ORDER.map((s) => ({
      s, count: test.questions.filter((q) => q.section === s).length,
    }))
    return (
      <main className="max-w-lg mx-auto px-6 py-16 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Practice Test</p>
        <h1 className="text-3xl font-extrabold mb-3">{test.title}</h1>
        <p className="text-muted-foreground mb-8">Take each section under real ACT time limits. Your score is calculated the moment you finish.</p>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {bySection.map(({ s, count }) => (
            <div key={s} className="bg-white dark:bg-card rounded-xl border border-border/60 p-4">
              <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${SECTION_COLORS[s]}`}>{s}</p>
              <p className="text-2xl font-extrabold">{count}</p>
              <p className="text-xs text-muted-foreground">questions</p>
              <p className="text-xs text-muted-foreground mt-0.5">{fmt(SECTION_TIMES[s])}</p>
            </div>
          ))}
        </div>
        <button
          onClick={startTest}
          className="px-8 py-3 rounded-full bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Start Test
        </button>
      </main>
    )
  }

  if (phase !== 'test' || !test) return null

  const sectionQs = test.questions.filter((q) => q.section === section)
  const q = sectionQs[qIdx]
  if (!q) return null
  const choices: Choice = JSON.parse(q.choices)
  const selected = answers[q.id]
  const answeredCount = sectionQs.filter((q) => answers[q.id]).length
  const isLast = qIdx === sectionQs.length - 1
  const allSectionsDone = SECTION_ORDER.every((s, i) =>
    i < SECTION_ORDER.indexOf(section) ? sectionDone[s] : true
  )
  const isLastSection = section === 'reading'
  const urgent = timeLeft <= 300 && timeLeft > 0

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-border/60 bg-white/90 dark:bg-background/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {SECTION_ORDER.map((s, i) => (
              <button
                key={s}
                disabled={i > SECTION_ORDER.indexOf(section)}
                onClick={() => { if (sectionDone[s] || s === section) { setSection(s); setQIdx(0) } }}
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors ${
                  s === section ? 'bg-primary text-white' :
                  sectionDone[s] ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' :
                  'text-muted-foreground opacity-40 cursor-not-allowed'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">{answeredCount}/{sectionQs.length} answered</span>
            <span className={`font-mono font-bold text-sm ${urgent ? 'text-red-500' : 'text-foreground'}`}>
              {fmt(timeLeft)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 max-w-6xl mx-auto w-full px-4 py-6 gap-6">
        {/* Question sidebar */}
        <aside className="hidden md:flex flex-col gap-1 w-16 shrink-0">
          {sectionQs.map((sq, i) => (
            <button
              key={sq.id}
              onClick={() => setQIdx(i)}
              className={`w-10 h-10 rounded-lg text-xs font-bold transition-colors ${
                i === qIdx ? 'bg-primary text-white' :
                answers[sq.id] ? 'bg-primary/20 text-primary' :
                'bg-muted text-muted-foreground hover:bg-muted/70'
              }`}
            >
              {sq.number}
            </button>
          ))}
        </aside>

        {/* Main question area */}
        <main className="flex-1 min-w-0">
          {q.passage && (
            <div className="bg-muted/30 dark:bg-muted/10 rounded-xl p-5 mb-5 max-h-64 overflow-y-auto text-sm leading-relaxed border border-border/40">
              {q.passageTitle && <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{q.passageTitle}</p>}
              <p className="whitespace-pre-wrap">{q.passage}</p>
            </div>
          )}

          <div className="bg-white dark:bg-card rounded-2xl border border-border/60 shadow-sm p-6">
            <div className="flex items-start gap-3 mb-6">
              <span className={`text-xs font-bold uppercase tracking-widest shrink-0 mt-0.5 ${SECTION_COLORS[section]}`}>
                {section} · Q{q.number}
              </span>
              {q.topic && <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{q.topic}</span>}
            </div>
            <p className="font-medium text-base mb-6 leading-relaxed">{q.stem}</p>

            <div className="space-y-2.5">
              {Object.entries(choices).map(([letter, text]) => (
                <button
                  key={letter}
                  onClick={() => saveAnswer(q.id, letter)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                    selected === letter
                      ? 'bg-primary text-white border-primary'
                      : 'border-border/60 hover:border-primary/40 hover:bg-muted/40'
                  }`}
                >
                  <span className={`font-bold shrink-0 w-5 ${selected === letter ? 'text-white' : 'text-primary'}`}>{letter}.</span>
                  <span>{text}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
              <button
                onClick={() => setQIdx((i) => Math.max(0, i - 1))}
                disabled={qIdx === 0}
                className="px-5 py-2 rounded-full border border-border text-sm font-semibold hover:bg-muted transition-colors disabled:opacity-40"
              >
                ← Previous
              </button>

              {isLast ? (
                <button
                  onClick={advanceSection}
                  disabled={submitting}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm text-white hover:opacity-90 transition-opacity disabled:opacity-50 ${
                    isLastSection ? 'bg-emerald-600' : 'bg-primary'
                  }`}
                >
                  {submitting ? 'Scoring…' : isLastSection ? 'Submit & See Score →' : `Finish ${section.charAt(0).toUpperCase() + section.slice(1)} →`}
                </button>
              ) : (
                <button
                  onClick={() => setQIdx((i) => i + 1)}
                  className="px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
