export function hapticTap(): void {
  try {
    navigator.vibrate?.(12)
  } catch {
    // no-op: vibration not supported
  }
}

export function hapticSuccess(): void {
  try {
    navigator.vibrate?.([10, 30, 20])
  } catch {
    // no-op: vibration not supported
  }
}
