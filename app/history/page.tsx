import { prisma } from '@/lib/db'
import type { TestResult } from '@prisma/client'
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { PrintButton } from '@/components/PrintButton'

export const dynamic = 'force-dynamic'

function scoreColor(score: number): string {
  if (score >= 34) return 'text-emerald-600 font-semibold'
  if (score >= 30) return 'text-blue-600 font-semibold'
  if (score >= 26) return 'text-amber-600 font-semibold'
  return 'text-red-500 font-semibold'
}

export default async function HistoryPage() {
  const results = await prisma.testResult.findMany({ orderBy: { date: 'desc' } })

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">

      <div className="flex items-center justify-between mb-8 no-print">
        <div>
          <h1 className="text-3xl font-extrabold">Test History</h1>
          <p className="text-muted-foreground mt-1">{results.length} test{results.length !== 1 ? 's' : ''} logged</p>
        </div>
        <div className="flex gap-3">
          <PrintButton />
          <Link href="/log" className="px-5 py-2.5 rounded-full bg-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity">
            + Log Test
          </Link>
        </div>
      </div>

      {/* Print header */}
      <div className="print-only mb-6">
        <h1 className="text-2xl font-bold">ACT Optimizer — Test History</h1>
        <p className="text-sm text-gray-500">Printed {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg font-medium mb-2">No tests logged yet</p>
          <p className="text-sm">Log your first practice test to start tracking progress.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-foreground">Date</TableHead>
                  <TableHead className="font-semibold text-foreground">English</TableHead>
                  <TableHead className="font-semibold text-foreground">Math</TableHead>
                  <TableHead className="font-semibold text-foreground">Reading</TableHead>
                  <TableHead className="font-semibold text-foreground">Composite</TableHead>
                  <TableHead className="font-semibold text-foreground no-print">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((r: TestResult) => {
                  const topics: string[] = JSON.parse(r.studyTopics || '[]')
                  return (
                    <TableRow key={r.id} className="hover:bg-muted/30 transition-colors align-top">
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </TableCell>
                      <TableCell>
                        <span className={scoreColor(r.englishScore)}>{r.englishScore}</span>
                        <span className="text-muted-foreground text-xs ml-1.5">({r.englishRaw}/75)</span>
                      </TableCell>
                      <TableCell>
                        <span className={scoreColor(r.mathScore)}>{r.mathScore}</span>
                        <span className="text-muted-foreground text-xs ml-1.5">({r.mathRaw}/60)</span>
                      </TableCell>
                      <TableCell>
                        <span className={scoreColor(r.readingScore)}>{r.readingScore}</span>
                        <span className="text-muted-foreground text-xs ml-1.5">({r.readingRaw}/40)</span>
                      </TableCell>
                      <TableCell>
                        <span className={`text-lg ${scoreColor(r.compositeScore)}`}>{r.compositeScore}</span>
                        <span className="text-muted-foreground text-xs ml-1">/36</span>
                      </TableCell>
                      <TableCell className="no-print max-w-xs">
                        {r.notes && <p className="text-xs text-muted-foreground mb-1">{r.notes}</p>}
                        {topics.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {topics.map((t) => (
                              <span key={t} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{t}</span>
                            ))}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </main>
  )
}
