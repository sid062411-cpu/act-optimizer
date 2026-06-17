import { prisma } from '@/lib/db'
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table'
import Link from 'next/link'

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

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold">Test History</h1>
          <p className="text-muted-foreground mt-1">
            {results.length} test{results.length !== 1 ? 's' : ''} logged
          </p>
        </div>
        <Link
          href="/log"
          className="px-5 py-2.5 rounded-full bg-primary text-white font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          + Log Test
        </Link>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg font-medium mb-2">No tests logged yet</p>
          <p className="text-sm">Log your first practice test to start tracking progress.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold text-foreground">Date</TableHead>
                <TableHead className="font-semibold text-foreground">English</TableHead>
                <TableHead className="font-semibold text-foreground">Math</TableHead>
                <TableHead className="font-semibold text-foreground">Reading</TableHead>
                <TableHead className="font-semibold text-foreground">Composite</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((r) => (
                <TableRow key={r.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="text-sm text-muted-foreground">
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  )
}
