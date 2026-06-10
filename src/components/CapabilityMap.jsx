import { useState } from 'react'

const CAPABILITIES = [
  { key: 'Architect', index: '01', label: 'Architect', action: 'Structure', x: 20, y: 28 },
  { key: 'Maker', index: '02', label: 'Maker', action: 'Build', x: 80, y: 28 },
  { key: 'Writer', index: '04', label: 'Writer', action: 'Narrate', x: 20, y: 76 },
  { key: 'Lens', index: '03', label: 'Lens', action: 'Observe', x: 80, y: 76 },
]

const PROJECT_POSITIONS = [
  { x: 38, y: 42 },
  { x: 61, y: 43 },
  { x: 50, y: 61 },
  { x: 36, y: 63 },
  { x: 64, y: 64 },
]

export default function CapabilityMap({ projects, activeCategory, onCategory }) {
  const [activeProjectId, setActiveProjectId] = useState(null)
  const selected = activeCategory === 'all' ? null : activeCategory
  const activeProject = projects.find((project) => project.id === activeProjectId) ?? null
  const activeProjectCapabilities = activeProject?.metadata.capabilities ?? []
  const visibleProjects = selected
    ? projects.filter((project) => project.metadata.capabilities?.includes(selected))
    : projects

  const toggleCapability = (key) => {
    setActiveProjectId(null)
    onCategory(selected === key ? 'all' : key)
  }

  const toggleProject = (projectId) => {
    setActiveProjectId((current) => current === projectId ? null : projectId)
  }

  const clearSelection = () => {
    setActiveProjectId(null)
    onCategory('all')
  }

  const handleMapBackgroundClick = (event) => {
    if (event.target.closest?.('.capability-node, .capability-project')) return
    clearSelection()
  }

  return (
    <section className="capability-map" aria-labelledby="capability-map-title">
      <div className="wrap">
        <div className="capability-map-head">
          <div>
            <div className="section-num">Capability Map / 能力星圖</div>
            <h2 id="capability-map-title">作品不是分類，是一組彼此連動的能力。</h2>
          </div>
          <div className="capability-map-status" aria-live="polite">
            <span>{activeProject?.title ?? selected ?? 'All Capabilities'}</span>
            <strong>{visibleProjects.length}</strong> Projects
          </div>
        </div>

        <div className="capability-map-desktop" onClick={handleMapBackgroundClick}>
          <svg
            className="capability-map-svg"
            viewBox="0 0 100 100"
            role="group"
            aria-label="四項能力與作品之間的互動關聯圖"
          >
            <g className="capability-map-grid" aria-hidden="true">
              <line x1="20" y1="28" x2="80" y2="28" />
              <line x1="20" y1="76" x2="80" y2="76" />
              <line x1="20" y1="28" x2="20" y2="76" />
              <line x1="80" y1="28" x2="80" y2="76" />
              <line x1="20" y1="28" x2="80" y2="76" />
              <line x1="80" y1="28" x2="20" y2="76" />
            </g>

            <g className="capability-links" aria-hidden="true">
              {projects.flatMap((project, projectIndex) => {
                const position = PROJECT_POSITIONS[projectIndex % PROJECT_POSITIONS.length]
                return (project.metadata.capabilities ?? [project.category]).map((capability) => {
                  const node = CAPABILITIES.find((item) => item.key === capability)
                  if (!node) return null
                  const isVisible = activeProject
                    ? activeProject.id === project.id
                    : (!selected || selected === capability)
                  return (
                    <line
                      key={`${project.id}-${capability}`}
                      x1={node.x}
                      y1={node.y}
                      x2={position.x}
                      y2={position.y}
                      className={isVisible ? 'is-visible' : ''}
                    />
                  )
                })
              })}
            </g>

            <g className="capability-projects">
              {projects.map((project, index) => {
                const position = PROJECT_POSITIONS[index % PROJECT_POSITIONS.length]
                const isActive = activeProjectId === project.id
                const isVisible = activeProject
                  ? isActive
                  : (!selected || project.metadata.capabilities?.includes(selected))
                return (
                  <g
                    key={project.id}
                    className={`capability-project${isVisible ? ' is-visible' : ''}${isActive ? ' is-active' : ''}`}
                    transform={`translate(${position.x} ${position.y})`}
                    role="button"
                    tabIndex="0"
                    aria-label={`${project.title}：顯示關聯能力`}
                    aria-pressed={isActive}
                    onClick={() => toggleProject(project.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        toggleProject(project.id)
                      }
                    }}
                  >
                    <circle className="capability-project-hit" r="5.5" />
                    <circle className="capability-project-dot" r="2.4" />
                    <text x="0" y="-4">{String(index + 1).padStart(2, '0')}</text>
                  </g>
                )
              })}
            </g>
          </svg>

          {CAPABILITIES.map((capability) => {
            const count = projects.filter((project) =>
              project.metadata.capabilities?.includes(capability.key)
            ).length
            return (
              <button
                key={capability.key}
                type="button"
                className={`capability-node capability-node-${capability.key.toLowerCase()}${selected === capability.key ? ' active' : ''}${activeProjectCapabilities.includes(capability.key) ? ' linked' : ''}${(selected && selected !== capability.key) || (activeProject && !activeProjectCapabilities.includes(capability.key)) ? ' muted' : ''}`}
                aria-pressed={selected === capability.key}
                onClick={() => toggleCapability(capability.key)}
                data-cursor-label={capability.action}
                data-cursor-magnetic="true"
              >
                <span>{capability.index}</span>
                <strong>{capability.label}</strong>
                <small>{capability.action} · {count}</small>
              </button>
            )
          })}
        </div>

        <div className="capability-map-mobile" role="group" aria-label="依能力篩選作品">
          <button
            type="button"
            className={`capability-mobile-all${selected === null ? ' active' : ''}`}
            onClick={() => onCategory('all')}
            aria-pressed={selected === null}
          >
            All <span>{projects.length}</span>
          </button>
          {CAPABILITIES.map((capability) => {
            const count = projects.filter((project) =>
              project.metadata.capabilities?.includes(capability.key)
            ).length
            return (
              <button
                key={capability.key}
                type="button"
                className={selected === capability.key ? 'active' : ''}
                onClick={() => toggleCapability(capability.key)}
                aria-pressed={selected === capability.key}
              >
                <span>{capability.index}</span>
                <strong>{capability.label}</strong>
                <small>{capability.action}</small>
                <b>{count}</b>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
