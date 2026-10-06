import { TrainBody } from './parts'
import { METRO_NEW_SPEC } from './specs'

/** SL-inspired modern metro train (C30-style), 2 long cars. */
export function MetroNew() {
  return <TrainBody spec={METRO_NEW_SPEC} />
}
