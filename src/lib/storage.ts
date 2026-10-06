import type { StoredSelection } from '../types'

const KEY = 'var-i-vagnen:selection'

export function loadSelection(): StoredSelection | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.category === 'pendeltag' || parsed?.category === 'tunnelbana') {
      return parsed as StoredSelection
    }
    return null
  } catch {
    return null
  }
}

export function saveSelection(selection: StoredSelection): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(selection))
  } catch {
    // ignore storage failures (private mode, quota, etc.)
  }
}
