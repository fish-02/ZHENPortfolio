import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import projectsData from '../data/projects.json'
import FilterNav from '../components/FilterNav.jsx'
import CenterModal from '../components/CenterModal.jsx'
import CapabilityMap from '../components/CapabilityMap.jsx'

const SORT_OPTIONS = [
  { key: 'newest', label: '年份 新→舊' },
  { key: 'oldest', label: '年份 舊→新' },
  { key: 'score',  label: 'Score 高→低' },
]

const CATEGORY_LABEL = {
  Architect: '01 Architect',
  Maker: '02 Maker',
  Lens: '03 Lens',
  Writer: '04 Writer',
}

export default function ArchivePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeYear, setActiveYear] = useState(null)
  const [sortKey, setSortKey] = useState('newest')
  const [activeProject, setActiveProject] = useState(null)

  const allProjects = projectsData.projects

  const years = useMemo(
    () => [...new Set(allProjects.map((p) => p.year))].sort((a, b) => b - a),
    [allProjects]
  )

  const filtered = useMemo(() => {
    let list = allProjects.filter((p) => {
      const catMatch = activeCategory === 'all' || p.metadata.capabilities?.includes(activeCategory)
      const yearMatch = activeYear === null || p.year === activeYear
      return catMatch && yearMatch
    })
    if (sortKey === 'newest') list = [...list].sort((a, b) => b.year - a.year)
    if (sortKey === 'oldest') list = [...list].sort((a, b) => a.year - b.year)
    if (sortKey === 'score')  list = [...list].sort((a, b) => b.metadata.featured_score.total - a.metadata.featured_score.total)
    return list
  }, [allProjects, activeCategory, activeYear, sortKey])

  const handleClick = (project) => {
    setActiveProject(activeProject?.id === project.id ? null : project)
    if (activeProject?.id !== project.id) {
      window.history.pushState(null, '', `/archive#project-${project.slug}`)
    } else {
      window.history.pushState(null, '', '/archive')
    }
  }

  const handleClose = () => {
    setActiveProject(null)
    window.history.pushState(null, '', '/archive')
  }

  return (
    <>
    <main className="archive-page">
      <div className="wrap">
        <div className="section-head" style={{ borderTop: '1px solid var(--line)' }}>
          <div>
            <Link
              to="/"
              style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '.28em', color: 'var(--muted)', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}
            >
              ← 返回主頁
            </Link>
            <div className="section-num">全作品庫 / Full Archive</div>
            <h1 className="section-title">
              Archive<span className="accent">.</span>
            </h1>
          </div>
          <div className="section-meta">
            {allProjects.length} Projects total<br />
            含 archive-only 作品
          </div>
        </div>
      </div>

      <CapabilityMap
        projects={allProjects}
        activeCategory={activeCategory}
        onCategory={setActiveCategory}
      />

      {/* Filters + Sort */}
      <div className="archive-filter-bar">
        <FilterNav
          activeCategory={activeCategory}
          activeYear={activeYear}
          years={years}
          onCategory={setActiveCategory}
          onYear={setActiveYear}
        />
        <div className="archive-sort-group">
          {SORT_OPTIONS.map((s) => (
            <button
              key={s.key}
              className={`filter-btn${sortKey === s.key ? ' active' : ''}`}
              onClick={() => setSortKey(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="wrap">
        <div className="archive-list">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="archive-row"
              data-slug={project.slug}
              onClick={() => handleClick(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleClick(project)
                }
              }}
              data-cursor-label="VIEW PROJECT"
              data-cursor-magnetic="true"
              style={activeProject?.id === project.id ? { outline: '2px solid var(--accent)', outlineOffset: '-2px' } : {}}
            >
              <div className="archive-num">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="archive-thumb">
                {project.thumbnail && <img src={project.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              <div className="archive-title">{project.title}</div>
              <div className="archive-year">{project.year}</div>
              <div className="archive-cat">{CATEGORY_LABEL[project.category] ?? project.category}</div>
              <div className="archive-score">
                {project.metadata.featured_score.total}/9
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="wrap">
        <footer className="site-footer">
          <div><span className="accent-dot" />© 2026 創作者姓名</div>
          <Link to="/" style={{ color: 'var(--muted)' }}>← 返回主頁</Link>
        </footer>
      </div>
    </main>
    <CenterModal project={activeProject} onClose={handleClose} />
    </>
  )
}
