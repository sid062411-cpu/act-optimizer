import { TestLogForm } from '@/components/TestLogForm'

export default function LogPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold">Log a Practice Test</h1>
        <p className="text-muted-foreground mt-1">Record your latest scores to track your progress toward 36.</p>
      </div>
      <TestLogForm />
    </main>
  )
}
