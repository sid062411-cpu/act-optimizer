'use client'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="px-5 py-2.5 rounded-full border border-border font-semibold text-sm hover:bg-muted transition-colors no-print"
    >
      Export PDF
    </button>
  )
}
