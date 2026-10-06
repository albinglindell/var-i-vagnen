import { TrainBody } from './parts'
import { METRO_OLD_SPEC } from './specs'

/** SL-inspired classic boxy metro train (C20-style), 3 shorter cars. */
export function MetroOld() {
  return <TrainBody spec={METRO_OLD_SPEC} />
}
