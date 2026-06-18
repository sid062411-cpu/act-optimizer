import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { EditTestForm } from '@/components/EditTestForm'

export default async function EditTestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const test = await prisma.testResult.findUnique({ where: { id } })
  if (!test) notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-1">Edit Test</h1>
        <p className="text-muted-foreground">
          {new Date(test.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
      <EditTestForm test={{
        id: test.id,
        date: test.date.toISOString(),
        englishRaw: test.englishRaw, englishScore: test.englishScore,
        mathRaw: test.mathRaw,       mathScore: test.mathScore,
        readingRaw: test.readingRaw, readingScore: test.readingScore,
        notes: test.notes,
        studyTopics: test.studyTopics,
        missedQuestions: test.missedQuestions,
      }} />
    </main>
  )
}
