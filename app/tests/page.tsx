import { prisma } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const SECTION_TIMES: Record<string, string> = { english: '45 min', math: '60 min', reading: '35 min' }

export default async function TestsPage() {
  const tests = await prisma.practiceTest.findMany({
    orderBy: { createdAt: 'asc' },
    include: { _count: { select: { questions: true } } },
  })

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-1">Practice Tests</h1>
        <p className="text-muted-foreground">
          Take a timed practice test, get your score immediately, and see exactly what you missed.
        </p>
      </div>

      {tests.length === 0 ? (
        <p className="text-muted-foreground text-center py-20">No tests available yet.</p>
      ) : (
        <div className="grid gap-5">
          {tests.map((test) => (
            <div key={test.id} className="bg-white dark:bg-card rounded-2xl border border-border/60 shadow-sm p-6 flex items-center justify-between gap-6 flex-wrap">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{test.source}</p>
                <h2 className="text-xl font-extrabold mb-2">{test.title}</h2>
                <div className="flex gap-4 flex-wrap">
                  {(['english', 'math', 'reading'] as const).map((s) => (
                    <span key={s} className="text-xs text-muted-foreground">
                      <span className="font-semibold capitalize text-foreground">{s}</span>
                      {' · '}{SECTION_TIMES[s]}
                    </span>
                  ))}
                  <span className="text-xs text-muted-foreground">{test._count.questions} questions total</span>
                </div>
              </div>
              <Link
                href={`/tests/${test.id}/take`}
                className="px-6 py-3 rounded-full bg-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity shrink-0"
              >
                Start Test →
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 bg-muted/50 rounded-2xl p-6 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">About these tests</p>
        <p>These are original ACT-style practice questions covering all tested topics. Each test is timed per section (English 45 min, Math 60 min, Reading 35 min). Your scores are calculated and mapped to the ACT scale immediately after you finish.</p>
      </div>
    </main>
  )
}
