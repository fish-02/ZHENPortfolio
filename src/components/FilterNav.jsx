const CATEGORIES = [
  { key: 'all', label: 'All', cursor: 'EXPLORE' },
  { key: 'Architect', label: '01 Architect', cursor: 'STRUCTURE' },
  { key: 'Maker', label: '02 Maker', cursor: 'BUILD' },
  { key: 'Lens', label: '03 Lens', cursor: 'OBSERVE' },
  { key: 'Writer', label: '04 Writer', cursor: 'NARRATE' },
]

export default function FilterNav({ activeCategory, activeYear, years, onCategory, onYear }) {
  return (
    <div className="filter-nav" role="toolbar" aria-label="Filter projects">
      {CATEGORIES.map((c) => (
        <button
          key={c.key}
          className={`filter-btn${activeCategory === c.key ? ' active' : ''}`}
          onClick={() => onCategory(c.key)}
          aria-pressed={activeCategory === c.key}
          data-cursor-label={c.cursor}
          data-cursor-magnetic="true"
        >
          {c.label}
        </button>
      ))}
      <div className="filter-year-group">
        {years.map((y) => (
          <button
            key={y}
            className={`filter-btn${activeYear === y ? ' active' : ''}`}
            onClick={() => onYear(activeYear === y ? null : y)}
            aria-pressed={activeYear === y}
            data-cursor-label="FILTER YEAR"
            data-cursor-magnetic="true"
          >
            {y}
          </button>
        ))}
      </div>
    </div>
  )
}
