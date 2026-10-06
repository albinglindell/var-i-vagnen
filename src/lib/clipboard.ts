export type ShareOutcome = 'copied' | 'shared' | 'downloaded' | 'failed'

function downloadBlob(blob: Blob): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'var-i-vagnen.png'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

/**
 * Copies the image to the clipboard, falling back to the Web Share sheet or a
 * direct download when the platform doesn't support image clipboard writes.
 *
 * `getBlob` is invoked synchronously (before any `await`) so the resulting
 * promise can be handed straight to `ClipboardItem` — Safari only honours
 * `clipboard.write` as a user-gesture action if the call itself happens
 * synchronously within the click handler, even though the blob resolves later.
 */
export async function copyOrShareImage(getBlob: () => Promise<Blob>): Promise<ShareOutcome> {
  const supportsClipboardImages =
    typeof window !== 'undefined' && 'ClipboardItem' in window && !!navigator.clipboard?.write

  if (supportsClipboardImages) {
    try {
      const blobPromise = getBlob()
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blobPromise })])
      return 'copied'
    } catch {
      // fall through to share / download below
    }
  }

  try {
    const blob = await getBlob()
    const file = new File([blob], 'var-i-vagnen.png', { type: 'image/png' })

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: 'Var i vagnen' })
      return 'shared'
    }

    downloadBlob(blob)
    return 'downloaded'
  } catch {
    return 'failed'
  }
}
