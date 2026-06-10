const EVIDENCE_LABELS = [
  ['role', 'Role'],
  ['constraint', 'Constraint'],
  ['impact', 'Impact'],
]

export default function ProjectEvidence({ evidence }) {
  if (!evidence) return null

  return (
    <div className="project-evidence" aria-label="專案關鍵證據">
      <span className="project-evidence-line" aria-hidden="true" />
      {EVIDENCE_LABELS.map(([key, label]) => (
        <div className="project-evidence-row" key={key}>
          <span className="project-evidence-key">{label}</span>
          <span className="project-evidence-value">{evidence[key]}</span>
        </div>
      ))}
    </div>
  )
}
