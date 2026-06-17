import { prisma } from '@/lib/db'
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
  const results = await prisma.testResult.findMany({ orderBy: { date: 'desc' } })

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Test History</h1>
        <Link href="/log" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm">
          Log New Test
        </Link>
      </div>
      {results.length === 0 ? (
        <p className="text-muted-foreground">No tests logged yet.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>English</TableHead>
              <TableHead>Math</TableHead>
              <TableHead>Reading</TableHead>
              <TableHead>Composite</TableHead>
              <TableHead>Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{new Date(r.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  {r.englishScore}
                  <span className="text-muted-foreground text-xs ml-1">({r.englishRaw}/75)</span>
                </TableCell>
                <TableCell>
                  {r.mathScore}
                  <span className="text-muted-foreground text-xs ml-1">({r.mathRaw}/60)</span>
                </TableCell>
                <TableCell>
                  {r.readingScore}
                  <span className="text-muted-foreground text-xs ml-1">({r.readingRaw}/40)</span>
                </TableCell>
                <TableCell><strong>{r.compositeScore}</strong></TableCell>
                <TableCell>
                  <Badge variant={r.source === 'GENERATED' ? 'secondary' : 'outline'}>
                    {r.source}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  )
}
