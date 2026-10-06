import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { SegmentedControl } from './components/SegmentedControl'
import { TrainStage } from './components/TrainStage'
import { CopyButton } from './components/CopyButton'
import { loadSelection, saveSelection } from './lib/storage'
import { renderShareImage } from './lib/exportImage'
import { copyOrShareImage, type ShareOutcome } from './lib/clipboard'
import { vehicleToTrainKind } from './types'
import type { Pin } from './types'

type Category = 'pendeltag' | 'tunnelbana'
type MetroVariant = 'new' | 'old'

function App() {
  const [category, setCategory] = useState<Category>(() => loadSelection()?.category ?? 'pendeltag')
  const [metroVariant, setMetroVariant] = useState<MetroVariant>(() => loadSelection()?.variant ?? 'new')
  const [pin, setPin] = useState<Pin | null>(null)

  useEffect(() => {
    saveSelection({ category, variant: category === 'tunnelbana' ? metroVariant : undefined })
  }, [category, metroVariant])

  const trainKind = useMemo(
    () =>
      vehicleToTrainKind(
        category === 'pendeltag' ? { category: 'pendeltag' } : { category: 'tunnelbana', variant: metroVariant },
      ),
    [category, metroVariant],
  )

  // Reset the pin during render (not in an effect) whenever the train illustration changes,
  // since a pin position only makes sense for the geometry it was placed on.
  const [pinnedTrainKind, setPinnedTrainKind] = useState(trainKind)
  if (trainKind !== pinnedTrainKind) {
    setPinnedTrainKind(trainKind)
    setPin(null)
  }

  async function handleCopy(): Promise<ShareOutcome> {
    if (!pin) return 'failed'
    return copyOrShareImage(() => renderShareImage(trainKind, pin))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Var på tåget är du?</h1>
      </header>

      <div className="controls">
        <SegmentedControl<Category>
          options={[
            { value: 'pendeltag', label: 'Pendeltåg' },
            { value: 'tunnelbana', label: 'Tunnelbana' },
          ]}
          value={category}
          onChange={setCategory}
        />

        {category === 'tunnelbana' && (
          <SegmentedControl<MetroVariant>
            options={[
              { value: 'new', label: 'Nytt tåg' },
              { value: 'old', label: 'Gammalt tåg' },
            ]}
            value={metroVariant}
            onChange={setMetroVariant}
          />
        )}
      </div>

      <p className="instruction">Tryck där du står</p>

      <div className="stage-wrapper">
        <TrainStage trainKind={trainKind} pin={pin} onPinChange={setPin} />
      </div>

      <div className="action-bar">
        <CopyButton disabled={!pin} onCopy={handleCopy} />
      </div>
    </div>
  )
}

export default App
