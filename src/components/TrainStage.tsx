import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { Pin, TrainKind } from '../types'
import { getStageViewBox, STAGE_PADDING, TRAIN_REGISTRY } from '../trains'
import { DirectionLabels } from '../trains/parts'
import { PinMarker } from './PinMarker'
import { hapticTap } from '../lib/haptics'

interface TrainStageProps {
  trainKind: TrainKind
  pin: Pin | null
  onPinChange: (pin: Pin) => void
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function TrainStage({ trainKind, pin, onPinChange }: TrainStageProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const draggingRef = useRef(false)

  const entry = TRAIN_REGISTRY[trainKind]
  const { Component, dimensions } = entry
  const viewBox = getStageViewBox(dimensions)

  function updateFromEvent(e: ReactPointerEvent<SVGSVGElement>) {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    const scaleX = viewBox.width / rect.width
    const scaleY = viewBox.height / rect.height
    const vbX = (e.clientX - rect.left) * scaleX
    const vbY = (e.clientY - rect.top) * scaleY
    const relX = (vbX - STAGE_PADDING.side) / dimensions.width
    const relY = (vbY - STAGE_PADDING.top) / dimensions.height
    onPinChange({ x: clamp(relX, 0.02, 0.98), y: clamp(relY, 0.08, 0.92) })
  }

  function handlePointerDown(e: ReactPointerEvent<SVGSVGElement>) {
    draggingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromEvent(e)
    hapticTap()
  }

  function handlePointerMove(e: ReactPointerEvent<SVGSVGElement>) {
    if (!draggingRef.current) return
    updateFromEvent(e)
  }

  function handlePointerUp(e: ReactPointerEvent<SVGSVGElement>) {
    draggingRef.current = false
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // pointer already released
    }
  }

  return (
    <div className="stage" style={{ aspectRatio: `${viewBox.width} / ${viewBox.height}` }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
        className="stage-svg"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="img"
        aria-label="Tryck på tåget för att visa var du befinner dig"
      >
        <g transform={`translate(${STAGE_PADDING.side}, ${STAGE_PADDING.top})`}>
          <Component />
          <DirectionLabels width={dimensions.width} />
        </g>
        {pin && <PinMarker pin={pin} dimensions={dimensions} />}
      </svg>
    </div>
  )
}
