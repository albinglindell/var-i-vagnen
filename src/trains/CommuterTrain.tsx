import { TrainBody } from './parts'
import { COMMUTER_SPEC } from './specs'

/** SL-inspired commuter train (X60-style), 2 cars. Pure illustration, drawn at (0,0). */
export function CommuterTrain() {
  return <TrainBody spec={COMMUTER_SPEC} />
}
