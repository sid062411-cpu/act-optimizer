'use client'

export function CsvExportButton() {
  async function handleExport() {
    const res = await fetch('/api/test-results')
    const data = await res.json()

    const headers = ['Date', 'English Raw', 'English Score', 'Math Raw', 'Math Score', 'Reading Raw', 'Reading Score', 'Composite', 'Notes', 'Study Topics']
    const rows = data.map((r: Record<string, unknown>) => [
      new Date(r.date as string).toLocaleDateString('en-US'),
      r.englishRaw, r.englishScore,
      r.mathRaw, r.mathScore,
      r.readingRaw, r.readingScore,
      r.compositeScore,
      `"${((r.notes as string) ?? '').replace(/"/g, '""')}"`,
      `"${JSON.parse((r.studyTopics as string) || '[]').join(', ')}"`,
    ])

    const csv = [headers.join(','), ...rows.map((r: unknown[]) => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `act-scores-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExport}
      className="px-5 py-2.5 rounded-full border border-border font-semibold text-sm hover:bg-muted transition-colors no-print"
    >
      Export CSV
    </button>
  )
}
