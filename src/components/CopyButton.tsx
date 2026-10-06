import { useState } from 'react'
import type { ShareOutcome } from '../lib/clipboard'
import { hapticSuccess } from '../lib/haptics'

interface CopyButtonProps {
  disabled: boolean
  onCopy: () => Promise<ShareOutcome>
}

type Status = 'idle' | 'busy' | ShareOutcome

const LABELS: Record<Status, string> = {
  idle: 'Copy to clipboard',
  busy: 'Skapar bild…',
  copied: '✓ Kopierad',
  shared: '✓ Delad',
  downloaded: '✓ Sparad',
  failed: 'Misslyckades, försök igen',
}

export function CopyButton({ disabled, onCopy }: CopyButtonProps) {
  const [status, setStatus] = useState<Status>('idle')

  async function handleClick() {
    if (disabled || status === 'busy') return
    setStatus('busy')
    const outcome = await onCopy()
    setStatus(outcome)
    if (outcome !== 'failed') hapticSuccess()
    setTimeout(() => setStatus('idle'), 2200)
  }

  const isSuccess = status === 'copied' || status === 'shared' || status === 'downloaded'

  return (
    <button
      type="button"
      className={`copy-button${status === 'failed' ? ' is-error' : ''}${isSuccess ? ' is-success' : ''}`}
      disabled={disabled || status === 'busy'}
      onClick={handleClick}
    >
      {LABELS[status]}
    </button>
  )
}
