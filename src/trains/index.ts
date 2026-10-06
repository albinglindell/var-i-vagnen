import type { ComponentType } from 'react'
import type { TrainKind } from '../types'
import { CommuterTrain } from './CommuterTrain'
import { MetroNew } from './MetroNew'
import { MetroOld } from './MetroOld'
import { TRAIN_HEIGHT } from './parts'
import { COMMUTER_SPEC, METRO_NEW_SPEC, METRO_OLD_SPEC, trainWidth } from './specs'

export { TRAIN_HEIGHT }

export interface TrainDimensions {
  width: number
  height: number
}

export interface TrainEntry {
  Component: ComponentType
  dimensions: TrainDimensions
  label: string
}

export const TRAIN_REGISTRY: Record<TrainKind, TrainEntry> = {
  commuter: {
    Component: CommuterTrain,
    dimensions: { width: trainWidth(COMMUTER_SPEC), height: TRAIN_HEIGHT },
    label: 'Pendeltåg',
  },
  'metro-new': {
    Component: MetroNew,
    dimensions: { width: trainWidth(METRO_NEW_SPEC), height: TRAIN_HEIGHT },
    label: 'Tunnelbana (nytt tåg)',
  },
  'metro-old': {
    Component: MetroOld,
    dimensions: { width: trainWidth(METRO_OLD_SPEC), height: TRAIN_HEIGHT },
    label: 'Tunnelbana (gammalt tåg)',
  },
}

/** Headroom reserved around the train illustration inside the stage viewBox, for the pin and direction labels. */
export const STAGE_PADDING = {
  side: 95,
  top: 135,
  bottom: 50,
}

export function getStageViewBox(dimensions: TrainDimensions) {
  const width = dimensions.width + STAGE_PADDING.side * 2
  const height = dimensions.height + STAGE_PADDING.top + STAGE_PADDING.bottom
  return { width, height }
}
