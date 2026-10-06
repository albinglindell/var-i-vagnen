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

/** X60 pendeltåg: pale blue-grey body (just a hint of blue) with a blue window-level stripe. */
export const COMMUTER_SPEC: TrainSpec = {
  wagonCount: 2,
  wagonWidth: 340,
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

/** C30 metro: white body, blue door panels, grey underbody skirt. */
export const METRO_NEW_SPEC: TrainSpec = {
  wagonCount: 2,
  wagonWidth: 360,
  gap: 10,
  tailWidth: 14,
  noseWidth: 58,
  doorsPerWagon: 4,
  palette: {
    body: '#eef1f5',
    roof: '#f8fafc',
    accent: '#0b5fd9',
    window: '#9fb4c4',
    windshield: '#121b24',
    door: '#1f86d6',
    skirt: '#878d96',
  },
}

/** C20 metro: blue body with a black driver's cab and roof, silver livery stripe. */
export const METRO_OLD_SPEC: TrainSpec = {
  wagonCount: 3,
  wagonWidth: 250,
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
