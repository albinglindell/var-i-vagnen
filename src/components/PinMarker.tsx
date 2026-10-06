import type { Pin } from '../types'
import { STAGE_PADDING, type TrainDimensions } from '../trains'

interface PinMarkerProps {
  pin: Pin
  dimensions: TrainDimensions
}

/** Map pin shape anchored exactly at the tapped point, with a floating "Jag är här" label. */
export function PinMarker({ pin, dimensions }: PinMarkerProps) {
  const tipX = STAGE_PADDING.side + pin.x * dimensions.width
  const tipY = STAGE_PADDING.top + pin.y * dimensions.height

  const pinLength = 56
  const bubbleRadius = 19
  const headCenterY = tipY - pinLength
  const bubbleCenterY = headCenterY
  const labelY = bubbleCenterY - 34

  return (
    <g>
      <ellipse cx={tipX} cy={tipY + 4} rx={10} ry={4} fill="#00000030" />
      <path
        d={`M ${tipX} ${tipY}
            C ${tipX - bubbleRadius * 1.15} ${tipY - pinLength * 0.62}, ${tipX - bubbleRadius} ${headCenterY + bubbleRadius * 0.6}, ${tipX} ${headCenterY - bubbleRadius}
            C ${tipX + bubbleRadius} ${headCenterY + bubbleRadius * 0.6}, ${tipX + bubbleRadius * 1.15} ${tipY - pinLength * 0.62}, ${tipX} ${tipY}
            Z`}
        fill="#e4262c"
        stroke="#ffffff"
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <circle cx={tipX} cy={bubbleCenterY} r={7} fill="#ffffff" />
      <g>
        <rect
          x={tipX - 62}
          y={labelY - 20}
          width={124}
          height={32}
          rx={16}
          fill="#111317"
        />
        <text
          x={tipX}
          y={labelY + 1}
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight={700}
          fontSize={15}
          fill="#ffffff"
        >
          Jag är här
        </text>
      </g>
    </g>
  )
}
