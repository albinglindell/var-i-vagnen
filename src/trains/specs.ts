import type { Palette } from './parts'

export interface TrainSpec {
  wagonCount: number
  wagonWidth: number
  gap: number
  tailWidth: number
  noseWidth: number
  doorsPerWagon: number
  palette: Palette
  boxy?: boolean
}

export function trainWidth(spec: TrainSpec): number {
  return spec.tailWidth + spec.wagonCount * spec.wagonWidth + (spec.wagonCount - 1) * spec.gap + spec.noseWidth
}

/**
 * X60 pendeltåg: pale blue-grey body (just a hint of blue) with a blue window-level stripe.
 * Real X60: a 6-car double unit is ~107m long and 3.26m wide (~17.8m per car) — length:width ≈ 5.5:1.
 */
export const COMMUTER_SPEC: TrainSpec = {
  wagonCount: 2,
  wagonWidth: 454,
  gap: 14,
  tailWidth: 14,
  noseWidth: 56,
  doorsPerWagon: 3,
  palette: {
    body: '#e4e8ec',
    roof: '#d6dbe0',
    accent: '#0b5fd9',
    window: '#bcd4ea',
    windshield: '#17202b',
    door: '#9fc2e3',
  },
}

/**
 * C30 metro: white body, blue door panels, grey underbody skirt.
 * Real C30: each "vagn" is 70m long and 2.92m wide — length:width ≈ 24:1, by far the most slender of the three.
 */
export const METRO_NEW_SPEC: TrainSpec = {
  wagonCount: 2,
  wagonWidth: 671,
  gap: 10,
  tailWidth: 14,
  noseWidth: 58,
  doorsPerWagon: 4,
  palette: {
    body: '#d9dde2',
    roof: '#cdd2d8',
    accent: '#0b5fd9',
    window: '#9fb4c4',
    windshield: '#121b24',
    door: '#1f86d6',
    skirt: '#878d96',
  },
}

/**
 * C20 metro: blue body with a black driver's cab and roof, silver livery stripe.
 * Real C20: each "vagn" is 46.5m long and 2.9m wide — length:width ≈ 16:1.
 */
export const METRO_OLD_SPEC: TrainSpec = {
  wagonCount: 3,
  wagonWidth: 375,
  gap: 12,
  tailWidth: 14,
  noseWidth: 46,
  doorsPerWagon: 3,
  boxy: true,
  palette: {
    body: '#1c5fae',
    cab: '#15181c',
    roof: '#15181c',
    accent: '#c7ccd1',
    window: '#121a22',
    windshield: '#0b1016',
    door: '#0c3b74',
  },
}
