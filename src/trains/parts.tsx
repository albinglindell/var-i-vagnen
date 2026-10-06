import type { TrainSpec } from './specs'

export const TRAIN_HEIGHT = 190

export interface Palette {
  body: string
  /** Front cab / nose shell color, when it differs from the body (e.g. a black driver's cab). */
  cab?: string
  roof: string
  accent: string
  window: string
  /** Front windshield tint, when it differs from the passenger window tint. */
  windshield?: string
  door: string
  /** Optional darker band along the bottom of the body, above the bogies. */
  skirt?: string
}

interface WagonProps {
  x: number
  width: number
  palette: Palette
  doorCount: number
  boxy?: boolean
}

/** One train car: body shell, window band, doors and bogies, drawn at local x offset. */
export function Wagon({ x, width, palette, doorCount, boxy }: WagonProps) {
  const h = TRAIN_HEIGHT
  const bodyTop = 26
  const bodyHeight = h - 58
  const radius = boxy ? 6 : 16
  const doorWidth = 36
  const doorMargin = width * 0.14
  const usableWidth = width - doorMargin * 2 - doorWidth
  const step = doorCount > 1 ? usableWidth / (doorCount - 1) : 0
  const doorBottom = bodyTop + bodyHeight * (palette.skirt ? 0.84 : 0.98)

  const doors = Array.from({ length: doorCount }, (_, i) => {
    const doorX = doorMargin + (doorCount > 1 ? i * step : usableWidth / 2)
    return (
      <g key={i}>
        <rect
          x={doorX}
          y={bodyTop + bodyHeight * 0.3}
          width={doorWidth}
          height={doorBottom - (bodyTop + bodyHeight * 0.3)}
          rx={4}
          fill={palette.door}
        />
        <line
          x1={doorX + doorWidth / 2}
          y1={bodyTop + bodyHeight * 0.34}
          x2={doorX + doorWidth / 2}
          y2={doorBottom - 2}
          stroke="#000000"
          strokeWidth={1.5}
          opacity={0.25}
        />
      </g>
    )
  })

  return (
    <g transform={`translate(${x}, 0)`}>
      <rect x={6} y={h - 16} width={width - 12} height={8} rx={3} fill="#00000022" />
      <rect x={0} y={bodyTop} width={width} height={bodyHeight} rx={radius} fill={palette.body} />
      <rect
        x={0}
        y={bodyTop}
        width={width}
        height={bodyHeight * 0.14}
        rx={radius}
        fill={palette.roof}
      />
      <rect
        x={width * 0.06}
        y={bodyTop + bodyHeight * 0.22}
        width={width * 0.88}
        height={bodyHeight * 0.32}
        rx={10}
        fill={palette.window}
      />
      <rect
        x={0}
        y={bodyTop + bodyHeight * 0.62}
        width={width}
        height={bodyHeight * 0.1}
        fill={palette.accent}
      />
      {doors}
      {palette.skirt && (
        <rect
          x={0}
          y={bodyTop + bodyHeight * 0.86}
          width={width}
          height={bodyHeight * 0.14}
          rx={radius * 0.4}
          fill={palette.skirt}
        />
      )}
      <rect x={width * 0.18} y={h - 20} width={46} height={12} rx={5} fill="#1a1a1a" />
      <rect x={width * 0.68} y={h - 20} width={46} height={12} rx={5} fill="#1a1a1a" />
    </g>
  )
}

export function Coupling({ x, width }: { x: number; width: number }) {
  return (
    <rect
      x={x}
      y={TRAIN_HEIGHT / 2 - 7}
      width={width}
      height={14}
      rx={3}
      fill="#5a5a5a"
    />
  )
}

/** Rounded driver's cab with a windshield and headlights, facing travel direction (right). */
export function NoseCab({ x, width: noseWidth, palette }: { x: number; width: number; palette: Palette }) {
  const h = TRAIN_HEIGHT
  const bodyTop = 26
  const bodyHeight = h - 58
  const cabColor = palette.cab ?? palette.body
  const windshieldColor = palette.windshield ?? palette.window
  return (
    <g transform={`translate(${x}, 0)`}>
      <path
        d={`M0,${bodyTop}
            Q${noseWidth},${bodyTop} ${noseWidth},${bodyTop + bodyHeight * 0.45}
            Q${noseWidth},${bodyTop + bodyHeight} 0,${bodyTop + bodyHeight}
            Z`}
        fill={cabColor}
      />
      <path
        d={`M4,${bodyTop + bodyHeight * 0.18}
            Q${noseWidth - 10},${bodyTop + bodyHeight * 0.2} ${noseWidth - 6},${bodyTop + bodyHeight * 0.42}
            L4,${bodyTop + bodyHeight * 0.5}
            Z`}
        fill={windshieldColor}
      />
      <circle cx={noseWidth - 10} cy={bodyTop + bodyHeight * 0.74} r={6} fill="#ffe27a" />
      <rect
        x={0}
        y={bodyTop + bodyHeight * 0.62}
        width={noseWidth * 0.7}
        height={bodyHeight * 0.1}
        fill={palette.accent}
      />
    </g>
  )
}

/** Flat rounded rear end with a tail light, trailing the direction of travel (left). */
export function TailCap({ x, width: capWidth, palette }: { x: number; width: number; palette: Palette }) {
  const h = TRAIN_HEIGHT
  const bodyTop = 26
  const bodyHeight = h - 58
  return (
    <g transform={`translate(${x}, 0)`}>
      <path
        d={`M${capWidth},${bodyTop}
            Q0,${bodyTop} 0,${bodyTop + bodyHeight * 0.3}
            L0,${bodyTop + bodyHeight * 0.7}
            Q0,${bodyTop + bodyHeight} ${capWidth},${bodyTop + bodyHeight}
            Z`}
        fill={palette.body}
      />
      <rect
        x={2}
        y={bodyTop + bodyHeight * 0.62}
        width={6}
        height={bodyHeight * 0.14}
        rx={2}
        fill="#e33"
      />
    </g>
  )
}

/** Lays out every car, coupling, nose and tail for a train spec, left (back) to right (front). */
export function TrainBody({ spec }: { spec: TrainSpec }) {
  const { wagonCount, wagonWidth, gap, tailWidth, noseWidth, palette, doorsPerWagon, boxy } = spec
  const wagonX = (i: number) => tailWidth + i * (wagonWidth + gap)
  const noseX = wagonX(wagonCount)

  return (
    <g>
      <TailCap x={0} width={tailWidth} palette={palette} />
      {Array.from({ length: wagonCount }, (_, i) => (
        <Wagon key={i} x={wagonX(i)} width={wagonWidth} palette={palette} doorCount={doorsPerWagon} boxy={boxy} />
      ))}
      {Array.from({ length: wagonCount - 1 }, (_, i) => (
        <Coupling key={i} x={wagonX(i + 1) - gap} width={gap} />
      ))}
      <NoseCab x={noseX} width={noseWidth} palette={palette} />
    </g>
  )
}

export function DirectionLabels({ width }: { width: number }) {
  const y = TRAIN_HEIGHT + 30
  return (
    <g fontFamily="system-ui, -apple-system, sans-serif" fontWeight={600}>
      <text x={18} y={y} fontSize={18} fill="#8a8f98" textAnchor="start">
        ◂ BAK
      </text>
      <text x={width - 18} y={y} fontSize={18} fill="#8a8f98" textAnchor="end">
        FRAM ▸
      </text>
    </g>
  )
}
