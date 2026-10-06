export type TrainKind = 'commuter' | 'metro-new' | 'metro-old'

export type VehicleChoice =
  | { category: 'pendeltag' }
  | { category: 'tunnelbana'; variant: 'new' | 'old' }

export interface Pin {
  /** 0..1, relative to the train illustration's own bounding box */
  x: number
  /** 0..1, relative to the train illustration's own bounding box */
  y: number
}

export interface StoredSelection {
  category: 'pendeltag' | 'tunnelbana'
  variant?: 'new' | 'old'
}

export function vehicleToTrainKind(choice: VehicleChoice): TrainKind {
  if (choice.category === 'pendeltag') return 'commuter'
  return choice.variant === 'new' ? 'metro-new' : 'metro-old'
}
