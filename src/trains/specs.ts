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

export const COMMUTER_SPEC: TrainSpec = {
  wagonCount: 2,
  wagonWidth: 340,
  gap: 14,
  tailWidth: 14,
  noseWidth: 56,
  doorsPerWagon: 3,
  palette: {
    body: '#3b3f45',
    accent: '#d3232b',
    window: '#dbe9f5',
    door: '#2a2d31',
    roof: '#55595f',
  },
}

export const METRO_NEW_SPEC: TrainSpec = {
  wagonCount: 2,
  wagonWidth: 360,
  gap: 10,
  tailWidth: 14,
  noseWidth: 58,
  doorsPerWagon: 4,
  palette: {
    body: '#f4f6f9',
    accent: '#0057a8',
    window: '#1c2c3a',
    door: '#cfe0f0',
    roof: '#0057a8',
  },
}

export const METRO_OLD_SPEC: TrainSpec = {
  wagonCount: 3,
  wagonWidth: 250,
  gap: 12,
  tailWidth: 14,
  noseWidth: 46,
  doorsPerWagon: 3,
  boxy: true,
  palette: {
    body: '#0057a8',
    accent: '#ffffff',
    window: '#e7eef5',
    door: '#003e7a',
    roof: '#003e7a',
  },
}
