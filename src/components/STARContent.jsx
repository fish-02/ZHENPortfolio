const STAR_ITEMS = [
  { key: 'situation', label: 'S', title: '情境 Situation' },
  { key: 'task',      label: 'T', title: '任務 Task' },
  { key: 'action',    label: 'A', title: '行動 Action' },
  { key: 'result',    label: 'R', title: '結果 Result' },
]

export default function STARContent({ narrative }) {
  return (
    <div>
      <p className="detail-hook">{narrative.hook}</p>
      <div className="star-block">
        {STAR_ITEMS.map(({ key, label, title }) => (
          <div key={key} className="star-item">
            <div className="star-label">{label}</div>
            <div className="star-content-block">
              <div className="star-key">{title}</div>
              <p className="star-text">{narrative[key]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
