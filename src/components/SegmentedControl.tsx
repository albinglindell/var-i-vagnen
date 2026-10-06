interface Option<T extends string> {
  value: T
  label: string
}

interface SegmentedControlProps<T extends string> {
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
}

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  )

  return (
    <div className="segmented" style={{ ['--count' as string]: options.length }}>
      <div
        className="segmented-thumb"
        style={{ transform: `translateX(${activeIndex * 100}%)`, width: `${100 / options.length}%` }}
      />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`segmented-option${option.value === value ? ' is-active' : ''}`}
          onClick={() => onChange(option.value)}
          aria-pressed={option.value === value}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
