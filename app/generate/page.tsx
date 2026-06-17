'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function GeneratePage() {
  const router = useRouter()
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate() {
    setGenerating(true)
    setError(null)
    const res = await fetch('/api/generate', { method: 'POST' })
    setGenerating(false)
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Generation failed')
      return
    }
    const { id } = await res.json()
    router.push(`/tests/${id}`)
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Generate Practice Test</h1>
      <Card>
        <CardHeader><CardTitle>AI-Generated Full ACT Practice Test</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Generates English (75 questions), Math (60 questions), and Reading (40 questions).
            Takes approximately 1–3 minutes.
          </p>
          {generating && (
            <p className="text-sm text-muted-foreground animate-pulse">
              Generating sections... this may take a few minutes.
            </p>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={handleGenerate} disabled={generating} className="w-full">
            {generating ? 'Generating...' : 'Generate Full Practice Test'}
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
