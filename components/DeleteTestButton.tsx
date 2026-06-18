'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function DeleteTestButton({ id }: { id: string }) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    setDeleting(true)
    await fetch(`/api/test-results/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-1.5">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-2.5 py-1 rounded-full transition-colors disabled:opacity-50"
        >
          {deleting ? '…' : 'Confirm'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Cancel
        </button>
      </span>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs text-red-500 hover:text-red-600 px-2.5 py-1 border border-red-200 rounded-full transition-colors"
    >
      Delete
    </button>
  )
}
