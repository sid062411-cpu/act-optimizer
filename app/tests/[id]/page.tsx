import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import type { GeneratedTestContent, Question } from '@/types'
import { Card, CardContent } from '@/components/ui/card'

function QuestionBlock({ q, number }: { q: Question; number: number }) {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <p className="font-medium">{number}. {q.prompt}</p>
      <div className="space-y-1 text-sm">
        {(Object.entries(q.choices) as [string, string][]).map(([key, val]) => (
          <p key={key}><span className="font-mono font-semibold">{key}.</span> {val}</p>
        ))}
      </div>
    </div>
  )
}

function PassageGroup({ passage, questions, startNumber }: {
  passage: string
  questions: Question[]
  startNumber: number
}) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-4 text-sm leading-relaxed whitespace-pre-wrap bg-muted/50">
          {passage}
        </CardContent>
      </Card>
      <div className="space-y-3">
        {questions.map((q, i) => (
          <QuestionBlock key={q.id} q={q} number={startNumber + i} />
        ))}
      </div>
    </div>
  )
}

export default async function TestViewerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const test = await prisma.generatedTest.findUnique({ where: { id } })
  if (!test) notFound()

  const content: GeneratedTestContent = JSON.parse(test.content)

  const englishGroups = Array.from({ length: 5 }, (_, i) =>
    content.english.slice(i * 15, (i + 1) * 15)
  )
  const readingGroups = Array.from({ length: 4 }, (_, i) =>
    content.reading.slice(i * 10, (i + 1) * 10)
  )

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-12">
      <h1 className="text-2xl font-bold">Generated Practice Test</h1>

      <section>
        <h2 className="text-xl font-bold mb-6 border-b pb-2">English — 75 Questions</h2>
        <div className="space-y-10">
          {englishGroups.map((group, i) => (
            <PassageGroup
              key={i}
              passage={group[0]?.passage ?? ''}
              questions={group}
              startNumber={i * 15 + 1}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-6 border-b pb-2">Math — 60 Questions</h2>
        <div className="space-y-3">
          {content.math.map((q, i) => (
            <QuestionBlock key={q.id} q={q} number={i + 1} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-6 border-b pb-2">Reading — 40 Questions</h2>
        <div className="space-y-10">
          {readingGroups.map((group, i) => (
            <PassageGroup
              key={i}
              passage={group[0]?.passage ?? ''}
              questions={group}
              startNumber={i * 10 + 1}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
