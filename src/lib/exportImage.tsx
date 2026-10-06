import { renderToStaticMarkup } from 'react-dom/server'
import type { Pin, TrainKind } from '../types'
import { getStageViewBox, STAGE_PADDING, TRAIN_REGISTRY } from '../trains'
import { DirectionLabels } from '../trains/parts'
import { PinMarker } from '../components/PinMarker'

const EXPORT_SCALE = 2
const CARD_PADDING = 36
const FOOTER_HEIGHT = 46

function buildCardSvg(trainKind: TrainKind, pin: Pin) {
  const { Component, dimensions } = TRAIN_REGISTRY[trainKind]
  const stageViewBox = getStageViewBox(dimensions)

  const width = stageViewBox.width + CARD_PADDING * 2
  const height = stageViewBox.height + CARD_PADDING * 2 + FOOTER_HEIGHT

  const markup = renderToStaticMarkup(
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect x={0} y={0} width={width} height={height} fill="#ffffff" />
      <g transform={`translate(${CARD_PADDING}, ${CARD_PADDING})`}>
        <g transform={`translate(${STAGE_PADDING.side}, ${STAGE_PADDING.top})`}>
          <Component />
          <DirectionLabels width={dimensions.width} />
        </g>
        <PinMarker pin={pin} dimensions={dimensions} />
      </g>
      <text
        x={width / 2}
        y={height - FOOTER_HEIGHT / 2 + 7}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight={600}
        fontSize={20}
        fill="#9aa1ab"
      >
        Var i vagnen
      </text>
    </svg>,
  )

  return { markup, width, height }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('image load failed'))
    img.src = src
  })
}

/** Renders the train + pin as a standalone PNG blob, with no app UI, sized for messaging apps. */
export async function renderShareImage(trainKind: TrainKind, pin: Pin): Promise<Blob> {
  const { markup, width, height } = buildCardSvg(trainKind, pin)
  const svgBlob = new Blob([markup], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)

  try {
    const image = await loadImage(url)
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(width * EXPORT_SCALE)
    canvas.height = Math.round(height * EXPORT_SCALE)
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('canvas not supported')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
    if (!blob) throw new Error('could not encode image')
    return blob
  } finally {
    URL.revokeObjectURL(url)
  }
}
